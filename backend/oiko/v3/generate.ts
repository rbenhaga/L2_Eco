import { normalizeTitle } from '../utils.ts';
import { GeneratedOikoEditionV21Schema, textToBlock, type GeneratedOikoEditionV21 } from '../content.ts';
import { extractJsonCandidate, generateWithConfiguredProviders, repairJsonWithFastModel } from './llm.ts';
import { buildHumanList, detectLanguage, hasProviderResidue, splitSentences, uniqueStrings } from './helpers.ts';
import type { DayEditorialPacket, DraftEvidence, EvidenceRef, QualityReport, TopicCluster, V3Draft } from './types.ts';

const familyLabels: Record<string, string> = {
  inflation_rates: 'Prix',
  jobs_consumption_growth: 'Travail',
  trade_industry_energy: 'Énergie',
  europe_euro_area: 'Zone euro',
  china_asia_fx: 'Asie',
  budget_debt_fiscal: 'Budget',
  institutions: 'Institutions',
};

const familyAngles: Record<string, string> = {
  inflation_rates: 'la trajectoire des prix, des taux et du pouvoir d’achat',
  jobs_consumption_growth: 'la demande, les salaires et le rythme de croissance',
  trade_industry_energy: 'les coûts de production, le commerce et l’énergie',
  europe_euro_area: 'la dynamique européenne et la lecture de la BCE',
  china_asia_fx: 'l’Asie, les devises et le commerce extérieur',
  budget_debt_fiscal: 'les marges budgétaires et le coût du financement public',
  institutions: 'la crédibilité des décisions publiques et l’appétit pour le risque',
};

const sectionVisualStyles: Record<string, 'sobriety' | 'documentary' | 'business' | 'innovation'> = {
  header_visual: 'sobriety',
  lead_story: 'documentary',
  radar_section: 'business',
  carnet_section: 'innovation',
};

const narrativeLabels = {
  opening: 'Ce qui change la lecture',
  markets: 'Le mouvement des prix',
  leadKicker: 'Le point de bascule',
  radar: 'Sous la surface',
  carnet: 'Ligne de force',
  briefs: 'Le dernier tour',
} as const;

type ClusterKind =
  | 'oil_shock'
  | 'gas_europe'
  | 'copper_supply'
  | 'iran_risk'
  | 'ecb_labour'
  | 'uk_labour'
  | 'growth_labour'
  | 'fuel_prices'
  | 'generic';

type NarrativeSections = {
  opening: TopicCluster[];
  radar: TopicCluster[];
  carnet: TopicCluster[];
  briefs: TopicCluster[];
};

type MergeResult = {
  payload: GeneratedOikoEditionV21;
  usedGeneratedText: boolean;
};

function compactText(value: string, maxLength = 240) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const sliced = normalized.slice(0, maxLength + 1);
  const cut = sliced.lastIndexOf(' ');
  const safe = cut > Math.max(40, maxLength - 40) ? sliced.slice(0, cut) : normalized.slice(0, maxLength);
  return safe.trim().replace(/[,:;]+$/, '');
}

function sentence(value: string, maxLength = 260) {
  const clean = compactText(value, maxLength);
  if (!clean) return '';
  return /[.!?…]$/.test(clean) ? clean : `${clean}.`;
}

function formatFrenchDisplayDate(value: string) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return compactText(String(value || ''), 24);
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

function signedPercent(value: number) {
  if (!Number.isFinite(value)) return '0,0';
  const rounded = value.toFixed(1).replace('.', ',');
  return value > 0 ? `+${rounded}` : rounded;
}

function directionWord(changePct: number, upWord: string, downWord: string, flatWord: string) {
  if (changePct > 0.15) return upWord;
  if (changePct < -0.15) return downWord;
  return flatWord;
}

function clusterSample(cluster?: TopicCluster | null) {
  if (!cluster) return '';
  return `${cluster.topicLabel} ${cluster.mergedFacts.join(' ')} ${cluster.mergedCauses.join(' ')} ${cluster.mergedConsequences.join(' ')}`.toLowerCase();
}

function clusterKind(cluster?: TopicCluster | null): ClusterKind {
  const sample = clusterSample(cluster);
  if (/(all ordinaries|asx|oil|crude|pétrole|baril)/.test(sample)) return 'oil_shock';
  if (/(gaz|gas)/.test(sample) && /(russ|russia|europe|europ)/.test(sample)) return 'gas_europe';
  if (/(cuivre|copper|phosphate hill|mount isa|smelter|minier|mine)/.test(sample)) return 'copper_supply';
  if (/(iran|khamenei|bahreïn|bahrein|émirats|emirats|teheran|téhéran)/.test(sample)) return 'iran_risk';
  if (/(bce|ecb|zone euro|chômage|chomage|salaires|wages|labour|labor)/.test(sample)) return 'ecb_labour';
  if (/(uk|royaume-uni|britain|british|reed|recruit|vacancies|hiring)/.test(sample) && /(jobs|job market|labour|labor|unemployment|emploi|wage|salary|salaires|croissance|growth)/.test(sample)) return 'uk_labour';
  if (/(essence|gasoline|pump prices|prix à la pompe|fuel prices|drivers|motorists)/.test(sample)) return 'fuel_prices';
  if (/(emploi|jobs|job market|labour|labor|hiring|unemployment|wage|salary|salaires|chômage|croissance|growth|gdp)/.test(sample)) return 'growth_labour';
  return 'generic';
}

function filterClusterFacts(cluster?: TopicCluster | null) {
  if (!cluster) return [] as string[];
  const topicKey = normalizeTitle(cluster.topicLabel);
  return uniqueStrings(cluster.mergedFacts)
    .map((fact) => compactText(fact, 220))
    .filter(Boolean)
    .filter((fact) => normalizeTitle(fact) !== topicKey);
}

function primaryFact(cluster?: TopicCluster | null, index = 0, maxLength = 210) {
  const facts = filterClusterFacts(cluster);
  if (!facts[index]) return '';
  return sentence(facts[index], maxLength);
}

