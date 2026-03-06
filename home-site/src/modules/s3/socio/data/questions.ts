import type { Question } from '../components/ChapterQCM';

// ============================================
// CHAPITRE 1 : Naissance de la sociologie
// ============================================
export const chapter1Questions: Question[] = [
  { 
    id: 1, 
    question: "Quelle est la différence fondamentale entre la conception de l'état de nature chez Hobbes et chez Rousseau ?", 
    options: [
      "Hobbes le voit comme conflictuel, Rousseau comme paisible", 
      "Hobbes le voit comme paisible, Rousseau comme conflictuel", 
      "Les deux le voient comme conflictuel mais pour des raisons différentes", 
      "Les deux le voient comme paisible mais avec des conséquences différentes"
    ], 
    correct: 0, 
    explanation: "Hobbes voit l'état de nature comme une 'guerre de tous contre tous', tandis que Rousseau le voit comme paisible jusqu'à l'introduction de la propriété privée." 
  },
  { 
    id: 2, 
    question: "Pourquoi Platon défend-il l'éducation des femmes dans La République ?", 
    options: [
      "Pour promouvoir l'égalité des sexes par principe moral", 
      "Parce que les femmes ont les mêmes capacités naturelles que les hommes", 
      "Pour augmenter la population de la cité", 
      "Pour contrer l'influence d'Aristote qui s'y opposait"
    ], 
    correct: 1, 
    explanation: "Platon considère que les femmes ont les mêmes capacités intellectuelles que les hommes et peuvent donc accéder aux mêmes fonctions, y compris de gouvernement." 
  },
  { 
    id: 3, 
    question: "La théorie cyclique d'Ibn Khaldoun s'appuie sur quel concept central ?", 
    options: [
      "La 'asabiyya (cohésion sociale) qui se dégrade avec la prospérité", 
      "L'alternance naturelle entre guerre et paix", 
      "Les cycles économiques de croissance et récession", 
      "La succession des générations et l'oubli du passé"
    ], 
    correct: 0, 
    explanation: "La 'asabiyya (solidarité tribale) est forte chez les nomades, mais se dégrade quand ils deviennent sédentaires et prospères, causant leur chute." 
  },
  { 
    id: 4, 
    question: "Quelle innovation méthodologique majeure Ibn Khaldoun apporte-t-il par rapport aux penseurs antérieurs ?", 
    options: [
      "L'utilisation exclusive de sources écrites", 
      "L'observation empirique et la collecte de données sur le terrain", 
      "L'application des mathématiques à l'étude sociale", 
      "La comparaison systématique entre différentes civilisations"
    ], 
    correct: 1, 
    explanation: "Ibn Khaldoun innove en allant sur le terrain, observant directement les sociétés et collectant des données empiriques, préfigurant la méthode sociologique." 
  },
  { 
    id: 5, 
    question: "Pourquoi la parabole des chasseurs de Rousseau est-elle centrale dans sa théorie sociale ?", 
    options: [
      "Elle montre que la coopération est toujours possible", 
      "Elle illustre le dilemme entre intérêt individuel et collectif", 
      "Elle prouve que la chasse est l'activité sociale fondamentale", 
      "Elle démontre la supériorité de l'homme sur l'animal"
    ], 
    correct: 1, 
    explanation: "Cette parabole illustre comment l'intérêt individuel (poursuivre un lièvre) peut compromettre l'intérêt collectif (chasser le cerf ensemble)." 
  },
  { 
    id: 6, 
    question: "Dans quelle mesure la vision organique de Platon diffère-t-elle d'une simple hiérarchie sociale ?", 
    options: [
      "Elle justifie la domination par la force", 
      "Elle établit une complémentarité fonctionnelle entre les groupes", 
      "Elle permet la mobilité sociale entre les classes", 
      "Elle repose sur la richesse économique"
    ], 
    correct: 1, 
    explanation: "Chez Platon, chaque groupe a une fonction spécifique et complémentaire (comme les organes d'un corps), pas une simple domination hiérarchique." 
  },
  { 
    id: 7, 
    question: "Quelle critique Montesquieu adresse-t-il implicitement à l'absolutisme dans les Lettres persanes ?", 
    options: [
      "Le roi concentre trop de pouvoir sans contrôle", 
      "La justice varie selon le statut social des justiciables", 
      "L'oppression est universelle dans toutes les sociétés", 
      "Les mœurs parisiennes corrompent la noblesse"
    ], 
    correct: 2, 
    explanation: "Montesquieu montre que l'oppression existe partout (Orient et Occident), critiquant ainsi l'idée de supériorité du système français." 
  },
  { 
    id: 8, 
    question: "Pourquoi Aristote affirme-t-il que 'l'homme est un animal politique' ?", 
    options: [
      "Parce qu'il participe naturellement aux élections", 
      "Parce qu'il ne peut réaliser sa nature qu'en société", 
      "Parce qu'il aime dominer les autres", 
      "Parce qu'il est capable de créer des lois"
    ], 
    correct: 1, 
    explanation: "Pour Aristote, l'homme ne peut actualiser ses potentialités et atteindre le bonheur qu'au sein de la polis (cité), d'où sa nature politique." 
  },
  { 
    id: 9, 
    question: "Quelle est la principale limite épistémologique des penseurs des Lumières selon les sociologues modernes ?", 
    options: [
      "Ils manquaient de données statistiques", 
      "Ils mélangent analyse sociale et jugements moraux", 
      "Ils ignoraient les classes populaires", 
      "Ils ne connaissaient pas d'autres civilisations"
    ], 
    correct: 1, 
    explanation: "Les Lumières mélangent découvertes sociologiques et prescriptions morales, manquant de la neutralité axiologique nécessaire à la science." 
  },
  { 
    id: 10, 
    question: "En quoi la méthode comparative de Montesquieu préfigure-t-elle la sociologie moderne ?", 
    options: [
      "Elle utilise des statistiques pour comparer les sociétés", 
      "Elle établit des typologies pour systématiser l'analyse", 
      "Elle privilégie l'observation participante", 
      "Elle applique la méthode expérimentale aux faits sociaux"
    ], 
    correct: 1, 
    explanation: "Montesquieu classe et compare les phénomènes sociaux pour en dégager des types, méthode reprise par la sociologie moderne." 
  },
  { 
    id: 11, 
    question: "Quelle conception du progrès social Voltaire défend-il dans ses œuvres ?", 
    options: [
      "Le progrès est automatique et inévitable", 
      "Le progrès dépend de l'éducation et de la raison", 
      "Le progrès est impossible, les sociétés déclinent", 
      "Le progrès ne concerne que les élites"
    ], 
    correct: 1, 
    explanation: "Voltaire croit que l'éducation et l'usage de la raison peuvent faire progresser la société vers plus de tolérance et de justice." 
  },
  { 
    id: 12, 
    question: "Pourquoi ces penseurs sont-ils considérés comme des 'précurseurs' et non des sociologues ?", 
    options: [
      "Ils n'avaient pas de formation universitaire en sociologie", 
      "Ils s'intéressaient plus à la philosophie qu'à la société", 
      "Ils manquaient de méthode scientifique rigoureuse et de neutralité", 
      "Ils vivaient avant l'invention du terme 'sociologie'"
    ], 
    correct: 2, 
    explanation: "Il leur manque la méthode scientifique rigoureuse et la neutralité axiologique qui caractérisent la sociologie comme discipline autonome." 
  },
  { 
    id: 13, 
    question: "Comment la vision du contrat social évolue-t-elle de Hobbes à Rousseau ?", 
    options: [
      "De nécessité absolue à choix démocratique", 
      "De protection contre autrui à protection contre l'inégalité", 
      "De contrat individuel à contrat collectif", 
      "De solution temporaire à solution permanente"
    ], 
    correct: 1, 
    explanation: "Chez Hobbes, le contrat protège de la violence naturelle ; chez Rousseau, il doit protéger de l'inégalité créée par la propriété privée." 
  },
  { 
    id: 14, 
    question: "Quelle innovation conceptuelle majeure Ibn Khaldoun apporte-t-il à l'analyse sociale ?", 
    options: [
      "L'idée que les sociétés évoluent de manière cyclique", 
      "La distinction entre sociétés nomades et sédentaires", 
      "Le concept de cohésion sociale ('asabiyya) comme facteur explicatif", 
      "L'analyse des rapports entre économie et politique"
    ], 
    correct: 2, 
    explanation: "Le concept de 'asabiyya (cohésion/solidarité sociale) est l'innovation majeure d'Ibn Khaldoun pour expliquer la dynamique des sociétés." 
  },
  { 
    id: 15, 
    question: "Quelle critique fondamentale Rousseau adresse-t-il à la civilisation de son époque ?", 
    options: [
      "Elle a créé des inégalités artificielles par la propriété privée", 
      "Elle a affaibli les capacités physiques de l'homme", 
      "Elle a détruit les traditions ancestrales", 
      "Elle a séparé l'homme de la nature"
    ], 
    correct: 0, 
    explanation: "Pour Rousseau, la propriété privée a créé des inégalités qui n'existaient pas dans l'état de nature, corrompant ainsi la bonté naturelle." 
  }
];

