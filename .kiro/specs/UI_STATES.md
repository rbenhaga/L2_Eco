# UI States — Patterns Obligatoires

## Principe Fondamental

**Tout composant qui affiche des données DOIT gérer 4 états.**
Ne jamais livrer un composant sans ces états.

---

## Les 4 États

```typescript
type DataState<T> =
  | { status: 'empty' }
  | { status: 'loading' }
  | { status: 'error'; error: string; retry?: () => void }
  | { status: 'success'; data: T }
```

---

## 1. Empty State

### Quand
- Liste sans éléments
- Première visite (pas de données)
- Recherche sans résultats
- Filtres trop restrictifs

### Pattern Visuel

```
┌─────────────────────────────────────────┐
│                                         │
│         [Illustration/Icon]             │
│                                         │
│        Titre court et clair             │
│                                         │
│    Message explicatif (1-2 lignes)      │
│                                         │
│        [ Action principale ]            │
│                                         │
└─────────────────────────────────────────┘
```

### Règles
- Illustration ou icône contextuelle (pas générique)
- Titre positif (pas "Aucun résultat")
- Message qui guide vers l'action suivante
- CTA clair quand applicable

### Exemples

| Contexte | Titre | Message | CTA |
|----------|-------|---------|-----|
| Cours vides | Commencez votre parcours | Choisissez une matière pour débuter | Voir les matières |
| Recherche vide | Aucun résultat pour "X" | Essayez d'autres termes ou filtres | Effacer les filtres |
| QCM non tentés | Prêt à tester vos connaissances ? | Ce QCM contient 10 questions | Commencer le QCM |

---

## 2. Loading State

### Quand
- Fetch initial des données
- Navigation vers nouvelle page
- Soumission de formulaire
- Chargement de contenu additionnel

### Patterns Visuels

#### A) Skeleton (recommandé pour contenu structuré)

```
┌─────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░                │
│ ████████░░░░░░░░                        │
│                                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│    │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│    │
│ └─────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────┘
```

**Règles skeleton:**
- Matcher la structure du contenu réel
- Animation pulse subtile
- Gris neutre (slate-200 ou équivalent)

#### B) Spinner (pour actions courtes)

```
┌─────────────────────────────────────────┐
│                                         │
│               [Spinner]                 │
│          Chargement...                  │
│                                         │
└─────────────────────────────────────────┘
```

**Règles spinner:**
- Utiliser pour durées < 1s
- Centré dans le conteneur
- Texte optionnel mais utile

#### C) Progress (pour opérations longues)

```
┌─────────────────────────────────────────┐
│                                         │
│    Téléchargement du cours...           │
│    ████████████████░░░░░░░░░  67%       │
│                                         │
└─────────────────────────────────────────┘
```

### Règles Générales
- Minimum 200ms avant hide (éviter flash)
- Transition fluide vers contenu
- Position identique au contenu final (pas de layout shift)

---

## 3. Error State

### Quand
- Fetch échoué
- Timeout réseau
- Erreur serveur
- Validation échouée

### Pattern Visuel

```
┌─────────────────────────────────────────┐
│                                         │
│         [Error Icon]                    │
│                                         │
│     Impossible de charger le cours      │
│                                         │
│    Vérifiez votre connexion et         │
│    réessayez dans quelques instants.    │
│                                         │
│           [ Réessayer ]                 │
│                                         │
└─────────────────────────────────────────┘
```

### Règles
- Icône d'erreur visible (pas de texte seul)
- Message compréhensible (pas de code technique)
- Suggestion de solution quand possible
- Bouton retry TOUJOURS présent si applicable

### Messages Type

| Erreur | Message utilisateur |
|--------|---------------------|
| Network error | Impossible de se connecter. Vérifiez votre connexion. |
| 404 | Cette page n'existe pas ou a été déplacée. |
| 500 | Une erreur s'est produite. Réessayez plus tard. |
| Timeout | Le chargement prend trop de temps. Réessayez. |
| Validation | Veuillez vérifier les champs en rouge. |

### Anti-patterns
- ❌ "Error 500"
- ❌ "Undefined is not a function"
- ❌ Message sans action possible
- ❌ Erreur qui disparaît toute seule

---

## 4. Success State

### Quand
- Données chargées
- Action complétée
- Formulaire soumis

### Règles
- Transition fluide depuis loading
- Pas de célébration excessive
- Focus sur le contenu/résultat

### Pour les actions ponctuelles (toast/feedback)

```
┌─────────────────────────────────────────┐
│  ✓ Réponse enregistrée                  │
└─────────────────────────────────────────┘
```

**Règles toast:**
- Position fixe (top-right ou bottom-center)
- Auto-dismiss après 3-5s
- Dismissable manuellement
- Icône + texte court

---

## Implémentation React

### Hook Pattern

```typescript
// useAsyncData.ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: T }

function useAsyncData<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' })

  const execute = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const data = await fetcher()
      setState({ status: 'success', data })
    } catch (e) {
      setState({ status: 'error', error: e.message })
    }
  }, [fetcher])

  return { ...state, execute }
}
```

### Component Pattern

```tsx
// DataContainer.tsx
interface Props<T> {
  state: AsyncState<T>
  onRetry?: () => void
  emptyMessage?: string
  children: (data: T) => React.ReactNode
}

function DataContainer<T>({ state, onRetry, emptyMessage, children }: Props<T>) {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return <Skeleton />

    case 'error':
      return (
        <ErrorState
          message={state.error}
          onRetry={onRetry}
        />
      )

    case 'success':
      if (isEmpty(state.data)) {
        return <EmptyState message={emptyMessage} />
      }
      return children(state.data)
  }
}
```

---

## Checklist par Composant

Avant de livrer un composant data-driven:

- [ ] Empty state défini et implémenté
- [ ] Loading state (skeleton ou spinner)
- [ ] Error state avec message clair + retry
- [ ] Success state avec transition fluide
- [ ] Tous les états accessibles au clavier
- [ ] Tous les états annoncés aux screen readers

---

## Référence Rapide

| Composant | Empty | Loading | Error |
|-----------|-------|---------|-------|
| Liste cours | Illustration + CTA | Skeleton cards | Message + retry |
| QCM | "Prêt à commencer" | Spinner | Message + retry |
| Recherche | "Aucun résultat" | Skeleton résultats | Message générique |
| Profil progression | "Commencez à réviser" | Skeleton stats | Message + retry |