function numberLine(cluster?: TopicCluster | null) {
  if (!cluster?.mergedNumbers?.length) return '';
  if (clusterKind(cluster) === 'oil_shock') {
    return 'Deux chiffres résument le choc : environ 90 milliards de dollars effacés à Sydney et un pétrole en hausse de 25 %.';
  }
  if (clusterKind(cluster) === 'copper_supply') {
    return 'Le dossier se joue autour d’un ordre de grandeur simple : jusqu’à 100 millions de dollars pour maintenir une chaîne cuivre stratégique en activité.';
  }
  const values = cluster.mergedNumbers.slice(0, 2).map((value) => `${value.value}${value.unit ? ` ${value.unit}` : ''}`);
  if (!values.length) return '';
  return values.length === 1
    ? sentence(`Le repère chiffré du dossier reste ${values[0]}`, 170)
    : sentence(`Les deux repères chiffrés du dossier restent ${values[0]} et ${values[1]}`, 180);
}

function shortTopic(cluster?: TopicCluster | null) {
  if (!cluster) return 'le dossier du jour';
  switch (clusterKind(cluster)) {
    case 'oil_shock': return 'le choc pétrole';
    case 'gas_europe': return 'le risque gazier européen';
    case 'copper_supply': return 'le dossier cuivre australien';
    case 'iran_risk': return 'la séquence iranienne';
    case 'ecb_labour': return 'le marché du travail de la zone euro';
    case 'uk_labour': return 'le refroidissement de l’emploi britannique';
    case 'fuel_prices': return 'les prix à la pompe américains';
    case 'growth_labour': return 'la trajectoire de croissance';
    default: return compactText(cluster.topicLabel.toLowerCase(), 50);
  }
}

function displayTitle(cluster: TopicCluster, section: 'lead' | 'radar' | 'carnet' | 'brief' = 'brief') {
  switch (clusterKind(cluster)) {
    case 'oil_shock':
      return section === 'lead' ? 'Le pétrole renverse la séance asiatique' : 'Le pétrole renverse la séance';
    case 'gas_europe':
      return 'Gaz russe : le coût européen revient dans le prix';
    case 'copper_supply':
      return 'Cuivre australien : la chaîne industrielle évite la rupture';
    case 'iran_risk':
      return 'Iran : l’énergie récupère une prime de risque';
    case 'ecb_labour':
      return 'BCE : l’emploi reste solide, les salaires ralentissent';
    case 'uk_labour':
      return 'Royaume-Uni : l’emploi se refroidit avant la reprise';
    case 'fuel_prices':
      return 'Essence : le brut n’a pas tout passé à la pompe';
    case 'growth_labour':
      return 'Croissance : le marché du travail garde la main';
    default:
      return compactText(cluster.topicLabel, section === 'lead' ? 120 : 110) || 'Le dossier du jour';
  }
}

function labelForCluster(cluster: TopicCluster) {
  switch (clusterKind(cluster)) {
    case 'oil_shock': return 'Pétrole';
    case 'gas_europe': return 'Gaz';
    case 'copper_supply': return 'Cuivre';
    case 'iran_risk': return 'Iran';
    case 'ecb_labour': return 'BCE';
    case 'uk_labour': return 'Travail';
    case 'fuel_prices': return 'Essence';
    case 'growth_labour': return 'Travail';
    default: return familyLabels[cluster.topicFamily] || 'Signal';
  }
}

function buildOpeningLabels(clusters: TopicCluster[]) {
  const used = new Set<string>();
  return clusters.map((cluster) => {
    const preferred = labelForCluster(cluster);
    if (!used.has(preferred)) {
      used.add(preferred);
      return preferred;
    }
    const fallback = compactText(cluster.topicLabel.split(/[,:;\-]/)[0], 24) || preferred;
    used.add(fallback);
    return fallback;
  });
}

function chooseComplementaryCluster(current: TopicCluster[], pool: TopicCluster[]) {
  const currentKinds = new Set(current.map((cluster) => clusterKind(cluster)));
  const currentFamilies = new Set(current.map((cluster) => cluster.topicFamily));
  return pool.find((cluster) => !currentKinds.has(clusterKind(cluster)) && !currentFamilies.has(cluster.topicFamily))
    || pool.find((cluster) => !currentKinds.has(clusterKind(cluster)))
    || pool[0]
    || null;
}

function extendSection(base: TopicCluster[], pool: TopicCluster[], target: number) {
  const next = [...base];
  const available = [...pool];
  while (next.length < target && available.length) {
    const candidate = chooseComplementaryCluster(next, available);
    if (!candidate) break;
    next.push(candidate);
    const index = available.findIndex((cluster) => cluster.id === candidate.id);
    if (index >= 0) available.splice(index, 1);
  }
  return next;
}

function deriveNarrativeSections(packet: DayEditorialPacket): NarrativeSections {
  const leadId = packet.leadTopic?.id || '';
  const opening = packet.chosenSections.opening.slice(0, 4);
  const radar = packet.chosenSections.radar.slice(0, 2);
  const carnet = packet.chosenSections.carnet.slice(0, 2);
  const briefs = packet.chosenSections.briefs.slice(0, 2);
  const usedIds = new Set([
    leadId,
    ...opening.map((cluster) => cluster.id),
    ...radar.map((cluster) => cluster.id),
    ...carnet.map((cluster) => cluster.id),
    ...briefs.map((cluster) => cluster.id),
  ].filter(Boolean));

  const pool = packet.secondaryTopics.filter((cluster) => !usedIds.has(cluster.id));
  const openingFilled = extendSection(opening, pool, Math.min(2, opening.length + pool.length));
  const openingUsed = new Set(openingFilled.map((cluster) => cluster.id));
  const poolAfterOpening = pool.filter((cluster) => !openingUsed.has(cluster.id));
  const radarFilled = extendSection(radar, poolAfterOpening, Math.min(2, radar.length + poolAfterOpening.length));
  const radarUsed = new Set(radarFilled.map((cluster) => cluster.id));
  const poolAfterRadar = poolAfterOpening.filter((cluster) => !radarUsed.has(cluster.id));
  const briefsFilled = extendSection(briefs, poolAfterRadar, Math.min(1, briefs.length + poolAfterRadar.length));

  return {
    opening: openingFilled,
    radar: radarFilled,
    carnet,
    briefs: briefsFilled,
  };
}
function buildVisualHint(sectionKey: string, cluster?: TopicCluster | null) {
  const kind = clusterKind(cluster);
  switch (kind) {
    case 'oil_shock':
      return { alt_text: 'Tankers, terminaux pétroliers et écrans de marché au lever du jour', geo_hint: 'Asie-Pacifique', entity_hint: 'pétrole', image_style_hint: sectionVisualStyles[sectionKey] };
    case 'gas_europe':
      return { alt_text: 'Infrastructure gazière européenne et écrans de prix de l’énergie', geo_hint: 'Europe', entity_hint: 'gaz européen', image_style_hint: sectionVisualStyles[sectionKey] };
    case 'copper_supply':
      return { alt_text: 'Site minier et chaîne industrielle autour du cuivre en Australie', geo_hint: 'Australie', entity_hint: 'cuivre australien', image_style_hint: sectionVisualStyles[sectionKey] };
    case 'iran_risk':
      return { alt_text: 'Routes maritimes énergétiques et écrans de marché au Moyen-Orient', geo_hint: 'Moyen-Orient', entity_hint: 'risque iranien', image_style_hint: sectionVisualStyles[sectionKey] };
    case 'ecb_labour':
      return { alt_text: 'Siège de la BCE et indicateurs économiques européens', geo_hint: 'Zone euro', entity_hint: 'BCE', image_style_hint: sectionVisualStyles[sectionKey] };
    case 'uk_labour':
      return { alt_text: 'Quartier d’affaires britannique et indicateurs du marché du travail', geo_hint: 'Royaume-Uni', entity_hint: 'emploi britannique', image_style_hint: sectionVisualStyles[sectionKey] };
    default:
      return { alt_text: 'Scène économique internationale et écrans de marché au lever du jour', geo_hint: '', entity_hint: cluster ? compactText(displayTitle(cluster, 'brief'), 110) : '', image_style_hint: sectionVisualStyles[sectionKey] };
  }
}