// ============================================
// CHAPITRE 2 : Contexte d'émergence
// ============================================
export const chapter2Questions: Question[] = [
  { 
    id: 1, 
    question: "Pourquoi la formule de Duvignaud 'la sociologie est une fille des révolutions' est-elle particulièrement pertinente ?", 
    options: [
      "Parce que la sociologie étudie uniquement les révolutions politiques", 
      "Parce qu'elle naît de la nécessité de comprendre les bouleversements sociaux", 
      "Parce que les sociologues sont tous des révolutionnaires", 
      "Parce qu'elle remplace les anciennes sciences politiques"
    ], 
    correct: 1, 
    explanation: "La sociologie émerge pour comprendre et analyser les transformations sociales profondes causées par les révolutions politiques et industrielles." 
  },
  { 
    id: 2, 
    question: "Quelle est la conséquence sociologique majeure de la fin de la société d'ordre après 1789 ?", 
    options: [
      "L'apparition de nouvelles formes de stratification sociale", 
      "La disparition complète des inégalités sociales", 
      "Le retour aux structures féodales", 
      "L'émergence de la mobilité sociale et de l'incertitude statutaire"
    ], 
    correct: 3, 
    explanation: "La fin de la société d'ordre crée une incertitude statutaire : la position sociale n'est plus héritée mais devient mobile et incertaine." 
  },
  { 
    id: 3, 
    question: "En quoi l'approche de Villermé diffère-t-elle des enquêtes sociales antérieures ?", 
    options: [
      "Il utilise exclusivement des méthodes quantitatives", 
      "Il combine observation directe, entretiens et statistiques", 
      "Il se contente d'analyser des documents officiels", 
      "Il privilégie l'introspection philosophique"
    ], 
    correct: 1, 
    explanation: "Villermé innove en combinant plusieurs méthodes : observation sur le terrain, entretiens avec les ouvriers et analyse statistique." 
  },
  { 
    id: 4, 
    question: "Quelle critique fondamentale Saint-Simon adresse-t-il à l'organisation sociale de son époque ?", 
    options: [
      "Les anciens détenteurs du pouvoir (nobles, clercs) sont devenus inadaptés", 
      "L'industrialisation détruit les valeurs traditionnelles", 
      "La démocratie empêche le progrès scientifique", 
      "Les ouvriers ne sont pas assez éduqués"
    ], 
    correct: 0, 
    explanation: "Saint-Simon critique le fait que les anciens détenteurs du pouvoir ne correspondent plus aux besoins de la société industrielle." 
  },
  { 
    id: 5, 
    question: "Pourquoi Le Play s'intéresse-t-il spécifiquement aux budgets des ouvriers européens ?", 
    options: [
      "Pour calculer les salaires optimaux", 
      "Pour comprendre l'impact des modes de vie sur les comportements sociaux", 
      "Pour critiquer le capitalisme naissant", 
      "Pour établir des comparaisons économiques entre pays"
    ], 
    correct: 1, 
    explanation: "Le Play utilise les budgets comme révélateurs des modes de vie et des structures sociales des différentes classes ouvrières." 
  },
  { 
    id: 6, 
    question: "Quelle innovation conceptuelle majeure Marx apporte-t-il à l'analyse des classes sociales ?", 
    options: [
      "Il les définit par le niveau de revenu", 
      "Il les fonde sur les rapports de production", 
      "Il les base sur les différences culturelles", 
      "Il les explique par l'hérédité"
    ], 
    correct: 1, 
    explanation: "Marx définit les classes par leur position dans les rapports de production (propriété/non-propriété des moyens de production)." 
  },
  { 
    id: 7, 
    question: "En quoi le concept d'aliénation chez Marx dépasse-t-il une simple critique économique ?", 
    options: [
      "Il montre que l'aliénation affecte toute la personnalité de l'ouvrier", 
      "Il prouve que l'aliénation est uniquement psychologique", 
      "Il démontre que l'aliénation est temporaire", 
      "Il établit que l'aliénation concerne tous les travailleurs"
    ], 
    correct: 0, 
    explanation: "L'aliénation chez Marx n'est pas qu'économique : elle déshumanise l'ouvrier en le privant de sa créativité et de son essence humaine." 
  },
  { 
    id: 8, 
    question: "Quelle contradiction fondamentale Marx identifie-t-il dans le système capitaliste ?", 
    options: [
      "Entre production collective et appropriation privée", 
      "Entre offre et demande sur le marché", 
      "Entre tradition et modernité", 
      "Entre liberté individuelle et contrainte sociale"
    ], 
    correct: 0, 
    explanation: "Marx souligne la contradiction entre la production socialisée (collective) et l'appropriation privée des fruits du travail." 
  },
  { 
    id: 9, 
    question: "Pourquoi la révolution industrielle crée-t-elle un besoin de nouvelles formes de connaissance sociale ?", 
    options: [
      "Parce qu'elle génère de nouveaux problèmes sociaux inédits", 
      "Parce qu'elle améliore les conditions de vie", 
      "Parce qu'elle simplifie les relations sociales", 
      "Parce qu'elle renforce les structures traditionnelles"
    ], 
    correct: 0, 
    explanation: "L'industrialisation crée des phénomènes nouveaux (prolétariat, urbanisation, anomie) qui nécessitent de nouveaux outils d'analyse." 
  },
  { 
    id: 10, 
    question: "Quelle est la principale limite épistémologique de la sociologie naissante selon les critères scientifiques modernes ?", 
    options: [
      "Elle manque de données empiriques suffisantes", 
      "Elle confond description et prescription normative", 
      "Elle ignore les méthodes quantitatives", 
      "Elle se limite aux classes populaires"
    ], 
    correct: 1, 
    explanation: "La sociologie naissante mélange analyse objective et jugements de valeur, violant le principe de neutralité axiologique." 
  },
  { 
    id: 11, 
    question: "En quoi l'émergence du positivisme au XIXe siècle favorise-t-elle la naissance de la sociologie ?", 
    options: [
      "Il rejette toute forme de connaissance non-scientifique", 
      "Il propose d'appliquer la méthode scientifique aux phénomènes sociaux", 
      "Il privilégie l'observation sur la théorisation", 
      "Il encourage l'expérimentation sociale"
    ], 
    correct: 1, 
    explanation: "Le positivisme légitime l'idée qu'on peut étudier la société avec les mêmes méthodes que les sciences naturelles." 
  },
  { 
    id: 12, 
    question: "Quelle transformation sociale majeure la disparition des corporations révèle-t-elle ?", 
    options: [
      "Le passage d'une économie agricole à industrielle", 
      "La transition d'une société holiste à individualiste", 
      "L'évolution d'un système féodal vers capitaliste", 
      "Le changement d'une culture orale vers écrite"
    ], 
    correct: 1, 
    explanation: "La disparition des corporations marque le passage d'une société holiste (l'individu défini par son groupe) à individualiste (liberté contractuelle)." 
  },
  { 
    id: 13, 
    question: "Pourquoi l'urbanisation massive pose-t-elle des défis inédits à l'organisation sociale ?", 
    options: [
      "Elle concentre les populations dans des espaces restreints", 
      "Elle détruit les solidarités traditionnelles sans les remplacer", 
      "Elle augmente la criminalité urbaine", 
      "Elle complique la gestion administrative"
    ], 
    correct: 1, 
    explanation: "L'urbanisation détruit les solidarités villageoises et familiales traditionnelles, créant un vide social que la sociologie cherche à comprendre." 
  },
  { 
    id: 14, 
    question: "Quelle innovation méthodologique la Société d'économie sociale de Le Play apporte-t-elle ?", 
    options: [
      "L'utilisation systématique d'enquêtes par questionnaire", 
      "L'analyse comparative internationale des conditions ouvrières", 
      "L'observation participante dans les usines", 
      "L'application des statistiques aux phénomènes sociaux"
    ], 
    correct: 1, 
    explanation: "Le Play et sa société développent l'analyse comparative en étudiant les ouvriers de différents pays européens." 
  },
  { 
    id: 15, 
    question: "En quoi la 'question sociale' du XIXe siècle diffère-t-elle des problèmes sociaux antérieurs ?", 
    options: [
      "Elle concerne pour la première fois les classes populaires", 
      "Elle résulte de transformations structurelles, non de crises conjoncturelles", 
      "Elle nécessite l'intervention de l'État", 
      "Elle touche l'ensemble de la société européenne"
    ], 
    correct: 1, 
    explanation: "La 'question sociale' naît de transformations structurelles profondes (industrialisation), pas de crises temporaires comme les famines." 
  }
];