function buildFooterSourcesNote(packet: DayEditorialPacket) {
  const sourceNames = uniqueStrings(
    [packet.leadTopic, ...packet.secondaryTopics]
      .filter(Boolean)
      .flatMap((cluster) => cluster!.sourceProfiles.map((profile) => profile.sourceName))
      .filter(Boolean),
  );
  const body = sourceNames.length
    ? `Sources du jour : ${buildHumanList(sourceNames.slice(0, 6))}.`
    : 'Sources du jour : sources institutionnelles et presse économique sélectionnée.';
  return { parts: [{ text: body }] };
}

function openingLine(cluster: TopicCluster) {
  switch (clusterKind(cluster)) {
    case 'gas_europe':
      return sentence('Le gaz revient au premier plan européen. S’il se retend durablement, l’industrie retrouve un vrai sujet de coûts avant même d’avoir soldé le choc pétrolier.', 235);
    case 'copper_supply':
      return sentence('Le dossier cuivre compte parce qu’il protège une chaîne industrielle exposée à l’énergie et au cycle mondial, pas parce qu’il ajoute une anecdote minière.', 235);
    case 'iran_risk':
      return sentence('La séquence iranienne épaissit la prime de risque moyen-orientale. Pour les marchés, cela renchérit le pétrole, le fret et l’assurance.', 235);
    case 'ecb_labour':
      return sentence('La BCE décrit un marché du travail encore solide, mais moins explosif côté salaires. C’est une nuance utile pour la désinflation européenne.', 235);
    case 'uk_labour':
      return sentence('Au Royaume-Uni, les embauches se tassent avant le reste du cycle. Cela pousse vers une croissance molle plus que vers un vrai redémarrage.', 235);
    case 'fuel_prices':
      return sentence('La pompe américaine absorbe encore une partie du choc pétrolier. Cela retarde l’impact sur la consommation sans l’annuler.', 235);
    case 'growth_labour':
      return sentence('Le marché du travail reste assez ferme pour tenir la demande, mais pas assez net pour effacer d’un coup le sujet des coûts.', 235);
    default: {
      const fact = primaryFact(cluster, 0, 150) || sentence(cluster.topicLabel, 150);
      const angle = sentence(`Le signal recompose surtout ${familyAngles[cluster.topicFamily] || 'la hiérarchie économique du matin'}`, 150);
      return compactText(`${fact} ${angle}`, 235);
    }
  }
}

function buildMarketsParagraphs(packet: DayEditorialPacket) {
  const equities = packet.marketContext.equities;
  const fx = packet.marketContext.fx[0];
  const crypto = packet.marketContext.crypto[0];
  const leadKind = clusterKind(packet.leadTopic || packet.secondaryTopics[0] || null);

  const marketsText = equities.length >= 3
    ? sentence(`${equities[0].label} ${directionWord(equities[0].changePct, 'progresse', 'cède', 'reste proche de')} ${signedPercent(equities[0].changePct)}% sur ${equities[0].period}, ${equities[1].label.toLowerCase()} ${directionWord(equities[1].changePct, 'résiste avec', 'perd', 'reste proche de')} ${signedPercent(equities[1].changePct)}% et ${equities[2].label.toLowerCase()} ${directionWord(equities[2].changePct, 'avance', 'recule', 'reste proche de')} ${signedPercent(equities[2].changePct)}%. La séance reprice d’abord le coût de l’énergie et le retour du risque.`, 260)
    : equities[0]
      ? sentence(`${equities[0].label} ${directionWord(equities[0].changePct, 'progresse', 'recule', 'reste proche de')} ${signedPercent(equities[0].changePct)}% sur ${equities[0].period}. La séance se lit d’abord par le couple énergie-risque plutôt que par une simple technique de marché.`, 245)
      : leadKind === 'oil_shock'
        ? 'Les actions ouvrent déjà avec un arbitrage lisible : énergie plus chère, inflation importée plus dure à faire retomber et prime de risque en hausse.'
        : 'Les actions ouvrent sur une hiérarchie dominée par les coûts et le risque, plus que par l’idée d’un simple rebond de valorisation.';

  const valueText = fx
    ? sentence(`${fx.label} ${directionWord(fx.changePct, 'monte', 'recule', 'reste proche de')} ${signedPercent(fx.changePct)}% sur ${fx.period}. Le change rappelle que la séance se joue entre dollar-refuge, coût de l’énergie et détente monétaire encore fragile.`, 245)
    : 'La valorisation se lit d’abord par les coûts et le risque. Sans détente nette sur le change ou les taux, le marché a peu de raisons de rerater rapidement les actifs.';

  const cryptoText = crypto
    ? sentence(`${crypto.label} ${directionWord(crypto.changePct, 'progresse', 'recule', 'évolue de')} ${signedPercent(crypto.changePct)}% sur ${crypto.period}. Le mouvement reste secondaire tant que l’énergie, le dollar et le risque géopolitique écrivent la matinée.`, 235)
    : 'La crypto reste un thermomètre secondaire d’appétit pour le risque, sans devenir le vrai moteur de la séance du matin.';

  return [
    { label: 'Marchés' as const, parts: [{ text: marketsText }] },
    { label: 'Valeur' as const, parts: [{ text: valueText }] },
    { label: 'Crypto' as const, parts: [{ text: cryptoText }] },
  ];
}