// ============================================
// CHAPITRE 3 : Durkheim et Weber
// ============================================
export const chapter3Questions: Question[] = [
  { 
    id: 1, 
    question: "Quelle est l'enjeu épistémologique fondamental de la distinction de Dilthey entre sciences de la nature et sciences de l'esprit ?", 
    options: [
      "Établir la supériorité des sciences naturelles", 
      "Légitimer des méthodes spécifiques pour l'étude du social", 
      "Critiquer l'usage des mathématiques en sciences sociales", 
      "Unifier toutes les sciences sous une même méthode"
    ], 
    correct: 1, 
    explanation: "Dilthey légitime l'idée que les sciences humaines nécessitent des méthodes propres (compréhension vs explication causale)." 
  },
  { 
    id: 2, 
    question: "Pourquoi Durkheim insiste-t-il sur le fait de traiter les faits sociaux 'comme des choses' ?", 
    options: [
      "Pour les rendre mesurables quantitativement", 
      "Pour rompre avec les prénotions du sens commun", 
      "Pour les distinguer des faits psychologiques", 
      "Pour appliquer la méthode expérimentale"
    ], 
    correct: 1, 
    explanation: "Traiter les faits sociaux comme des choses permet de s'affranchir des préjugés et représentations spontanées pour les étudier objectivement." 
  },
  { 
    id: 3, 
    question: "Quelle innovation méthodologique majeure Weber apporte-t-il avec les idéaux-types ?", 
    options: [
      "Il crée des modèles parfaits à reproduire dans la réalité", 
      "Il construit des outils conceptuels pour analyser la réalité complexe", 
      "Il établit des typologies exhaustives de tous les phénomènes sociaux", 
      "Il développe des méthodes de mesure objective"
    ], 
    correct: 1, 
    explanation: "Les idéaux-types sont des constructions conceptuelles qui permettent d'analyser et de comprendre la réalité sociale complexe." 
  },
  { 
    id: 4, 
    question: "En quoi la typologie des suicides de Durkheim dépasse-t-elle une simple classification descriptive ?", 
    options: [
      "Elle établit des corrélations statistiques précises", 
      "Elle révèle les mécanismes sociaux sous-jacents (intégration/régulation)", 
      "Elle permet de prédire les comportements individuels", 
      "Elle compare différentes sociétés historiques"
    ], 
    correct: 1, 
    explanation: "Durkheim montre que derrière les suicides individuels se cachent des mécanismes sociaux d'intégration et de régulation." 
  },
  { 
    id: 5, 
    question: "Quelle critique Weber adresse-t-il implicitement à l'approche durkheimienne ?", 
    options: [
      "Elle néglige les facteurs économiques", 
      "Elle ignore le sens que les acteurs donnent à leurs actions", 
      "Elle manque de rigueur méthodologique", 
      "Elle se limite aux sociétés occidentales"
    ], 
    correct: 1, 
    explanation: "Weber critique l'objectivisme durkheimien qui néglige la dimension subjective et le sens vécu par les acteurs sociaux." 
  },
  { 
    id: 6, 
    question: "Pourquoi Durkheim considère-t-il que le suicide altruiste peut sembler paradoxal ?", 
    options: [
      "Parce qu'il concerne des individus bien intégrés socialement", 
      "Parce qu'il touche principalement les classes supérieures", 
      "Parce qu'il augmente en période de prospérité économique", 
      "Parce qu'il est plus fréquent dans les sociétés modernes"
    ], 
    correct: 0, 
    explanation: "Le suicide altruiste semble paradoxal car il touche des individus bien intégrés, mais trop intégrés (kamikazes, sectes)." 
  },
  { 
    id: 7, 
    question: "Quelle est la différence fondamentale entre anomie et égoïsme chez Durkheim ?", 
    options: [
      "L'anomie concerne la régulation, l'égoïsme l'intégration", 
      "L'anomie est temporaire, l'égoïsme permanent", 
      "L'anomie touche les riches, l'égoïsme les pauvres", 
      "L'anomie est collective, l'égoïsme individuel"
    ], 
    correct: 0, 
    explanation: "L'anomie résulte d'un défaut de régulation sociale (normes), l'égoïsme d'un défaut d'intégration sociale (liens)." 
  },
  { 
    id: 8, 
    question: "En quoi la thèse de Weber sur l'éthique protestante révolutionne-t-elle l'analyse du capitalisme ?", 
    options: [
      "Elle montre que les idées religieuses peuvent influencer l'économie", 
      "Elle prouve que le capitalisme est d'origine exclusivement protestante", 
      "Elle démontre la supériorité morale du protestantisme", 
      "Elle établit une causalité directe entre religion et richesse"
    ], 
    correct: 0, 
    explanation: "Weber montre que les idées (éthique protestante) peuvent avoir des conséquences matérielles (esprit capitaliste), inversant le déterminisme marxiste." 
  },
  { 
    id: 9, 
    question: "Quelle tension fondamentale Weber identifie-t-il dans la doctrine calviniste de la prédestination ?", 
    options: [
      "Entre salut individuel et solidarité communautaire", 
      "Entre certitude théologique et angoisse existentielle", 
      "Entre ascèse mondaine et rejet du monde", 
      "Entre égalité spirituelle et hiérarchie sociale"
    ], 
    correct: 1, 
    explanation: "Les calvinistes croient en la prédestination mais ne savent pas s'ils sont élus, créant une angoisse qui les pousse au travail acharné." 
  },
  { 
    id: 10, 
    question: "Pourquoi la solidarité organique selon Durkheim ne conduit-elle pas nécessairement à l'harmonie sociale ?", 
    options: [
      "Parce qu'elle crée de nouvelles formes de conflits de classes", 
      "Parce que la division du travail peut devenir pathologique", 
      "Parce qu'elle affaiblit les liens familiaux traditionnels", 
      "Parce qu'elle favorise l'individualisme égoïste"
    ], 
    correct: 1, 
    explanation: "Durkheim identifie des formes pathologiques de division du travail (anomique, contrainte) qui empêchent la solidarité organique normale." 
  },
  { 
    id: 11, 
    question: "Quelle critique méthodologique majeure peut-on adresser à l'usage durkheimien des statistiques ?", 
    options: [
      "Il confond corrélation et causalité", 
      "Il néglige les variations individuelles", 
      "Il utilise des échantillons trop restreints", 
      "Il ignore les facteurs psychologiques"
    ], 
    correct: 0, 
    explanation: "Durkheim tend à inférer des relations causales à partir de corrélations statistiques, ce qui est méthodologiquement discutable." 
  },
  { 
    id: 12, 
    question: "En quoi le concept wébérien de 'Beruf' illustre-t-il la spécificité de l'éthique protestante ?", 
    options: [
      "Il sacralise le travail professionnel comme vocation divine", 
      "Il sépare radicalement vie spirituelle et activité économique", 
      "Il privilégie les métiers intellectuels sur les manuels", 
      "Il encourage la mobilité professionnelle"
    ], 
    correct: 0, 
    explanation: "Le 'Beruf' transforme le travail professionnel en vocation religieuse, donnant une dimension sacrée à l'activité économique." 
  },
  { 
    id: 13, 
    question: "Quelle limite épistémologique fondamentale sépare l'approche de Durkheim de celle de Weber ?", 
    options: [
      "Durkheim privilégie le quantitatif, Weber le qualitatif", 
      "Durkheim étudie les structures, Weber les actions", 
      "Durkheim vise l'explication causale, Weber la compréhension du sens", 
      "Durkheim analyse le présent, Weber l'histoire"
    ], 
    correct: 2, 
    explanation: "Opposition fondamentale entre l'explication causale objective (Durkheim) et la compréhension du sens subjectif (Weber)." 
  },
  { 
    id: 14, 
    question: "Pourquoi Weber considère-t-il que la sociologie ne peut pas être une science exacte comme la physique ?", 
    options: [
      "Parce que les phénomènes sociaux sont trop complexes à mesurer", 
      "Parce que les humains ont une capacité d'interprétation et de sens", 
      "Parce que les sociétés évoluent trop rapidement", 
      "Parce que les valeurs du chercheur interfèrent toujours"
    ], 
    correct: 1, 
    explanation: "Weber souligne que les humains donnent du sens à leurs actions, ce qui nécessite une méthode compréhensive spécifique." 
  },
  { 
    id: 15, 
    question: "Quelle innovation conceptuelle Durkheim apporte-t-il avec la notion de 'fait social' ?", 
    options: [
      "Il distingue le social du psychologique et du biologique", 
      "Il établit l'autonomie de la sociologie comme discipline", 
      "Il montre la contrainte exercée par la société sur l'individu", 
      "Toutes ces réponses sont correctes"
    ], 
    correct: 3, 
    explanation: "Le concept de fait social permet à Durkheim de fonder l'autonomie disciplinaire de la sociologie en définissant son objet spécifique." 
  }
];


// ============================================
// CHAPITRE 4 : École de Chicago
// ============================================
export const chapter4Questions: Question[] = [
  { 
    id: 1, 
    question: "Quelle rupture méthodologique majeure la première École de Chicago introduit-elle par rapport à la sociologie européenne ?", 
    options: [
      "L'abandon des statistiques au profit de l'observation qualitative", 
      "L'ethnographie urbaine et l'immersion prolongée sur le terrain", 
      "L'utilisation exclusive d'entretiens structurés", 
      "La priorité donnée aux enquêtes par questionnaire"
    ], 
    correct: 1, 
    explanation: "La 1ère École de Chicago innove en pratiquant l'ethnographie urbaine avec immersion prolongée, rompant avec les méthodes quantitatives européennes." 
  },
  { 
    id: 2, 
    question: "Comment Goffman conceptualise-t-il la différence entre 'scène' et 'coulisses' dans l'interaction sociale ?", 
    options: [
      "La scène est publique, les coulisses sont privées", 
      "La scène est où l'on joue un rôle, les coulisses où l'on se prépare ou se relâche", 
      "La scène est formelle, les coulisses informelles", 
      "La scène est professionnelle, les coulisses personnelles"
    ], 
    correct: 1, 
    explanation: "Chez Goffman, la scène est l'espace de représentation sociale où l'on maintient sa 'face', les coulisses où l'on peut abandonner le rôle." 
  },
  { 
    id: 3, 
    question: "Pourquoi Becker affirme-t-il que 'la déviance n'est pas une qualité de l'acte' ?", 
    options: [
      "Parce que tous les actes sont relatifs à la culture", 
      "Parce que la déviance dépend de la réaction sociale à l'acte", 
      "Parce que la déviance est définie par la loi uniquement", 
      "Parce que la déviance varie selon les individus"
    ], 
    correct: 1, 
    explanation: "Pour Becker, un acte devient déviant seulement quand il est étiqueté comme tel par la société - c'est la réaction qui crée la déviance." 
  },
  { 
    id: 4, 
    question: "Quelle est la différence fondamentale entre les 'entrepreneurs de morale' créateurs et exécuteurs selon Becker ?", 
    options: [
      "Les créateurs font les lois, les exécuteurs les appliquent", 
      "Les créateurs sont motivés par la croisade morale, les exécuteurs par l'intérêt professionnel", 
      "Les créateurs sont des politiques, les exécuteurs des policiers", 
      "Les créateurs sont bénévoles, les exécuteurs sont payés"
    ], 
    correct: 1, 
    explanation: "Becker distingue ceux qui créent les normes par conviction morale de ceux qui les appliquent par intérêt professionnel (carrière, salaire)." 
  },
  { 
    id: 5, 
    question: "Comment l'analyse de Goffman sur les 'institutions totales' remet-elle en question la psychiatrie de son époque ?", 
    options: [
      "Elle montre que les malades mentaux ne sont pas vraiment malades", 
      "Elle révèle que l'institution produit les comportements qu'elle prétend soigner", 
      "Elle prouve que les médecins sont incompétents", 
      "Elle démontre que l'hospitalisation est inutile"
    ], 
    correct: 1, 
    explanation: "Goffman montre que les comportements 'pathologiques' sont souvent des adaptations rationnelles aux contraintes de l'institution totale." 
  },
  { 
    id: 6, 
    question: "Quelle innovation conceptuelle majeure l'interactionnisme symbolique apporte-t-il à la sociologie ?", 
    options: [
      "L'importance des structures sociales objectives", 
      "Le primat du sens subjectif dans l'action sociale", 
      "La détermination économique des comportements", 
      "L'influence de l'inconscient sur les interactions"
    ], 
    correct: 1, 
    explanation: "L'interactionnisme symbolique place le sens que les acteurs donnent à leurs actions au cœur de l'analyse sociologique." 
  },
  { 
    id: 7, 
    question: "Pourquoi la notion de 'carrière déviante' de Becker est-elle révolutionnaire ?", 
    options: [
      "Elle montre que la déviance est héréditaire", 
      "Elle révèle que la déviance suit un processus d'apprentissage social", 
      "Elle prouve que la déviance est un choix rationnel", 
      "Elle démontre que la déviance est une maladie mentale"
    ], 
    correct: 1, 
    explanation: "Becker montre que devenir déviant est un processus d'apprentissage progressif, pas un trait de personnalité fixe." 
  },
  { 
    id: 8, 
    question: "Comment Goffman analyse-t-il la gestion du stigmate par les individus stigmatisés ?", 
    options: [
      "Ils acceptent passivement leur condition", 
      "Ils développent des stratégies de dissimulation ou d'affichage", 
      "Ils rejettent totalement les normes sociales", 
      "Ils cherchent uniquement à changer de groupe social"
    ], 
    correct: 1, 
    explanation: "Goffman analyse les stratégies actives des stigmatisés : cacher le stigmate, le révéler stratégiquement, ou le revendiquer." 
  },
  { 
    id: 9, 
    question: "Quelle critique l'École de Chicago adresse-t-elle implicitement au fonctionnalisme ?", 
    options: [
      "Le fonctionnalisme ignore les conflits sociaux", 
      "Le fonctionnalisme néglige le sens que les acteurs donnent à leurs actions", 
      "Le fonctionnalisme survalorise l'économie", 
      "Le fonctionnalisme est trop théorique"
    ], 
    correct: 1, 
    explanation: "L'École de Chicago critique l'approche macro-structurelle en privilégiant le micro-social et le sens subjectif des actions." 
  },
  { 
    id: 10, 
    question: "En quoi l'étude des 'rituels d'interaction' par Goffman révèle-t-elle l'ordre social ?", 
    options: [
      "Elle montre que l'ordre social est imposé par la force", 
      "Elle révèle que l'ordre social se construit dans les interactions quotidiennes", 
      "Elle prouve que l'ordre social est naturel", 
      "Elle démontre que l'ordre social est économique"
    ], 
    correct: 1, 
    explanation: "Goffman montre que l'ordre social se reproduit à travers les micro-rituels quotidiens de politesse et de respect mutuel." 
  },
  { 
    id: 11, 
    question: "Quelle est la portée théorique de la distinction entre déviance primaire et secondaire chez Becker ?", 
    options: [
      "Elle classe les déviances selon leur gravité", 
      "Elle distingue les causes individuelles et sociales de la déviance", 
      "Elle sépare l'acte initial de l'identité déviante construite socialement", 
      "Elle différencie déviance légale et morale"
    ], 
    correct: 2, 
    explanation: "La déviance primaire est l'acte initial, la secondaire est l'identité déviante que l'individu développe suite à l'étiquetage social." 
  },
  { 
    id: 12, 
    question: "Comment l'École de Chicago transforme-t-elle la conception de la ville en sociologie ?", 
    options: [
      "D'espace géographique en laboratoire social vivant", 
      "De lieu de résidence en centre économique", 
      "D'agglomération en communauté homogène", 
      "De territoire en espace politique"
    ], 
    correct: 0, 
    explanation: "L'École de Chicago fait de la ville un terrain d'observation privilégié des phénomènes sociaux, un 'laboratoire social' naturel." 
  },
  { 
    id: 13, 
    question: "Quelle innovation méthodologique Goffman apporte-t-il dans l'étude des interactions ?", 
    options: [
      "L'analyse statistique des conversations", 
      "L'observation ethnographique fine des rituels quotidiens", 
      "L'expérimentation contrôlée en laboratoire", 
      "L'analyse psychanalytique des comportements"
    ], 
    correct: 1, 
    explanation: "Goffman développe une micro-sociologie observationnelle qui décortique les rituels et codes des interactions quotidiennes." 
  },
  { 
    id: 14, 
    question: "Pourquoi l'approche de Becker sur la déviance est-elle qualifiée de 'constructiviste' ?", 
    options: [
      "Parce qu'elle construit des typologies de déviants", 
      "Parce qu'elle montre que la déviance est socialement construite par l'étiquetage", 
      "Parce qu'elle propose de construire de nouvelles normes", 
      "Parce qu'elle construit des théories explicatives"
    ], 
    correct: 1, 
    explanation: "Becker adopte une approche constructiviste : la déviance n'existe pas en soi, elle est construite par les processus sociaux d'étiquetage." 
  },
  { 
    id: 15, 
    question: "Quelle tension théorique l'École de Chicago révèle-t-elle entre structure et action ?", 
    options: [
      "Les structures déterminent complètement l'action", 
      "L'action individuelle crée les structures sociales", 
      "Structures et actions s'influencent mutuellement dans les interactions", 
      "Structure et action sont indépendantes"
    ], 
    correct: 2, 
    explanation: "L'École de Chicago montre que les structures sociales se reproduisent et se transforment à travers les interactions quotidiennes." 
  }
];