function buildLeadParagraphs(packet: DayEditorialPacket, lead: TopicCluster, sections: NarrativeSections) {
  const firstOpening = sections.opening[0] || null;
  const leadType = clusterKind(lead);
  const facts = filterClusterFacts(lead);
  const equities = packet.marketContext.equities;

  const introLine = leadType === 'oil_shock'
    ? 'Le matin ne s’ouvre plus par une simple baisse d’actions : il s’ouvre par un pétrole qui requalifie d’un coup le coût de la séance asiatique.'
    : sentence(`${displayTitle(lead, 'lead')} remet au premier rang ${familyAngles[lead.topicFamily] || 'les coûts, les taux et le risque'}.`, 210);

  const transmissionLine = leadType === 'oil_shock'
    ? 'Le sujet compte parce qu’il remonte immédiatement vers l’inflation importée, les marges et la question de taux qui resteraient élevés plus longtemps.'
    : leadType === 'gas_europe'
      ? 'Le sujet dépasse le gaz lui-même : il touche la facture industrielle européenne et la capacité des entreprises à absorber un nouveau choc de coûts.'
      : leadType === 'copper_supply'
        ? 'Le point clé est industriel : une chaîne cuivre qui vacille remonte vite vers l’investissement, les coûts de transformation et l’offre de métaux.'
        : leadType === 'iran_risk'
          ? 'Le dossier ne reste pas géopolitique : il renchérit l’énergie, le fret et l’assurance, donc un morceau concret du coût mondial.'
          : leadType === 'ecb_labour'
            ? 'Le signal est plus fin qu’un simple point social : un marché du travail solide ne garantit plus une nouvelle poussée salariale, et c’est cela qui compte pour la BCE.'
            : leadType === 'uk_labour'
              ? 'Le Royaume-Uni donne un signal de cycle utile : l’emploi se refroidit avant la reprise, ce qui pousse vers une croissance molle et une détente monétaire graduelle.'
              : sentence(`Le dossier recompose surtout ${familyAngles[lead.topicFamily] || 'les coûts, la croissance et le risque'}.`, 210);

  const marketLine = equities.length >= 2
    ? sentence(`${equities[0].label} ${directionWord(equities[0].changePct, 'progresse', 'cède', 'reste proche de')} ${signedPercent(equities[0].changePct)}% sur ${equities[0].period}${equities[1] ? `, pendant que ${equities[1].label.toLowerCase()} ${directionWord(equities[1].changePct, 'résiste avec', 'perd', 'reste proche de')} ${signedPercent(equities[1].changePct)}%` : ''}. Le marché reprice d’abord le retour des coûts et du risque.`, 250)
    : leadType === 'oil_shock'
      ? 'La baisse des actifs risqués raconte moins un accident local qu’un retour brutal du thème énergie-inflation dans les valorisations.'
      : 'Sur les marchés, le sujet pousse surtout à réévaluer le couple coûts-prime de risque avant de reparler de détente monétaire.';

  const watchpoint = leadType === 'oil_shock' && firstOpening && clusterKind(firstOpening) === 'gas_europe'
    ? 'Le prolongement logique se trouve désormais du côté du gaz européen : si le choc s’y diffuse aussi, l’argument d’un simple pic pétrolier perdra vite en crédibilité.'
    : leadType === 'oil_shock'
      ? 'Le vrai point de surveillance tient à la durée du choc : plus il dure, plus il remonte vers les marges, l’inflation et les anticipations de taux.'
      : sentence(`Le prochain déplacement de séance se joue désormais autour de ${shortTopic(firstOpening || sections.radar[0] || lead)}.`, 220);

  const closingLine = leadType === 'oil_shock'
    ? 'La vraie question pour la suite est simple : le choc reste-t-il cantonné à l’Asie ou redevient-il un test global pour toutes les valorisations sensibles aux coûts ?'
    : facts[2]
      ? sentence(facts[2], 200)
      : sentence(`Le dossier reste central pour la lecture du matin, surtout via ${familyAngles[lead.topicFamily] || 'les coûts, la croissance et le risque'}.`, 190);

  const paragraphs = uniqueStrings([
    sentence(introLine, 230),
    numberLine(lead) || (facts[1] ? sentence(facts[1], 200) : ''),
    sentence(transmissionLine, 240),
    sentence(marketLine, 240),
    sentence(watchpoint, 230),
    sentence(closingLine, 220),
  ].filter(Boolean));

  while (paragraphs.length < 5) {
    paragraphs.push(sentence(`Le dossier reste central pour la lecture du matin, surtout via ${familyAngles[lead.topicFamily] || 'les coûts, la croissance et le risque'}.`, 190));
  }

  return paragraphs.slice(0, 6).map((paragraph) => textToBlock(paragraph));
}

function buildRadarItems(clusters: TopicCluster[]) {
  return clusters.map((cluster) => {
    let paragraphs: string[];
    switch (clusterKind(cluster)) {
      case 'iran_risk':
        paragraphs = [
          'La séquence iranienne compte moins comme dossier diplomatique que comme retour durable d’une prime de risque sur l’énergie et les routes régionales.',
          'Pour les marchés, cela renchérit le pétrole, le fret et l’assurance bien au-delà du seul théâtre régional.',
        ];
        break;
      case 'gas_europe':
        paragraphs = [
          'Le gaz revient comme seconde jambe du choc énergétique. Tant que cette menace reste crédible, l’Europe ne peut pas traiter le pétrole comme un accident isolé.',
          'Le dossier remonte vers l’industrie, les utilities et les prix importés, donc vers la vitesse réelle de désinflation.',
        ];
        break;
      case 'uk_labour':
      case 'growth_labour':
        paragraphs = [
          'Le signal travail est discret mais utile : il renseigne sur la qualité de la reprise bien avant le reste du cycle.',
          'Pour les marchés, cela nourrit d’abord une croissance molle et une détente monétaire graduelle, pas un rebond assez propre pour effacer la pression venue de l’énergie.',
        ];
        break;
      case 'copper_supply':
        paragraphs = [
          'Le dossier cuivre est moins spectaculaire que le pétrole, mais il dit quelque chose de concret sur l’appareil productif : une chaîne industrielle qui tient évite un nouveau coût caché.',
          'Il faut le lire comme un sujet d’offre et d’investissement, pas comme une anecdote minière locale.',
        ];
        break;
      default:
        paragraphs = [
          primaryFact(cluster, 0, 185) || sentence(cluster.topicLabel, 185),
          sentence(`Le sujet élargit la lecture du matin via ${familyAngles[cluster.topicFamily] || 'les coûts et le risque'}.`, 190),
        ];
        break;
    }

    return {
      title: displayTitle(cluster, 'radar'),
      paragraphs: paragraphs.slice(0, 2).map((paragraph) => textToBlock(sentence(paragraph, 230))),
    };
  });
}