// ============================================
// CHAPITRE 5 : Bourdieu, Boudon, Lahire
// ============================================
export const chapter5Questions: Question[] = [
  { 
    id: 1, 
    question: "Comment Bourdieu résout-il le paradoxe entre déterminisme social et liberté individuelle à travers l'habitus ?", 
    options: [
      "L'habitus élimine complètement la liberté individuelle", 
      "L'habitus génère des pratiques libres mais dans les limites des conditions sociales", 
      "L'habitus n'a aucun effet sur les choix individuels", 
      "L'habitus permet une liberté totale indépendante des conditions sociales"
    ], 
    correct: 1, 
    explanation: "L'habitus produit des pratiques 'libres' mais pré-structurées par les conditions sociales d'acquisition, résolvant la tension déterminisme/liberté." 
  },
  { 
    id: 2, 
    question: "Pourquoi Bourdieu considère-t-il que l'école est 'conservatrice' malgré son apparence méritocratique ?", 
    options: [
      "Parce qu'elle enseigne des matières traditionnelles", 
      "Parce qu'elle reproduit les inégalités en les légitimant par le 'mérite'", 
      "Parce qu'elle refuse les innovations pédagogiques", 
      "Parce qu'elle privilégie les élèves les plus âgés"
    ], 
    correct: 1, 
    explanation: "L'école transforme les privilèges sociaux en 'mérite' scolaire, légitimant ainsi la reproduction des inégalités de classe." 
  },
  { 
    id: 3, 
    question: "Quelle est la différence fondamentale entre l'explication de Boudon et celle de Bourdieu concernant les inégalités scolaires ?", 
    options: [
      "Boudon privilégie les facteurs économiques, Bourdieu les facteurs culturels", 
      "Boudon met l'accent sur les choix rationnels, Bourdieu sur l'habitus incorporé", 
      "Boudon étudie le primaire, Bourdieu le supérieur", 
      "Boudon analyse les garçons, Bourdieu les filles"
    ], 
    correct: 1, 
    explanation: "Boudon explique par des stratégies conscientes coûts/bénéfices, Bourdieu par des dispositions inconscientes (habitus) de classe." 
  },
  { 
    id: 4, 
    question: "Comment Lahire remet-il en question l'unité de l'habitus bourdieusien ?", 
    options: [
      "Il montre que l'habitus n'existe pas", 
      "Il révèle que les individus ont des habitus pluriels et parfois contradictoires", 
      "Il prouve que l'habitus est uniquement économique", 
      "Il démontre que l'habitus est identique pour tous"
    ], 
    correct: 1, 
    explanation: "Lahire montre que les individus modernes ont des socialisations multiples créant des habitus pluriels, parfois contradictoires selon les contextes." 
  },
  { 
    id: 5, 
    question: "Quelle critique Boudon adresse-t-il à l'explication par la 'violence symbolique' de Bourdieu ?", 
    options: [
      "La violence symbolique n'existe pas", 
      "Elle sous-estime la rationalité des acteurs dans leurs choix", 
      "Elle survalorise le rôle de l'école", 
      "Elle ignore les différences de genre"
    ], 
    correct: 1, 
    explanation: "Boudon critique l'idée que les dominés subissent passivement, préférant l'explication par des choix rationnels même contraints." 
  },
  { 
    id: 6, 
    question: "Comment Bourdieu conceptualise-t-il la relation entre les différents types de capital ?", 
    options: [
      "Ils sont totalement indépendants les uns des autres", 
      "Ils sont convertibles les uns dans les autres selon des taux de change", 
      "Seul le capital économique compte vraiment", 
      "Ils s'annulent mutuellement"
    ], 
    correct: 1, 
    explanation: "Bourdieu montre que les capitaux sont convertibles (ex: capital culturel → diplôme → capital économique) selon des taux de change variables." 
  },
  { 
    id: 7, 
    question: "Quelle innovation méthodologique Bourdieu introduit-il avec l'Analyse des Correspondances Multiples (ACM) ?", 
    options: [
      "Elle permet de mesurer les opinions politiques", 
      "Elle révèle les correspondances entre positions sociales et pratiques culturelles", 
      "Elle calcule les revenus des différentes classes", 
      "Elle prédit les résultats scolaires"
    ], 
    correct: 1, 
    explanation: "L'ACM permet de visualiser les correspondances entre l'espace social (classes) et l'espace des styles de vie (goûts, pratiques)." 
  },
  { 
    id: 8, 
    question: "Pourquoi Boudon parle-t-il d'effets 'pervers' des actions individuelles rationnelles ?", 
    options: [
      "Parce que les individus sont irrationnels", 
      "Parce que la somme d'actions rationnelles peut produire un résultat collectif non désiré", 
      "Parce que la rationalité est immorale", 
      "Parce que les effets sont toujours négatifs"
    ], 
    correct: 1, 
    explanation: "Des choix individuellement rationnels peuvent créer des effets collectifs non voulus (ex: tous veulent éviter les bouchons → embouteillages)." 
  },
  { 
    id: 9, 
    question: "Comment Bourdieu explique-t-il que les dominés participent à leur propre domination ?", 
    options: [
      "Par la force physique des dominants", 
      "Par l'intériorisation des catégories de perception dominantes (violence symbolique)", 
      "Par ignorance de leur situation", 
      "Par calcul d'intérêt personnel"
    ], 
    correct: 1, 
    explanation: "La violence symbolique fait que les dominés perçoivent leur position avec les catégories des dominants, légitimant ainsi la domination." 
  },
  { 
    id: 10, 
    question: "Quelle est la portée critique de la notion de 'capital culturel' chez Bourdieu ?", 
    options: [
      "Elle valorise la culture des classes populaires", 
      "Elle dénaturalise les inégalités scolaires en montrant leur base sociale", 
      "Elle prouve la supériorité de la culture bourgeoise", 
      "Elle justifie la sélection scolaire"
    ], 
    correct: 1, 
    explanation: "Le concept de capital culturel révèle que les 'dons' scolaires sont en fait des héritages sociaux, dénaturalisant les inégalités." 
  },
  { 
    id: 11, 
    question: "Comment Lahire nuance-t-il l'analyse bourdieusienne de la lecture ?", 
    options: [
      "Il montre que personne ne lit vraiment", 
      "Il révèle des pratiques de lecture diversifiées au sein des mêmes individus", 
      "Il prouve que seules les élites lisent", 
      "Il démontre que la lecture n'a pas d'importance sociale"
    ], 
    correct: 1, 
    explanation: "Lahire montre que les mêmes individus peuvent avoir des pratiques de lecture 'légitimes' et 'illégitimes', nuançant l'homologie de classe." 
  },
  { 
    id: 12, 
    question: "Quelle critique épistémologique majeure peut-on adresser à l'opposition Bourdieu/Boudon ?", 
    options: [
      "Elle ignore les facteurs psychologiques", 
      "Elle reproduit le faux débat entre holisme et individualisme", 
      "Elle néglige les aspects économiques", 
      "Elle oublie les différences culturelles"
    ], 
    correct: 1, 
    explanation: "Cette opposition peut masquer la complémentarité possible entre analyse des structures (Bourdieu) et des stratégies (Boudon)." 
  },
  { 
    id: 13, 
    question: "Comment Bourdieu articule-t-il critique sociale et neutralité axiologique ?", 
    options: [
      "Il renonce complètement à la neutralité", 
      "Il prétend que l'objectivité scientifique révèle naturellement les dominations", 
      "Il sépare totalement science et politique", 
      "Il rejette l'idée de critique sociale"
    ], 
    correct: 1, 
    explanation: "Bourdieu soutient que l'analyse objective des mécanismes de domination a naturellement une portée critique et émancipatrice." 
  },
  { 
    id: 14, 
    question: "Quelle innovation conceptuelle Lahire apporte-t-il avec la notion de 'dissonance' ?", 
    options: [
      "Elle explique les conflits entre classes sociales", 
      "Elle révèle les contradictions internes aux individus socialisés dans des univers hétérogènes", 
      "Elle analyse les désaccords politiques", 
      "Elle étudie les problèmes de communication"
    ], 
    correct: 1, 
    explanation: "La dissonance révèle les tensions internes aux individus ayant intériorisé des schèmes contradictoires issus de socialisations multiples." 
  },
  { 
    id: 15, 
    question: "Pourquoi l'analyse de Boudon sur les 'inégalités des chances' reste-t-elle controversée ?", 
    options: [
      "Parce qu'elle nie l'existence des inégalités", 
      "Parce qu'elle peut légitimer les inégalités en les présentant comme rationnelles", 
      "Parce qu'elle ignore les facteurs économiques", 
      "Parce qu'elle ne s'appuie sur aucune donnée empirique"
    ], 
    correct: 1, 
    explanation: "En expliquant les inégalités par des choix rationnels, Boudon risque de les légitimer plutôt que de les critiquer." 
  }
];

// ============================================
// CHAPITRE 6 : La monnaie
// ============================================
export const chapter6Questions: Question[] = [
  { 
    id: 1, 
    question: "Comment Simmel analyse-t-il le paradoxe de la monnaie moderne ?", 
    options: [
      "Plus elle circule, moins elle a de valeur", 
      "Plus elle devient abstraite, plus elle acquiert de pouvoir concret sur les individus", 
      "Plus elle est abondante, plus elle crée de pauvreté", 
      "Plus elle est contrôlée, plus elle devient libre"
    ], 
    correct: 1, 
    explanation: "Simmel montre que la dématérialisation croissante de la monnaie (de l'or au crédit) renforce paradoxalement son emprise psychologique et sociale." 
  },
  { 
    id: 2, 
    question: "Quelle critique fondamentale Simiand adresse-t-il à la Théorie Quantitative de la Monnaie ?", 
    options: [
      "Elle surestime l'importance de la vitesse de circulation", 
      "Elle traite la monnaie comme un objet physique alors qu'elle est un fait social", 
      "Elle ignore les variations de prix", 
      "Elle néglige le rôle de l'État"
    ], 
    correct: 1, 
    explanation: "Simiand critique l'approche objectiviste : la monnaie n'est pas une chose mais une institution sociale fondée sur la confiance collective." 
  },
  { 
    id: 3, 
    question: "Comment Marx conceptualise-t-il le 'fétichisme de la marchandise' appliqué à l'argent ?", 
    options: [
      "L'argent devient un objet de culte religieux", 
      "Les rapports sociaux d'exploitation apparaissent comme des rapports entre choses", 
      "Les individus développent une passion excessive pour l'argent", 
      "L'argent remplace les relations humaines authentiques"
    ], 
    correct: 1, 
    explanation: "Le fétichisme masque les rapports sociaux : l'exploitation capitaliste apparaît comme un simple échange d'équivalents monétaires." 
  },
  { 
    id: 4, 
    question: "Quelle innovation méthodologique Zelizer apporte-t-elle à l'étude sociologique de l'argent ?", 
    options: [
      "L'analyse statistique des flux monétaires", 
      "L'ethnographie des pratiques de marquage social de l'argent", 
      "L'étude psychanalytique du rapport à l'argent", 
      "L'analyse économétrique des comportements financiers"
    ], 
    correct: 1, 
    explanation: "Zelizer étudie empiriquement comment les individus 'marquent' socialement l'argent selon son origine et sa destination." 
  },
  { 
    id: 5, 
    question: "Comment Weber articule-t-il monnaie et rationalisation du monde ?", 
    options: [
      "La monnaie permet de calculer et comparer toutes les valeurs", 
      "La monnaie simplifie les échanges commerciaux", 
      "La monnaie élimine les conflits sociaux", 
      "La monnaie démocratise l'accès aux biens"
    ], 
    correct: 0, 
    explanation: "Pour Weber, la monnaie est l'instrument de la rationalisation : elle permet le calcul, la comparaison et la quantification de toutes les valeurs." 
  },
  { 
    id: 6, 
    question: "Quelle tension Polanyi révèle-t-il entre marché et société concernant la monnaie ?", 
    options: [
      "Le marché crée la monnaie, la société la détruit", 
      "La monnaie-marchandise détruit les liens sociaux traditionnels", 
      "La société contrôle naturellement la monnaie", 
      "Le marché et la société coopèrent harmonieusement"
    ], 
    correct: 1, 
    explanation: "Polanyi montre que transformer la monnaie en pure marchandise détruit les protections sociales et désencastre l'économie." 
  },
  { 
    id: 7, 
    question: "Comment Zelizer remet-elle en question le postulat économique de fongibilité de l'argent ?", 
    options: [
      "En montrant que l'argent a différentes couleurs", 
      "En révélant que les individus attribuent des significations différentes selon l'origine de l'argent", 
      "En prouvant que l'argent perd de la valeur avec le temps", 
      "En démontrant que seuls les riches comprennent l'argent"
    ], 
    correct: 1, 
    explanation: "Zelizer montre que l'argent n'est pas fongible : l'argent du salaire, du cadeau, de l'héritage n'a pas la même signification sociale." 
  },
  { 
    id: 8, 
    question: "Quelle critique Simmel adresse-t-il à la vision purement instrumentale de la monnaie ?", 
    options: [
      "La monnaie n'est pas assez efficace comme instrument", 
      "La monnaie devient une fin en soi, pervertissant les relations sociales", 
      "La monnaie est trop complexe pour être un simple instrument", 
      "La monnaie ne peut pas mesurer les vraies valeurs"
    ], 
    correct: 1, 
    explanation: "Simmel analyse comment la monnaie, simple moyen à l'origine, devient une fin en soi, transformant les relations humaines." 
  },
  { 
    id: 9, 
    question: "Comment la sociologie économique remet-elle en question l'autonomie de l'économique ?", 
    options: [
      "En montrant que l'économie n'existe pas", 
      "En révélant que les faits économiques sont toujours encastrés dans le social", 
      "En prouvant que seule la sociologie compte", 
      "En démontrant que l'économie est irrationnelle"
    ], 
    correct: 1, 
    explanation: "La sociologie économique montre que les phénomènes économiques sont toujours socialement construits et culturellement situés." 
  },
  { 
    id: 10, 
    question: "Quelle est la portée critique de l'analyse de Marx sur l'argent dans le capitalisme ?", 
    options: [
      "L'argent corrompt moralement les individus", 
      "L'argent révèle et masque simultanément l'exploitation capitaliste", 
      "L'argent empêche le développement économique", 
      "L'argent crée de l'inflation"
    ], 
    correct: 1, 
    explanation: "Marx montre que l'argent révèle l'exploitation (plus-value) tout en la masquant (apparence d'échange équitable)." 
  },
  { 
    id: 11, 
    question: "Comment Simiand conçoit-il la monnaie comme 'fait social total' ?", 
    options: [
      "La monnaie concerne tous les secteurs de l'économie", 
      "La monnaie mobilise simultanément dimensions économique, sociale, symbolique et politique", 
      "La monnaie est utilisée par toute la société", 
      "La monnaie influence tous les prix"
    ], 
    correct: 1, 
    explanation: "Pour Simiand, la monnaie est un fait social total car elle engage simultanément l'économique, le social, le symbolique et le politique." 
  },
  { 
    id: 12, 
    question: "Quelle innovation conceptuelle la notion d'encastrement apporte-t-elle à l'analyse monétaire ?", 
    options: [
      "Elle montre que la monnaie est physiquement encastrée dans les objets", 
      "Elle révèle que les institutions monétaires sont insérées dans les rapports sociaux", 
      "Elle prouve que la monnaie est cachée dans l'économie", 
      "Elle démontre que la monnaie est fixée par l'État"
    ], 
    correct: 1, 
    explanation: "L'encastrement révèle que les institutions monétaires ne peuvent être comprises indépendamment des structures sociales et culturelles." 
  },
  { 
    id: 13, 
    question: "Comment Weber analyse-t-il l'impact de la monnaie sur la stratification sociale ?", 
    options: [
      "La monnaie égalise toutes les positions sociales", 
      "La monnaie permet une stratification plus fluide basée sur la richesse", 
      "La monnaie renforce les hiérarchies traditionnelles", 
      "La monnaie élimine la stratification sociale"
    ], 
    correct: 1, 
    explanation: "Weber montre que la monnaie permet une stratification plus mobile, où la richesse peut compenser l'absence de prestige traditionnel." 
  },
  { 
    id: 14, 
    question: "Quelle critique Zelizer adresse-t-elle à la vision économique standard de l'argent domestique ?", 
    options: [
      "L'économie ignore totalement l'argent domestique", 
      "L'économie traite l'argent domestique comme homogène alors qu'il est socialement différencié", 
      "L'économie survalorise l'argent domestique", 
      "L'économie considère l'argent domestique comme irrationnel"
    ], 
    correct: 1, 
    explanation: "Zelizer montre que l'argent domestique est différencié selon les sources, usages et significations, contrairement à la vision économique homogène." 
  },
  { 
    id: 15, 
    question: "Comment l'approche sociologique de la monnaie renouvelle-t-elle la compréhension des crises financières ?", 
    options: [
      "En montrant qu'elles sont purement techniques", 
      "En révélant leur dimension de crise de confiance et de lien social", 
      "En prouvant qu'elles sont inévitables", 
      "En démontrant qu'elles n'affectent que l'économie"
    ], 
    correct: 1, 
    explanation: "L'approche sociologique révèle que les crises financières sont aussi des crises de confiance collective et de cohésion sociale." 
  }
];