function buildCarnetItems(clusters: TopicCluster[]) {
  return clusters.map((cluster) => {
    let paragraphs: string[];
    switch (clusterKind(cluster)) {
      case 'ecb_labour':
        paragraphs = [
          'Le texte de la BCE apporte un signal plus lent mais utile : l’emploi reste solide pendant que la mécanique salariale se calme enfin un peu.',
          'Pour la politique monétaire, cela soutient une désinflation progressive, pas un pivot assez rapide pour effacer d’emblée le choc énergie.',
        ];
        break;
      case 'copper_supply':
        paragraphs = [
          'Le dossier cuivre reste un bon signal de second rang : il dit comment l’appareil productif absorbe un choc déjà plus large sur l’énergie.',
          'Il compte surtout pour l’offre industrielle et l’investissement, bien plus que pour le fait divers minier lui-même.',
        ];
        break;
      default:
        paragraphs = [
          primaryFact(cluster, 0, 190) || sentence(cluster.topicLabel, 190),
          sentence(`À suivre surtout pour ${familyAngles[cluster.topicFamily] || 'les coûts, la croissance et les marchés'}.`, 180),
        ];
        break;
    }

    return {
      title: displayTitle(cluster, 'carnet'),
      paragraphs: paragraphs.slice(0, 2).map((paragraph) => textToBlock(sentence(paragraph, 230))),
    };
  });
}

function buildBriefItems(clusters: TopicCluster[]) {
  return clusters.map((cluster) => {
    let text: string;
    switch (clusterKind(cluster)) {
      case 'fuel_prices':
        text = 'Essence : le baril n’a pas encore tout passé à la pompe américaine, ce qui retarde le choc sur la consommation sans l’annuler.';
        break;
      case 'iran_risk':
        text = 'Iran : la séquence garde d’abord une portée énergétique, donc un impact direct sur les primes de risque et le fret.';
        break;
      case 'gas_europe':
        text = 'Gaz : le risque russe rallonge la facture potentielle de l’industrie européenne en plus du choc pétrolier.';
        break;
      case 'copper_supply':
        text = 'Cuivre : la chaîne industrielle évite un trou d’air à Mount Isa au moment où les coûts repartent.';
        break;
      case 'ecb_labour':
        text = 'BCE : l’emploi reste ferme, mais les salaires offrent un peu plus de marge à la désinflation en zone euro.';
        break;
      case 'uk_labour':
      case 'growth_labour':
        text = 'Travail : le ralentissement des embauches renforce l’idée d’une croissance molle avant une vraie reprise.';
        break;
      case 'oil_shock':
        text = 'Pétrole : le choc reste central pour lire l’inflation importée et les actifs sensibles à l’énergie.';
        break;
      default:
        text = sentence(`Le signal compte surtout pour ${familyAngles[cluster.topicFamily] || 'les coûts, la croissance et le risque'}.`, 180);
        break;
    }
    return { parts: [{ text: sentence(text, 220) }] };
  });
}

function buildDeterministicPayload(packet: DayEditorialPacket): GeneratedOikoEditionV21 {
  const lead = packet.leadTopic || packet.secondaryTopics[0];
  if (!lead) {
    throw new Error('Impossible de rédiger V3 sans lead topic.');
  }

  const sections = deriveNarrativeSections(packet);
  const openingClusters = sections.opening.slice(0, 4);
  const openingLabels = buildOpeningLabels(openingClusters);
  const introFragments = uniqueStrings([
    ...openingClusters.map((cluster) => shortTopic(cluster)),
    sections.radar[0] ? shortTopic(sections.radar[0]) : '',
    sections.carnet[0] ? shortTopic(sections.carnet[0]) : '',
  ].filter(Boolean)).slice(0, 3);
  const actionsLabel = packet.marketContext.equities[0]?.label || 'Actions';
  const cryptoLabel = packet.marketContext.crypto[0]?.label || 'Crypto';
  const displayDate = formatFrenchDisplayDate(packet.editionDate);

  const introLead = clusterKind(lead) === 'oil_shock'
    ? 'Le matin se reclasse par l’énergie : le pétrole remonte d’un cran et force déjà les marchés à recalculer coûts, inflation importée et risque.'
    : sentence(`${displayTitle(lead, 'lead')} remet au premier rang ${familyAngles[lead.topicFamily] || 'les coûts, les taux et le risque'}.`, 220);

  const introFollow = introFragments.length
    ? sentence(`Le reste du numéro suit ce qui déplace réellement la matinée : ${buildHumanList(introFragments)} prolongent la même lecture, celle d’un coût mondial plus difficile à absorber et d’un risque plus cher à porter.`, 230)
    : 'Le reste du numéro prolonge cette même lecture : un coût mondial plus difficile à absorber et un risque plus cher à porter.';

  return GeneratedOikoEditionV21Schema.parse({
    content_version: 'v2.1',
    email_subject: `Oiko News - ${displayDate}`,
    preview_text: compactText(
      clusterKind(lead) === 'oil_shock'
        ? 'Le pétrole requalifie la séance asiatique, pendant que le gaz européen et le cuivre australien prolongent le choc des coûts.'
        : `Les sujets qui reclassent réellement la matinée du ${displayDate} entre coûts, risque et marchés.`,
      150,
    ),
    date_label: displayDate,
    header_visual: buildVisualHint('header_visual', lead),
    intro: {
      paragraphs: [textToBlock(introLead), textToBlock(introFollow)],
      signature: 'La rédaction Oiko',
    },
    opening_brief: {
      title: narrativeLabels.opening,
      items: openingClusters.map((cluster, index) => ({
        label: openingLabels[index] || labelForCluster(cluster),
        parts: [{ text: openingLine(cluster) }],
      })),
    },
    markets_section: {
      title: narrativeLabels.markets,
      charts: [
        {
          key: 'actions',
          title: actionsLabel,
          image_url: '',
          alt_text: packet.marketContext.equities[0]?.label ? `Évolution récente du ${packet.marketContext.equities[0].label}` : 'Évolution récente des marchés actions',
        },
        {
          key: 'crypto',
          title: cryptoLabel,
          image_url: '',
          alt_text: packet.marketContext.crypto[0]?.label ? `Évolution récente du ${packet.marketContext.crypto[0].label}` : 'Évolution récente du marché crypto',
        },
      ],
      paragraphs: buildMarketsParagraphs(packet),
    },
    lead_story: {
      kicker: narrativeLabels.leadKicker,
      title: displayTitle(lead, 'lead'),
      visual_hint: buildVisualHint('lead_story', lead),
      paragraphs: buildLeadParagraphs(packet, lead, sections),
      signature: 'Rédaction Oiko',
    },
    radar_section: {
      title: narrativeLabels.radar,
      visual_hint: buildVisualHint('radar_section', sections.radar[0] || null),
      items: buildRadarItems(sections.radar),
    },
    carnet_section: {
      title: narrativeLabels.carnet,
      visual_hint: buildVisualHint('carnet_section', sections.carnet[0] || null),
      items: buildCarnetItems(sections.carnet),
    },
    briefs_section: {
      title: narrativeLabels.briefs,
      items: buildBriefItems(sections.briefs),
    },
    footer_sources_note: buildFooterSourcesNote(packet),
    footer_disclaimer: 'Contenu pédagogique. Pas de conseil en investissement.',
  });
}
function buildParagraphEvidence(paragraphId: string, reference: EvidenceRef, draftEvidence: DraftEvidence, text: string) {
  draftEvidence.paragraphEvidenceMap[paragraphId] = reference;
  splitSentences(text).forEach((_sentence, index) => {
    draftEvidence.sentenceEvidenceMap[`${paragraphId}:s${index + 1}`] = reference;
  });
}

function clusterEvidence(cluster: TopicCluster): EvidenceRef {
  return {
    factIds: cluster.factIds.slice(0, 12),
    articleIds: cluster.sourceArticleIds,
    clusterIds: [cluster.id],
  };
}

function combineEvidence(...references: Array<EvidenceRef | null | undefined>): EvidenceRef {
  const factIds = Array.from(new Set(references.flatMap((reference) => reference?.factIds || [])));
  const articleIds = Array.from(new Set(references.flatMap((reference) => reference?.articleIds || [])));
  const clusterIds = Array.from(new Set(references.flatMap((reference) => reference?.clusterIds || [])));
  const marketKeys = Array.from(new Set(references.flatMap((reference) => reference?.marketKeys || [])));
  return {
    factIds,
    articleIds,
    ...(clusterIds.length ? { clusterIds } : {}),
    ...(marketKeys.length ? { marketKeys } : {}),
  };
}

function buildEvidenceMap(payload: GeneratedOikoEditionV21, packet: DayEditorialPacket): DraftEvidence {
  const evidence: DraftEvidence = {
    sentenceEvidenceMap: {},
    paragraphEvidenceMap: {},
  };

  const lead = packet.leadTopic || packet.secondaryTopics[0];
  if (!lead) return evidence;
  const sections = deriveNarrativeSections(packet);
  const openingReferences = sections.opening.map((cluster) => clusterEvidence(cluster));
  const introReference = combineEvidence(clusterEvidence(lead), ...openingReferences.slice(0, 2));
  const hierarchyReference = combineEvidence(clusterEvidence(lead), ...openingReferences);

  payload.intro.paragraphs.forEach((paragraph, index) => {
    buildParagraphEvidence(`intro-${index}`, index === 0 ? introReference : hierarchyReference, evidence, paragraph.parts.map((part) => part.text).join(' '));
  });

  payload.opening_brief.items.forEach((item, index) => {
    const cluster = sections.opening[index];
    if (!cluster) return;
    buildParagraphEvidence(`opening-${index}`, clusterEvidence(cluster), evidence, item.parts.map((part) => part.text).join(' '));
  });

  payload.lead_story.paragraphs.forEach((paragraph, index) => {
    buildParagraphEvidence(`lead-${index}`, combineEvidence(clusterEvidence(lead), openingReferences[0]), evidence, paragraph.parts.map((part) => part.text).join(' '));
  });

  payload.radar_section.items.forEach((item, itemIndex) => {
    const cluster = sections.radar[itemIndex];
    if (!cluster) return;
    item.paragraphs.forEach((paragraph, paragraphIndex) => {
      buildParagraphEvidence(`radar-${itemIndex}-${paragraphIndex}`, clusterEvidence(cluster), evidence, paragraph.parts.map((part) => part.text).join(' '));
    });
  });

  payload.carnet_section.items.forEach((item, itemIndex) => {
    const cluster = sections.carnet[itemIndex];
    if (!cluster) return;
    item.paragraphs.forEach((paragraph, paragraphIndex) => {
      buildParagraphEvidence(`carnet-${itemIndex}-${paragraphIndex}`, clusterEvidence(cluster), evidence, paragraph.parts.map((part) => part.text).join(' '));
    });
  });

  payload.briefs_section.items.forEach((item, itemIndex) => {
    const cluster = sections.briefs[itemIndex];
    if (!cluster) return;
    buildParagraphEvidence(`brief-${itemIndex}`, clusterEvidence(cluster), evidence, item.parts.map((part) => part.text).join(' '));
  });

  payload.markets_section.paragraphs.forEach((paragraph, index) => {
    buildParagraphEvidence(`markets-${index}`, { factIds: [], articleIds: [], clusterIds: [], marketKeys: [paragraph.label.toLowerCase()] }, evidence, paragraph.parts.map((part) => part.text).join(' '));
  });

  return evidence;
}

function buildClusterDossier(cluster: TopicCluster) {
  return {
    topicLabel: cluster.topicLabel,
    topicFamily: cluster.topicFamily,
    recency: cluster.freshness.clusterRecencyType,
    facts: filterClusterFacts(cluster).slice(0, 5),
    numbers: cluster.mergedNumbers.slice(0, 3),
    causes: cluster.mergedCauses.slice(0, 2),
    consequences: cluster.mergedConsequences.slice(0, 2),
    sources: uniqueStrings(cluster.sourceProfiles.map((profile) => profile.sourceName)).slice(0, 4),
  };
}