// ============================================
// CHAPITRE 7 : La consommation
// ============================================
export const chapter7Questions: Question[] = [
  { 
    id: 1, 
    question: "Comment Veblen explique-t-il le paradoxe de la consommation ostentatoire dans les classes supérieures ?", 
    options: [
      "Plus on est riche, plus on économise", 
      "Plus on affiche sa richesse, plus on renforce sa position sociale dominante", 
      "Plus on consomme, plus on s'appauvrit", 
      "Plus on est visible, plus on est critiqué"
    ], 
    correct: 1, 
    explanation: "Veblen montre que la consommation ostentatoire n'est pas du gaspillage mais un investissement social pour maintenir le prestige et la domination." 
  },
  { 
    id: 2, 
    question: "Quelle critique Halbwachs adresse-t-il à l'approche purement économique de la consommation ouvrière ?", 
    options: [
      "Elle surestime les revenus ouvriers", 
      "Elle réduit la consommation à une fonction du revenu, ignorant les normes sociales", 
      "Elle ignore les différences régionales", 
      "Elle néglige l'impact de l'inflation"
    ], 
    correct: 1, 
    explanation: "Halbwachs montre que la consommation ouvrière obéit aussi à des normes sociales et culturelles, pas seulement au niveau de revenu." 
  },
  { 
    id: 3, 
    question: "Comment Simmel analyse-t-il la dialectique entre imitation et distinction dans la mode ?", 
    options: [
      "La mode crée l'égalité sociale", 
      "La mode permet simultanément l'intégration sociale et la différenciation", 
      "La mode n'a aucun effet social", 
      "La mode divise définitivement les classes"
    ], 
    correct: 1, 
    explanation: "Simmel révèle que la mode permet l'imitation (intégration) tout en créant de nouvelles distinctions quand elle se diffuse." 
  },
  { 
    id: 4, 
    question: "Quelle innovation théorique Hirschman apporte-t-il avec sa théorie des préférences évolutives ?", 
    options: [
      "Les préférences sont génétiquement déterminées", 
      "Les préférences changent selon l'expérience de satisfaction/déception", 
      "Les préférences sont identiques pour tous", 
      "Les préférences n'existent pas"
    ], 
    correct: 1, 
    explanation: "Hirschman montre que les préférences évoluent : déception du privé → engagement public → déception du public → retour au privé." 
  },
  { 
    id: 5, 
    question: "Comment Goblot explique-t-il le rôle de la 'barrière' dans la consommation bourgeoise ?", 
    options: [
      "Elle protège physiquement les biens de consommation", 
      "Elle maintient la distinction sociale en excluant les classes populaires", 
      "Elle limite la production industrielle", 
      "Elle régule les prix du marché"
    ], 
    correct: 1, 
    explanation: "Goblot montre que la bourgeoisie crée des 'barrières' (codes, savoir-vivre) pour exclure les classes populaires de certaines consommations." 
  },
  { 
    id: 6, 
    question: "Quelle critique les enquêtes de Clair Brown adressent-elles à la théorie économique standard ?", 
    options: [
      "Les consommateurs ne sont pas rationnels", 
      "La consommation suit des normes sociales autant que des contraintes budgétaires", 
      "Les prix ne reflètent pas la valeur", 
      "L'offre détermine la demande"
    ], 
    correct: 1, 
    explanation: "Brown montre que les ménages suivent des 'normes de consommation' socialement définies, pas seulement des calculs économiques." 
  },
  { 
    id: 7, 
    question: "Comment Herpin et Verger nuancent-ils l'analyse bourdieusienne de la distinction par la consommation ?", 
    options: [
      "Ils montrent que la distinction n'existe pas", 
      "Ils révèlent des logiques de consommation transversales aux classes sociales", 
      "Ils prouvent que seules les élites se distinguent", 
      "Ils démontrent que la consommation est purement économique"
    ], 
    correct: 1, 
    explanation: "Herpin et Verger identifient des 'modes de vie' qui traversent les classes sociales, nuançant la correspondance classe/goût de Bourdieu." 
  },
  { 
    id: 8, 
    question: "Quelle tension Veblen révèle-t-il entre efficacité économique et prestige social ?", 
    options: [
      "Le prestige améliore toujours l'efficacité", 
      "La recherche de prestige peut conduire à des choix économiquement inefficaces", 
      "L'efficacité et le prestige sont indépendants", 
      "L'efficacité détruit automatiquement le prestige"
    ], 
    correct: 1, 
    explanation: "Veblen montre que la logique du prestige (gaspillage ostentatoire) peut contredire la logique d'efficacité économique." 
  },
  { 
    id: 9, 
    question: "Comment l'analyse sociologique de la consommation remet-elle en question la souveraineté du consommateur ?", 
    options: [
      "En montrant que les consommateurs n'ont pas d'argent", 
      "En révélant que les choix de consommation sont socialement contraints", 
      "En prouvant que les entreprises forcent à acheter", 
      "En démontrant que la publicité manipule totalement"
    ], 
    correct: 1, 
    explanation: "La sociologie montre que les 'choix' de consommation sont contraints par la position sociale, les normes de classe et les stratégies de distinction." 
  },
  { 
    id: 10, 
    question: "Quelle innovation méthodologique les enquêtes budgétaires apportent-elles à l'étude de la stratification sociale ?", 
    options: [
      "Elles mesurent directement les revenus", 
      "Elles révèlent les modes de vie et les normes de consommation par classe", 
      "Elles calculent l'inflation", 
      "Elles prédisent les comportements futurs"
    ], 
    correct: 1, 
    explanation: "Les enquêtes budgétaires permettent d'analyser les styles de vie et les normes de consommation comme marqueurs de position sociale." 
  },
  { 
    id: 11, 
    question: "Comment Simmel conceptualise-t-il le processus de diffusion sociale de la mode ?", 
    options: [
      "La mode se diffuse aléatoirement", 
      "La mode descend des classes supérieures vers les classes populaires", 
      "La mode monte des classes populaires vers les élites", 
      "La mode naît simultanément dans toutes les classes"
    ], 
    correct: 1, 
    explanation: "Simmel théorise le 'trickle-down' : la mode naît dans les élites puis se diffuse vers le bas, poussant les élites à innover." 
  },
  { 
    id: 12, 
    question: "Quelle critique l'approche sociologique adresse-t-elle à la notion économique de 'besoin' ?", 
    options: [
      "Les besoins n'existent pas", 
      "Les besoins sont socialement construits, pas naturels", 
      "Les besoins sont uniquement biologiques", 
      "Les besoins sont identiques pour tous"
    ], 
    correct: 1, 
    explanation: "La sociologie montre que les 'besoins' sont socialement définis et varient selon les groupes sociaux et les époques." 
  },
  { 
    id: 13, 
    question: "Comment Veblen explique-t-il l'émergence historique de la 'classe de loisir' ?", 
    options: [
      "Par le développement technologique", 
      "Par l'accumulation de richesses permettant l'exemption du travail productif", 
      "Par l'évolution démographique", 
      "Par les changements politiques"
    ], 
    correct: 1, 
    explanation: "Veblen montre que l'accumulation de richesses permet à certains groupes de s'exempter du travail productif et de se consacrer au loisir ostentatoire." 
  },
  { 
    id: 14, 
    question: "Quelle portée critique l'analyse de la consommation ostentatoire a-t-elle sur le capitalisme ?", 
    options: [
      "Elle justifie la croissance économique", 
      "Elle révèle l'irrationalité sociale du système économique", 
      "Elle prouve l'efficacité du marché", 
      "Elle démontre l'égalité des chances"
    ], 
    correct: 1, 
    explanation: "L'analyse révèle que le capitalisme produit du gaspillage socialement organisé (consommation ostentatoire) plutôt que l'efficacité optimale." 
  },
  { 
    id: 15, 
    question: "Comment l'étude sociologique de la consommation éclaire-t-elle les inégalités contemporaines ?", 
    options: [
      "Elle montre que les inégalités disparaissent", 
      "Elle révèle comment la consommation reproduit et légitime les hiérarchies sociales", 
      "Elle prouve que la consommation égalise les conditions", 
      "Elle démontre que seul le revenu compte"
    ], 
    correct: 1, 
    explanation: "La sociologie révèle que la consommation différentielle reproduit les inégalités tout en les légitimant par l'apparence du 'choix' individuel." 
  }
];

// ============================================
// CHAPITRE 8 : Société de consommation et culture de masse
// ============================================
export const chapter8Questions: Question[] = [
  { 
    id: 1, 
    question: "Comment Marcuse explique-t-il le processus de création des 'faux besoins' dans la société industrielle avancée ?", 
    options: [
      "Par la manipulation publicitaire directe", 
      "Par l'intégration des besoins du système productif dans la conscience individuelle", 
      "Par la contrainte économique pure", 
      "Par l'ignorance des consommateurs"
    ], 
    correct: 1, 
    explanation: "Marcuse montre que les 'faux besoins' sont intériorisés : les individus font leurs les besoins du système productif, perdant leur capacité critique." 
  },
  { 
    id: 2, 
    question: "Quelle critique fondamentale Baudrillard adresse-t-il à l'analyse marxiste de la consommation ?", 
    options: [
      "Marx ignore totalement la consommation", 
      "Marx reste prisonnier de la logique de la valeur d'usage, alors que nous consommons des signes", 
      "Marx survalorise la consommation", 
      "Marx ne comprend pas l'économie"
    ], 
    correct: 1, 
    explanation: "Baudrillard critique Marx qui oppose valeur d'usage/échange : dans la société de consommation, on consomme des signes et du statut social." 
  },
  { 
    id: 3, 
    question: "Comment Debord conceptualise-t-il la relation entre spectacle et aliénation ?", 
    options: [
      "Le spectacle divertit et libère de l'aliénation", 
      "Le spectacle est la forme achevée de l'aliénation moderne", 
      "Le spectacle n'a aucun rapport avec l'aliénation", 
      "Le spectacle combat l'aliénation"
    ], 
    correct: 1, 
    explanation: "Pour Debord, le spectacle est l'aliénation moderne : les individus vivent par procuration à travers les images, perdant leur vie réelle." 
  },
  { 
    id: 4, 
    question: "Quelle innovation théorique Adorno et Horkheimer apportent-ils avec le concept d'industrie culturelle ?", 
    options: [
      "Ils montrent que la culture devient une marchandise standardisée", 
      "Ils prouvent que l'industrie détruit la culture", 
      "Ils démontrent que la culture résiste à l'industrie", 
      "Ils révèlent que l'industrie améliore la culture"
    ], 
    correct: 0, 
    explanation: "L'industrie culturelle transforme la culture en marchandise standardisée, formatée selon les impératifs de rentabilité et de consommation de masse." 
  },
  { 
    id: 5, 
    question: "Comment Lasch explique-t-il le paradoxe de la démocratisation culturelle ?", 
    options: [
      "La démocratisation réussit parfaitement", 
      "La culture de masse creuse l'écart au lieu de le combler", 
      "La démocratisation n'existe pas", 
      "Seules les élites bénéficient de la culture"
    ], 
    correct: 1, 
    explanation: "Lasch montre que la culture de masse, censée démocratiser, crée en fait un fossé plus grand entre culture légitime et culture populaire." 
  },
  { 
    id: 6, 
    question: "Quelle critique Clouscard adresse-t-il à l'illusion de la démocratisation du luxe ?", 
    options: [
      "Le luxe n'existe plus", 
      "Le 'luxe démocratisé' n'est pas le vrai luxe des dominants", 
      "Tout le monde accède au même luxe", 
      "Le luxe démocratisé est supérieur"
    ], 
    correct: 1, 
    explanation: "Clouscard révèle que les biens 'démocratisés' ne sont pas les vrais biens de luxe : les dominants créent de nouveaux marqueurs distinctifs." 
  },
  { 
    id: 7, 
    question: "Comment la théorie du soft power renouvelle-t-elle l'analyse de la domination culturelle ?", 
    options: [
      "Elle montre que la culture n'a pas de pouvoir", 
      "Elle révèle que la domination passe par l'attraction culturelle plutôt que la coercition", 
      "Elle prouve que seule la force militaire compte", 
      "Elle démontre l'égalité culturelle"
    ], 
    correct: 1, 
    explanation: "Le soft power montre que la domination moderne passe par l'attraction (films, séries, mode de vie) plutôt que par la force directe." 
  },
  { 
    id: 8, 
    question: "Quelle tension Adorno et Horkheimer révèlent-ils dans la 'dialectique de la raison' ?", 
    options: [
      "La raison progresse toujours", 
      "La raison émancipatrice devient instrument de domination", 
      "La raison n'existe pas", 
      "La raison est toujours dominatrice"
    ], 
    correct: 1, 
    explanation: "La raison des Lumières, censée émanciper, devient instrument de domination technique et culturelle dans l'industrie culturelle." 
  },
  { 
    id: 9, 
    question: "Comment Baudrillard analyse-t-il la transformation de l'objet en signe dans la société de consommation ?", 
    options: [
      "Les objets perdent toute fonction", 
      "La valeur-signe (statut social) prime sur la valeur d'usage", 
      "Les objets deviennent invisibles", 
      "Les signes remplacent totalement les objets"
    ], 
    correct: 1, 
    explanation: "Baudrillard montre que nous consommons moins les objets pour leur utilité que pour leur valeur de signe social et de distinction." 
  },
  { 
    id: 10, 
    question: "Quelle critique l'École de Francfort adresse-t-elle à la culture de masse par rapport à l'art authentique ?", 
    options: [
      "La culture de masse est identique à l'art authentique", 
      "La culture de masse détruit la fonction critique et utopique de l'art", 
      "L'art authentique n'existe pas", 
      "La culture de masse améliore l'art"
    ], 
    correct: 1, 
    explanation: "Pour l'École de Francfort, l'art authentique a une fonction critique ; la culture de masse l'intègre au système et neutralise sa portée subversive." 
  },
  { 
    id: 11, 
    question: "Comment Marcuse explique-t-il la 'tolérance répressive' de la société de consommation ?", 
    options: [
      "La société interdit toute opposition", 
      "La société intègre et neutralise l'opposition en la commercialisant", 
      "La société encourage vraiment l'opposition", 
      "La tolérance n'existe pas"
    ], 
    correct: 1, 
    explanation: "La tolérance répressive récupère et commercialise l'opposition (rock rebelle → industrie musicale), la vidant de sa force contestataire." 
  },
  { 
    id: 12, 
    question: "Quelle innovation conceptuelle Debord apporte-t-il avec la notion de 'spectacle intégré' ?", 
    options: [
      "Le spectacle disparaît complètement", 
      "Le spectacle devient la médiation généralisée des rapports sociaux", 
      "Le spectacle se limite au divertissement", 
      "Le spectacle devient démocratique"
    ], 
    correct: 1, 
    explanation: "Le spectacle intégré ne se limite pas aux médias : il devient la forme même des rapports sociaux, médiatisés par les images et représentations." 
  },
  { 
    id: 13, 
    question: "Comment l'analyse de l'industrie culturelle remet-elle en question l'autonomie de l'art ?", 
    options: [
      "L'art devient totalement autonome", 
      "L'art est soumis aux impératifs commerciaux et perd son autonomie critique", 
      "L'autonomie de l'art se renforce", 
      "L'art n'a jamais été autonome"
    ], 
    correct: 1, 
    explanation: "L'industrie culturelle soumet l'art aux logiques commerciales, détruisant son autonomie et sa capacité de critique sociale." 
  },
  { 
    id: 14, 
    question: "Quelle critique Baudrillard adresse-t-il à la notion de 'société de consommation' elle-même ?", 
    options: [
      "La consommation n'existe pas", 
      "Nous ne consommons pas des objets mais du social codifié", 
      "La société de consommation est parfaite", 
      "Seuls les riches consomment"
    ], 
    correct: 1, 
    explanation: "Baudrillard radicalise : nous ne consommons pas des objets mais des signes sociaux, des différences, du statut social codifié." 
  },
  { 
    id: 15, 
    question: "Comment ces analyses critiques éclairent-elles les enjeux contemporains des réseaux sociaux ?", 
    options: [
      "Les réseaux sociaux échappent à ces logiques", 
      "Les réseaux sociaux actualisent le spectacle et l'industrie culturelle", 
      "Les réseaux sociaux sont purement techniques", 
      "Les réseaux sociaux libèrent totalement"
    ], 
    correct: 1, 
    explanation: "Les réseaux sociaux actualisent ces critiques : spectacularisation de soi, consommation de signes, industrie de l'attention, faux besoins de reconnaissance." 
  }
];