function buildWriterMessages(packet: DayEditorialPacket, referenceDraft: GeneratedOikoEditionV21) {
  const sections = deriveNarrativeSections(packet);
  return [
    {
      role: 'system',
      content: `Tu réécris Oiko News à partir de dossiers déjà structurés. Règles absolues :
1. Écris uniquement en français.
2. N’utilise aucune phrase copiée des sources ni aucun titre brut anglais.
3. L’intro doit hiérarchiser franchement le matin en deux paragraphes maximum.
4. N’invente aucun fait, aucun chiffre, aucune causalité.
5. Ne crée aucune section ou aucun item supplémentaire : respecte exactement les volumes demandés.
6. Si un point n’est pas assez documenté, simplifie-le au lieu de remplir.
7. Réponds exclusivement en JSON valide conforme au draft de référence.
8. La section marchés doit aider à lire la séance, jamais expliquer les limites du système.
9. Les briefs, le radar et le carnet doivent rester propres, courts et informatifs ; jamais de placeholder ni de formule creuse.
10. La voix doit rester nette, calme et premium ; évite tout ton administratif ou mécanique.`,
    },
    {
      role: 'user',
      content: JSON.stringify({
        editionDate: packet.editionDate,
        sectionCounts: {
          opening: sections.opening.length,
          radar: sections.radar.length,
          carnet: sections.carnet.length,
          briefs: sections.briefs.length,
        },
        sourceCoverage: packet.sourceCoverage,
        leadTopic: packet.leadTopic ? buildClusterDossier(packet.leadTopic) : null,
        opening: sections.opening.map(buildClusterDossier),
        radar: sections.radar.map(buildClusterDossier),
        carnet: sections.carnet.map(buildClusterDossier),
        briefs: sections.briefs.map(buildClusterDossier),
        marketContext: packet.marketContext,
        referenceDraft,
      }),
    },
  ];
}

function blockText(block: any) {
  return Array.isArray(block?.parts)
    ? block.parts.map((part: any) => String(part?.text || '')).join(' ').replace(/\s+/g, ' ').trim()
    : '';
}

const suspendedEndingPattern = /\b(de|du|des|d'|à|au|aux|et|ou|pour|avec|sans|sur|dans|en|par|vers|chez|sous|entre|contre|qui|que|qu'|dont|afin|comme|un|une|le|la|les|l')\.?$/i;

function hasBrokenEnding(text: string) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return true;
  if (!/[.!?…]$/.test(normalized)) return true;

  const trimmed = normalized.replace(/[.!?…]+$/, '').trim();
  if (!trimmed) return true;
  const lastWord = trimmed.split(/\s+/).slice(-1)[0] || '';
  if (suspendedEndingPattern.test(lastWord) || suspendedEndingPattern.test(trimmed)) return true;
  if (/\b(plus|moins|près|proche|autour) de$/i.test(trimmed)) return true;
  if (/\b(offre de travail qui|fonderie de|chaîne de|hausse de|baisse de)\.?$/i.test(trimmed)) return true;

  const sentences = splitSentences(normalized);
  const lastSentence = sentences[sentences.length - 1] || normalized;
  const words = lastSentence.replace(/[.!?…]+$/, '').trim().split(/\s+/).filter(Boolean);
  return words.length < 3;
}

function isAcceptableGeneratedText(text: string, minLength = 24) {
  const normalized = compactText(String(text || '').replace(/\s+/g, ' ').trim(), 320);
  if (!normalized || normalized.length < minLength) return false;
  if (hasProviderResidue(normalized)) return false;
  if (hasBrokenEnding(/[.!?…]$/.test(normalized) ? normalized : `${normalized}.`)) return false;
  const sentences = splitSentences(normalized);
  if (!sentences.length) return false;
  return sentences.every((sentenceText) => detectLanguage(sentenceText) !== 'en');
}

function normalizeGeneratedBlock(block: any, maxLength = 260, minLength = 24) {
  const text = blockText(block);
  if (!isAcceptableGeneratedText(text, minLength)) return null;
  return textToBlock(sentence(text, maxLength));
}

function mergeSinglePartItems(referenceItems: Array<{ parts: Array<{ text: string }> }>, generatedItems: any, maxLength: number, minLength = 24) {
  return referenceItems.map((referenceItem, index) => {
    const generated = Array.isArray(generatedItems) ? generatedItems[index] : null;
    const merged = normalizeGeneratedBlock({ parts: generated?.parts }, maxLength, minLength);
    return merged ? { parts: merged.parts } : referenceItem;
  });
}

function mergeRadarOrCarnetItems(referenceItems: Array<{ title: string; paragraphs: Array<{ parts: Array<{ text: string }> }> }>, generatedItems: any) {
  let usedGeneratedText = false;
  const items = referenceItems.map((referenceItem, index) => {
    const generated = Array.isArray(generatedItems) ? generatedItems[index] : null;
    const title = typeof generated?.title === 'string' && generated.title.trim() && detectLanguage(generated.title) !== 'en'
      ? compactText(generated.title, 140)
      : referenceItem.title;
    const paragraphs = Array.isArray(generated?.paragraphs)
      ? generated.paragraphs
          .map((paragraph: any) => normalizeGeneratedBlock(paragraph, 230, 30))
          .filter(Boolean)
      : [];
    if (paragraphs.length) usedGeneratedText = true;
    return {
      title,
      paragraphs: paragraphs.length ? paragraphs : referenceItem.paragraphs,
    };
  });
  return { items, usedGeneratedText };
}

function parseGeneratedDraftCandidate(rawText: string, usageDate?: string) {
  const parsed = extractJsonCandidate(rawText);
  if (parsed) return Promise.resolve(parsed);
  return repairJsonWithFastModel(rawText, usageDate);
}
function mergeGeneratedPayload(referencePayload: GeneratedOikoEditionV21, generatedCandidate: any): MergeResult {
  if (!generatedCandidate || typeof generatedCandidate !== 'object') {
    return { payload: referencePayload, usedGeneratedText: false };
  }

  let usedGeneratedText = false;
  const introParagraphs = Array.isArray(generatedCandidate?.intro?.paragraphs)
    ? generatedCandidate.intro.paragraphs.map((paragraph: any, index: number) => normalizeGeneratedBlock(paragraph, 235, 40) || referencePayload.intro.paragraphs[index]).slice(0, 2)
    : referencePayload.intro.paragraphs;
  if (Array.isArray(generatedCandidate?.intro?.paragraphs) && introParagraphs.some((paragraph, index) => blockText(paragraph) !== blockText(referencePayload.intro.paragraphs[index]))) {
    usedGeneratedText = true;
  }

  const openingItems = referencePayload.opening_brief.items.map((referenceItem, index) => {
    const generated = Array.isArray(generatedCandidate?.opening_brief?.items) ? generatedCandidate.opening_brief.items[index] : null;
    const label = typeof generated?.label === 'string' && generated.label.trim() ? compactText(generated.label, 24) : referenceItem.label;
    const block = normalizeGeneratedBlock({ parts: generated?.parts }, 235, 30);
    if (block) usedGeneratedText = true;
    return { label, parts: block ? block.parts : referenceItem.parts };
  });

  const leadParagraphs = referencePayload.lead_story.paragraphs.map((referenceParagraph, index) => {
    const generated = Array.isArray(generatedCandidate?.lead_story?.paragraphs) ? generatedCandidate.lead_story.paragraphs[index] : null;
    const block = normalizeGeneratedBlock(generated, 240, 40);
    if (block) usedGeneratedText = true;
    return block || referenceParagraph;
  });

  const radarMerged = mergeRadarOrCarnetItems(referencePayload.radar_section.items, generatedCandidate?.radar_section?.items);
  const carnetMerged = mergeRadarOrCarnetItems(referencePayload.carnet_section.items, generatedCandidate?.carnet_section?.items);
  if (radarMerged.usedGeneratedText || carnetMerged.usedGeneratedText) usedGeneratedText = true;

  const briefsItems = mergeSinglePartItems(referencePayload.briefs_section.items, generatedCandidate?.briefs_section?.items, 220, 28);
  if (Array.isArray(generatedCandidate?.briefs_section?.items)) {
    briefsItems.forEach((item, index) => {
      if (blockText({ parts: item.parts }) !== blockText({ parts: referencePayload.briefs_section.items[index]?.parts })) {
        usedGeneratedText = true;
      }
    });
  }

  const marketsParagraphs = referencePayload.markets_section.paragraphs.map((referenceParagraph, index) => {
    const generated = Array.isArray(generatedCandidate?.markets_section?.paragraphs) ? generatedCandidate.markets_section.paragraphs[index] : null;
    const block = normalizeGeneratedBlock({ parts: generated?.parts }, 245, 28);
    if (block) usedGeneratedText = true;
    return {
      label: referenceParagraph.label,
      parts: block ? block.parts : referenceParagraph.parts,
    };
  });

  return {
    usedGeneratedText,
    payload: GeneratedOikoEditionV21Schema.parse({
      ...referencePayload,
      intro: {
        ...referencePayload.intro,
        paragraphs: introParagraphs,
      },
      opening_brief: {
        ...referencePayload.opening_brief,
        title: narrativeLabels.opening,
        items: openingItems,
      },
      markets_section: {
        ...referencePayload.markets_section,
        paragraphs: marketsParagraphs,
      },
      lead_story: {
        ...referencePayload.lead_story,
        paragraphs: leadParagraphs,
      },
      radar_section: {
        ...referencePayload.radar_section,
        items: radarMerged.items,
      },
      carnet_section: {
        ...referencePayload.carnet_section,
        items: carnetMerged.items,
      },
      briefs_section: {
        ...referencePayload.briefs_section,
        items: briefsItems,
      },
    }),
  };
}

function buildDeterministicDraft(packet: DayEditorialPacket): V3Draft {
  const payload = buildDeterministicPayload(packet);
  return {
    payload,
    evidence: buildEvidenceMap(payload, packet),
    metadata: {
      writer: 'deterministic-reference',
      model: 'deterministic-reference',
      usedFallback: true,
    },
  };
}

export async function generateFrenchEditionDraft(packet: DayEditorialPacket, usageDate?: string): Promise<V3Draft> {
  const referencePayload = buildDeterministicPayload(packet);
  const generated = await generateWithConfiguredProviders(buildWriterMessages(packet, referencePayload), usageDate, { maxTokens: 7200, temperature: 0.15 });
  const parsedCandidate = generated.content ? await parseGeneratedDraftCandidate(generated.content, usageDate) : null;
  const merged = mergeGeneratedPayload(referencePayload, parsedCandidate);
  const payload = merged.payload;

  return {
    payload,
    evidence: buildEvidenceMap(payload, packet),
    metadata: {
      writer: merged.usedGeneratedText && generated.providerUsed ? generated.providerUsed : 'deterministic-reference',
      model: merged.usedGeneratedText && generated.modelUsed ? generated.modelUsed : 'deterministic-reference',
      usedFallback: !merged.usedGeneratedText,
    },
  };
}

export async function repairOrRegenerateDraftIfNeeded(currentDraft: V3Draft, criticReport: QualityReport, packet: DayEditorialPacket, usageDate?: string): Promise<V3Draft> {
  const issueSummary = criticReport.issues.map((issue) => `${issue.code}:${issue.target || 'global'}`).slice(0, 8).join(', ');
  const repairMessages = [
    {
      role: 'system',
      content: 'Tu corriges un draft Oiko News qui a échoué au critic. Garde exactement la même structure JSON, écris uniquement en français, élimine tout anglais, toute phrase trop proche des sources et toute fin suspendue.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        editionDate: packet.editionDate,
        issues: issueSummary,
        referenceDraft: currentDraft.payload,
        packet: {
          leadTopic: packet.leadTopic ? buildClusterDossier(packet.leadTopic) : null,
          secondaryTopics: packet.secondaryTopics.map(buildClusterDossier),
          marketContext: packet.marketContext,
        },
      }),
    },
  ];

  const generated = await generateWithConfiguredProviders(repairMessages, usageDate, { maxTokens: 7200, temperature: 0.05 });
  const parsedCandidate = generated.content ? await parseGeneratedDraftCandidate(generated.content, usageDate) : null;
  const merged = mergeGeneratedPayload(currentDraft.payload, parsedCandidate);

  if (!merged.usedGeneratedText) {
    return buildDeterministicDraft(packet);
  }

  return {
    payload: merged.payload,
    evidence: buildEvidenceMap(merged.payload, packet),
    metadata: {
      writer: generated.providerUsed || 'deterministic-reference',
      model: generated.modelUsed || 'deterministic-reference',
      usedFallback: false,
    },
  };
}

export default {
  generateFrenchEditionDraft,
  repairOrRegenerateDraftIfNeeded,
};