// ============================================
// CHAPITRE 9 : Le marché
// ============================================
export const chapter9Questions: Question[] = [
  { 
    id: 1, 
    question: "Comment Polanyi explique-t-il la 'grande transformation' du XIXe siècle ?", 
    options: [
      "L'industrialisation améliore les conditions de vie", 
      "La création du marché autorégulateur détruit les protections sociales traditionnelles", 
      "La démocratie se développe naturellement", 
      "La technologie libère l'humanité"
    ], 
    correct: 1, 
    explanation: "Polanyi montre que l'utopie du marché autorégulateur détruit les protections sociales, provoquant une contre-réaction protectrice de la société." 
  },
  { 
    id: 2, 
    question: "Quelle critique fondamentale Titmuss adresse-t-il à la marchandisation du don du sang ?", 
    options: [
      "Le marché est moins rentable", 
      "La marchandisation détruit les motivations altruistes et crée des risques sanitaires", 
      "Le don gratuit est plus lent", 
      "Les donneurs payés sont plus nombreux"
    ], 
    correct: 1, 
    explanation: "Titmuss montre que payer le sang attire des donneurs à risque (sélection adverse) et détruit l'éthique du don, réduisant l'efficacité globale." 
  },
  { 
    id: 3, 
    question: "Comment Zelizer remet-elle en question l'universalité des mécanismes de marché ?", 
    options: [
      "En montrant que tous les marchés fonctionnent identiquement", 
      "En révélant que les marchés sont culturellement et moralement construits", 
      "En prouvant que les marchés n'existent pas", 
      "En démontrant la supériorité du marché"
    ], 
    correct: 1, 
    explanation: "Zelizer montre que chaque marché est façonné par des valeurs culturelles spécifiques, remettant en question l'universalité des lois économiques." 
  },
  { 
    id: 4, 
    question: "Quelle innovation conceptuelle Polanyi apporte-t-il avec les 'marchandises fictives' ?", 
    options: [
      "Il invente de nouveaux produits", 
      "Il révèle que terre, travail et monnaie ne sont pas de vraies marchandises", 
      "Il critique la publicité mensongère", 
      "Il analyse les produits virtuels"
    ], 
    correct: 1, 
    explanation: "Polanyi montre que terre, travail et monnaie sont des 'marchandises fictives' car non produites pour la vente, leur marchandisation détruit la société." 
  },
  { 
    id: 5, 
    question: "Comment Bourdieu analyse-t-il le marché du logement comme 'champ' social ?", 
    options: [
      "Comme un simple mécanisme d'offre et demande", 
      "Comme un espace de luttes entre agents aux capitaux différents", 
      "Comme un secteur purement technique", 
      "Comme un domaine sans enjeux sociaux"
    ], 
    correct: 1, 
    explanation: "Bourdieu révèle que le marché du logement est un champ où s'affrontent des agents dotés de capitaux différents (économique, culturel, social)." 
  },
  { 
    id: 6, 
    question: "Quelle critique la sociologie économique adresse-t-elle au postulat de rationalité parfaite ?", 
    options: [
      "Les acteurs sont totalement irrationnels", 
      "La rationalité est socialement située et culturellement variable", 
      "Seuls les économistes sont rationnels", 
      "La rationalité n'existe pas"
    ], 
    correct: 1, 
    explanation: "La sociologie montre que la 'rationalité' varie selon les contextes sociaux et culturels, remettant en question l'universalité du modèle économique." 
  },
  { 
    id: 7, 
    question: "Comment l'exemple d'Edison illustre-t-il l'encastrement social des innovations techniques ?", 
    options: [
      "Edison était le meilleur inventeur", 
      "Le succès technique dépend des réseaux sociaux et politiques", 
      "La technologie s'impose naturellement", 
      "Edison a eu de la chance"
    ], 
    correct: 1, 
    explanation: "Edison a imposé ses centrales électriques grâce à ses relations sociales et politiques, montrant que le succès technique est socialement construit." 
  },
  { 
    id: 8, 
    question: "Quelle tension Polanyi révèle-t-il entre efficacité économique et cohésion sociale ?", 
    options: [
      "Elles sont toujours compatibles", 
      "Le marché autorégulateur détruit le tissu social", 
      "L'efficacité renforce automatiquement la cohésion", 
      "Elles sont totalement indépendantes"
    ], 
    correct: 1, 
    explanation: "Polanyi montre que la recherche d'efficacité par le marché autorégulateur peut détruire les liens sociaux et provoquer des crises." 
  },
  { 
    id: 9, 
    question: "Comment la notion de 'légitimité' du marché renouvelle-t-elle l'analyse économique ?", 
    options: [
      "Elle n'apporte rien de nouveau", 
      "Elle montre qu'un marché doit être socialement accepté pour fonctionner", 
      "Elle prouve que tous les marchés sont légitimes", 
      "Elle démontre l'illégitimité de tous les marchés"
    ], 
    correct: 1, 
    explanation: "La légitimité révèle qu'un marché ne peut fonctionner durablement sans acceptation sociale, ajoutant une dimension politique à l'analyse." 
  },
  { 
    id: 10, 
    question: "Quelle critique Schumpeter adresse-t-il à la vision néoclassique du marché ?", 
    options: [
      "Le marché est trop mathématique", 
      "Le marché est un processus créateur-destructeur, pas un équilibre statique", 
      "Le marché n'existe pas", 
      "Le marché est parfaitement prévisible"
    ], 
    correct: 1, 
    explanation: "Schumpeter voit le marché comme un processus dynamique de 'destruction créatrice', pas comme l'équilibre statique des néoclassiques." 
  },
  { 
    id: 11, 
    question: "Comment l'analyse sociologique des 'marchés contestés' éclaire-t-elle les débats contemporains ?", 
    options: [
      "Elle montre que tous les marchés sont acceptables", 
      "Elle révèle les enjeux moraux et politiques de la marchandisation", 
      "Elle prouve l'inefficacité de tous les marchés", 
      "Elle démontre la neutralité des marchés"
    ], 
    correct: 1, 
    explanation: "L'analyse des marchés contestés (organes, maternité de substitution) révèle que la marchandisation soulève des questions morales et politiques fondamentales." 
  },
  { 
    id: 12, 
    question: "Quelle innovation méthodologique la sociologie des marchés apporte-t-elle ?", 
    options: [
      "L'utilisation exclusive de statistiques", 
      "L'ethnographie des pratiques marchandes concrètes", 
      "L'abandon de toute méthode", 
      "La modélisation mathématique pure"
    ], 
    correct: 1, 
    explanation: "La sociologie des marchés privilégie l'observation ethnographique des pratiques concrètes plutôt que les modèles abstraits." 
  },
  { 
    id: 13, 
    question: "Comment Polanyi explique-t-il l'émergence des mouvements de protection sociale ?", 
    options: [
      "Par l'idéologie socialiste", 
      "Comme contre-mouvement spontané de la société face à la marchandisation", 
      "Par la générosité des élites", 
      "Par l'intervention de l'État"
    ], 
    correct: 1, 
    explanation: "Polanyi montre que les protections sociales émergent spontanément comme réaction défensive de la société contre la marchandisation totale." 
  },
  { 
    id: 14, 
    question: "Quelle portée critique l'analyse de l'encastrement a-t-elle sur le néolibéralisme ?", 
    options: [
      "Elle justifie le néolibéralisme", 
      "Elle révèle l'impossibilité d'un marché totalement désencastré", 
      "Elle ignore le néolibéralisme", 
      "Elle prouve la supériorité du marché libre"
    ], 
    correct: 1, 
    explanation: "L'encastrement montre que l'utopie néolibérale d'un marché pur est impossible : l'économie reste toujours socialement encastrée." 
  },
  { 
    id: 15, 
    question: "Comment l'approche sociologique renouvelle-t-elle la compréhension des crises économiques ?", 
    options: [
      "En montrant qu'elles sont purement techniques", 
      "En révélant leur dimension sociale et politique", 
      "En prouvant qu'elles sont inévitables", 
      "En démontrant qu'elles n'existent pas"
    ], 
    correct: 1, 
    explanation: "La sociologie révèle que les crises économiques sont aussi des crises de légitimité sociale et de confiance dans les institutions marchandes." 
  }
];


// ============================================
// CHAPITRE 10 : Le travail
// ============================================
export const chapter10Questions: Question[] = [
  { 
    id: 1, 
    question: "Quelle révolution conceptuelle l'expérience de Hawthorne apporte-t-elle à la compréhension du travail ?", 
    options: [
      "Elle prouve l'importance exclusive des conditions matérielles", 
      "Elle révèle que les relations humaines et l'attention portée aux travailleurs influencent la productivité", 
      "Elle démontre que seul le salaire motive", 
      "Elle montre l'inutilité de toute intervention managériale"
    ], 
    correct: 1, 
    explanation: "Mayo découvre que l'attention portée aux travailleurs (même négative) améliore la productivité, révolutionnant la vision purement technique du travail." 
  },
  { 
    id: 2, 
    question: "Comment Friedmann analyse-t-il les effets du taylorisme sur l'ouvrier ?", 
    options: [
      "Le taylorisme libère l'ouvrier de la pénibilité", 
      "Le taylorisme crée un 'travail en miettes' qui déshumanise", 
      "Le taylorisme améliore les conditions de travail", 
      "Le taylorisme n'a aucun effet sur l'ouvrier"
    ], 
    correct: 1, 
    explanation: "Friedmann critique le 'travail en miettes' : la parcellisation taylorienne détruit le sens du travail et déshumanise l'ouvrier." 
  },
  { 
    id: 3, 
    question: "Quelle innovation théorique Granovetter apporte-t-il avec la 'force des liens faibles' ?", 
    options: [
      "Les relations proches sont toujours plus utiles", 
      "Les connaissances lointaines donnent accès à des informations nouvelles", 
      "Les liens sociaux n'influencent pas l'emploi", 
      "Seules les relations familiales comptent"
    ], 
    correct: 1, 
    explanation: "Granovetter montre paradoxalement que les 'liens faibles' (connaissances) sont plus efficaces que les liens forts pour trouver un emploi." 
  },
  { 
    id: 4, 
    question: "Comment Naville conceptualise-t-il l'impact de l'automation sur le travail humain ?", 
    options: [
      "L'automation améliore toujours le travail", 
      "L'automation détruit progressivement le travail humain qualifié", 
      "L'automation n'affecte que les tâches simples", 
      "L'automation crée plus d'emplois qu'elle n'en détruit"
    ], 
    correct: 1, 
    explanation: "Naville analyse comment l'automation remplace progressivement le travail humain, même qualifié, transformant radicalement l'organisation productive." 
  },
  { 
    id: 5, 
    question: "Quelle critique McGregor adresse-t-il à la Théorie X du management ?", 
    options: [
      "Elle est trop optimiste sur la nature humaine", 
      "Elle crée un cercle vicieux en traitant les employés comme paresseux", 
      "Elle accorde trop d'autonomie aux employés", 
      "Elle ignore les aspects techniques du travail"
    ], 
    correct: 1, 
    explanation: "McGregor montre que la Théorie X (homme paresseux) crée un cercle vicieux : traiter les gens comme paresseux les rend effectivement paresseux." 
  },
  { 
    id: 6, 
    question: "Comment Cordonnier explique-t-il la nécessité du salaire d'efficience ?", 
    options: [
      "Pour attirer les meilleurs candidats uniquement", 
      "Pour résoudre les problèmes d'asymétrie d'information et de motivation", 
      "Pour respecter les lois du travail", 
      "Pour égaliser les salaires"
    ], 
    correct: 1, 
    explanation: "Cordonnier montre que le salaire d'efficience résout trois problèmes : sélection adverse (roublard), aléa moral (paresseux), aversion au risque (poltron)." 
  },
  { 
    id: 7, 
    question: "Quelle critique Fletcher adresse-t-elle aux critères de promotion dans les organisations ?", 
    options: [
      "Ils sont trop objectifs", 
      "Ils valorisent les compétences masculines au détriment des féminines", 
      "Ils favorisent trop les femmes", 
      "Ils ignorent totalement le genre"
    ], 
    correct: 1, 
    explanation: "Fletcher révèle que les critères valorisent l'autonomie et l'héroïsme (masculins) plutôt que la coopération et le relationnel (féminins)." 
  },
  { 
    id: 8, 
    question: "Comment Rifkin analyse-t-il l'évolution du travail à l'ère numérique ?", 
    options: [
      "Le numérique crée une égalisation des emplois", 
      "Le numérique provoque une polarisation entre emplois qualifiés et précaires", 
      "Le numérique n'affecte pas l'emploi", 
      "Le numérique améliore tous les emplois"
    ], 
    correct: 1, 
    explanation: "Rifkin prédit une polarisation : minorité d'emplois très qualifiés vs majorité d'emplois précaires, avec disparition des emplois intermédiaires." 
  },
  { 
    id: 9, 
    question: "Quelle innovation conceptuelle Rifkin apporte-t-il avec les 'prosommateurs' ?", 
    options: [
      "Il décrit de nouveaux métiers du marketing", 
      "Il révèle la fusion entre production et consommation", 
      "Il analyse les professionnels de la consommation", 
      "Il étudie les promoteurs immobiliers"
    ], 
    correct: 1, 
    explanation: "Le prosommateur produit ce qu'il consomme (énergie solaire, contenus web), brouillant la frontière production/consommation." 
  },
  { 
    id: 10, 
    question: "Comment l'analyse sociologique du travail remet-elle en question la vision économique standard ?", 
    options: [
      "En montrant que le travail n'a pas de valeur", 
      "En révélant que le travail est un fait social total, pas seulement économique", 
      "En prouvant l'inutilité du travail", 
      "En démontrant que seul l'argent motive"
    ], 
    correct: 1, 
    explanation: "La sociologie révèle que le travail engage l'identité, les relations sociales, le sens, pas seulement la production et le salaire." 
  },
  { 
    id: 11, 
    question: "Quelle tension Friedmann révèle-t-il entre efficacité productive et épanouissement humain ?", 
    options: [
      "Elles sont toujours compatibles", 
      "La rationalisation productive peut détruire le sens du travail", 
      "L'épanouissement nuit toujours à l'efficacité", 
      "Cette tension n'existe pas"
    ], 
    correct: 1, 
    explanation: "Friedmann montre que la recherche d'efficacité par la parcellisation peut détruire le sens du travail et l'épanouissement ouvrier." 
  },
  { 
    id: 12, 
    question: "Comment Granovetter remet-il en question l'individualisme méthodologique en économie du travail ?", 
    options: [
      "En montrant que les individus n'existent pas", 
      "En révélant que l'accès à l'emploi dépend des réseaux sociaux", 
      "En prouvant l'irrationalité des acteurs", 
      "En démontrant l'inutilité des qualifications"
    ], 
    correct: 1, 
    explanation: "Granovetter montre que 56% des emplois s'obtiennent par réseau social, remettant en question l'idée d'un marché du travail purement individuel." 
  },
  { 
    id: 13, 
    question: "Quelle critique l'École des Relations Humaines adresse-t-elle au taylorisme ?", 
    options: [
      "Le taylorisme est trop coûteux", 
      "Le taylorisme ignore la dimension sociale et psychologique du travail", 
      "Le taylorisme est techniquement défaillant", 
      "Le taylorisme favorise trop les ouvriers"
    ], 
    correct: 1, 
    explanation: "L'École des Relations Humaines montre que le taylorisme ignore les besoins sociaux et psychologiques des travailleurs, réduisant l'efficacité." 
  },
  { 
    id: 14, 
    question: "Comment l'analyse de Cordonnier éclaire-t-elle les inégalités salariales ?", 
    options: [
      "Toutes les inégalités sont justifiées", 
      "Les inégalités résultent aussi de stratégies face à l'incertitude", 
      "Les inégalités n'existent pas", 
      "Seule la productivité explique les salaires"
    ], 
    correct: 1, 
    explanation: "Cordonnier montre que les différences de salaire s'expliquent aussi par les stratégies face au risque (poltron vs entrepreneur)." 
  },
  { 
    id: 15, 
    question: "Quelle portée critique l'analyse sociologique du travail a-t-elle sur les transformations contemporaines ?", 
    options: [
      "Elle justifie toutes les transformations", 
      "Elle révèle les enjeux humains et sociaux des mutations du travail", 
      "Elle s'oppose à tout changement", 
      "Elle ignore les transformations actuelles"
    ], 
    correct: 1, 
    explanation: "La sociologie du travail éclaire les enjeux humains des mutations (télétravail, IA, précarisation) au-delà des seuls aspects économiques." 
  }
];

// ============================================
// TOUTES LES QUESTIONS (pour le QCM global)
// ============================================
export const allQuestions = [
  ...chapter1Questions.map(q => ({ ...q, chapter: 1, theme: 'theme1' as const })),
  ...chapter2Questions.map(q => ({ ...q, chapter: 2, theme: 'theme1' as const })),
  ...chapter3Questions.map(q => ({ ...q, chapter: 3, theme: 'theme1' as const })),
  ...chapter4Questions.map(q => ({ ...q, chapter: 4, theme: 'theme1' as const })),
  ...chapter5Questions.map(q => ({ ...q, chapter: 5, theme: 'theme1' as const })),
  ...chapter6Questions.map(q => ({ ...q, chapter: 6, theme: 'theme2' as const })),
  ...chapter7Questions.map(q => ({ ...q, chapter: 7, theme: 'theme2' as const })),
  ...chapter8Questions.map(q => ({ ...q, chapter: 8, theme: 'theme2' as const })),
  ...chapter9Questions.map(q => ({ ...q, chapter: 9, theme: 'theme2' as const })),
  ...chapter10Questions.map(q => ({ ...q, chapter: 10, theme: 'theme2' as const })),
];

export type GlobalQuestion = (typeof allQuestions)[number];
