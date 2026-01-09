# AGENTS.md - Agent Steering Configuration

> This file provides comprehensive instructions for AI coding agents working on this SaaS student revision platform.

## Project Overview

**Project**: Premium Student Revision SaaS Platform  
**Stack**: React 18 + TypeScript + Vite + TailwindCSS  
**Target Users**: Economics L2 students (France)  
**Quality Standard**: Senior-level production code with modern UI/UX excellence

## Core Principles

### Code Quality Philosophy
- **Zero tolerance for technical debt** - Address issues immediately, don't defer
- **Premium over MVP** - Never create "placeholder" or "minimum viable" solutions
- **Type safety first** - Leverage TypeScript strictly, no `any` types without justification
- **Component reusability** - DRY principle, extract reusable patterns
- **Performance conscious** - Optimize renders, use React.memo, useMemo, useCallback appropriately

### UI/UX Excellence Requirements
- **Modern aesthetic** - Inspired by Notion, Apple, Linear design systems
- **No generic colors** - Use curated HSL-based color palettes with proper contrast
- **Premium animations** - Framer Motion for smooth, purposeful micro-interactions
- **Dark mode native** - Design for both themes equally, not as an afterthought
- **Responsive first** - Mobile, tablet, desktop - all must feel premium
- **No placeholders** - If images needed, generate them; if data needed, create realistic examples

## Technical Standards

### TypeScript
```typescript
// ✅ GOOD - Explicit types, clear interfaces
interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
  color: string; // Document what values are expected
}

// ❌ BAD - Loose typing
const SubjectCard = (props: any) => { ... }
```

### React Component Structure
```tsx
// Standard component order:
// 1. Imports (group by: React, external libs, internal components, types, styles)
// 2. Type definitions / interfaces
// 3. Constants
// 4. Component definition
// 5. Helper functions (if not extracted)
// 6. Export statement

// ✅ GOOD - Clean, organized
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

interface ProfileCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export function ProfileCard({ user, onEdit }: ProfileCardProps) {
  // Component logic
}

// ❌ BAD - Disorganized imports, no types
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import './styles.css';

function ProfileCard(props) { ... }
```

### File Naming Conventions
- **Components**: PascalCase - `SubjectCard.tsx`, `AppNav.tsx`
- **Utilities/Hooks**: camelCase - `useTheme.ts`, `formatDate.ts`
- **Pages**: PascalCase - `Home.tsx`, `MacroQCM.tsx`
- **Types**: PascalCase - `types.ts` exports `interface User`, `type Theme`
- **Data/Content**: camelCase - `questions.ts`, `chapters.ts`

### Component Architecture
- **Atomic Design** - Atoms → Molecules → Organisms → Templates → Pages
- **Feature-based modules** - Group by domain (e.g., `/features/qcm`, `/modules/s2/macro`)
- **Shared components** - `/components` for cross-feature UI elements
- **Design system** - `/design-system` for tokens, primitives, layouts

### Styling Standards
```tsx
// ✅ GOOD - Semantic Tailwind classes, logical grouping
<div className="
  relative 
  p-6 sm:p-8 
  rounded-3xl 
  border border-slate-200 dark:border-white/10 
  bg-white/60 dark:bg-slate-900/40 
  backdrop-blur-md 
  transition-all duration-300
  hover:border-indigo-200 dark:hover:border-white/20
  hover:-translate-y-1 hover:shadow-2xl
">

// ❌ BAD - Unordered mess
<div className="border-slate-200 p-6 rounded-3xl hover:shadow-2xl bg-white/60 dark:bg-slate-900/40 border backdrop-blur-md">
```

**Class Order**: Layout → Positioning → Sizing → Colors → Typography → Effects → Transitions → States

### State Management
- **Local state**: `useState` for component-specific state
- **Shared state**: Context API for theme, user preferences
- **Complex state**: Consider Zustand for global app state (if needed)
- **Server state**: React Query for API data (if implementing backend)

### Error Handling
```tsx
// ✅ GOOD - Graceful degradation
try {
  const data = await fetchQuestions();
  setQuestions(data);
} catch (error) {
  console.error('Failed to load questions:', error);
  setError('Unable to load questions. Please refresh.');
}

// ❌ BAD - Silent failures
const data = await fetchQuestions();
setQuestions(data);
```

## Design System

### Color Palette
- **Primary**: Indigo/Violet gradient (`from-indigo-500 to-violet-600`)
- **Accents**: Subject-specific (Blue for Macro, Cyan for Stats, Emerald for Micro, etc.)
- **Neutrals**: Slate scale for light/dark modes
- **Use HSL** for custom colors when needed, avoid hex for dynamic theming

### Typography
- **Font**: System font stack (optimized for performance)
- **Headings**: Bold, tight tracking (`tracking-tight`)
- **Body**: Normal weight, relaxed leading (`leading-relaxed`)
- **Labels**: Semibold, uppercase, wide tracking (`uppercase tracking-wider`)

### Spacing & Layout
- **Container max-width**: `max-w-6xl` for content sections
- **Grid gaps**: `gap-6 sm:gap-8` for responsive spacing
- **Card padding**: `p-6 sm:p-8` for touch-friendly areas
- **Border radius**: `rounded-3xl` for modern, soft feel

### Animation Standards
```tsx
// ✅ GOOD - Purposeful, spring-based animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>

// Production-ready loading states
<AnimatePresence mode="wait">
  {loading ? <Skeleton /> : <Content />}
</AnimatePresence>

// ❌ BAD - Generic, jarring animations
<div style={{ animation: 'fadeIn 1s' }}>
```

## Development Workflows

### Before Making Changes
1. **Understand context** - Read related files, understand the feature's purpose
2. **Check existing patterns** - Follow established conventions in the codebase
3. **Consider impact** - Will this change affect other components? Test thoroughly

### Making Code Changes
1. **Small, focused commits** - One logical change per commit
2. **Run type checks** - `npm run build` to ensure TypeScript is happy
3. **Test thoroughly** - Manual testing in browser, check dark mode, responsive views
4. **Check for unused imports** - Keep imports clean (should be linted)

### Testing Strategy
```bash
# Development server
npm run dev

# Type checking
npm run build

# Preview production build
npm run preview
```

**Manual Testing Checklist**:
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly  
- [ ] Mobile responsive (320px, 375px, 414px)
- [ ] Tablet responsive (768px, 1024px)
- [ ] Desktop responsive (1280px, 1920px)
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Navigation works as expected
- [ ] All interactive elements have hover/active states

## Project Structure

```
home-site/
├── src/
│   ├── components/       # Shared UI components
│   │   ├── Navigation/   # AppNav, Breadcrumbs
│   │   └── ui/          # Primitives (Background, etc.)
│   ├── design-system/   # Design tokens, layouts
│   ├── features/        # Feature-based modules (qcm, etc.)
│   ├── modules/         # Subject-specific content
│   │   └── s2/         # Semester 2
│   │       ├── macro/
│   │       ├── micro/
│   │       ├── stats/
│   │       └── socio/
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React contexts
│   ├── content/        # Static content, data
│   └── styles/         # Global styles
```

## Common Pitfalls to Avoid

### ❌ Don't Do This
- Using `any` type without strong justification
- Creating components with 500+ lines (extract sub-components)
- Inline styles when Tailwind is available
- Hardcoding values that should be in design tokens
- Forgetting dark mode variants
- Non-semantic HTML (div soup)
- Ignoring accessibility (missing ARIA labels, keyboard navigation)
- Leaving console.logs in production code
- Creating duplicate components instead of reusing
- Using `var` (always use `const`/`let`)

### ✅ Always Do This
- Provide explicit types for all props
- Use semantic HTML (`<section>`, `<article>`, `<nav>`, etc.)
- Add proper ARIA labels for interactive elements
- Ensure keyboard navigation works
- Test in both light and dark modes
- Optimize images (use WebP, proper sizing)
- Use React.memo for expensive components
- Extract magic numbers into named constants
- Document complex logic with comments
- Keep functions pure when possible

## Integration Guidelines

### Adding New Features
1. **Create feature branch** from main
2. **Plan architecture** - Sketch component tree, data flow
3. **Build incrementally** - Start with types, then UI, then logic
4. **Test continuously** - Don't wait until the end
5. **Document as you go** - Update this file if patterns change

### Adding New Subject Modules
```typescript
// Follow existing pattern in modules/s2/
modules/s2/[subject]/
├── pages/           # Subject-specific pages
│   ├── Home.tsx
│   └── QCM.tsx
├── components/      # Subject-specific components
├── data/           # Questions, chapters, content
└── types.ts        # Subject-specific types
```

## Performance Optimization

### Bundle Size
- **Code splitting** - Use dynamic imports for routes
- **Tree shaking** - Only import what you need
- **Lazy load** - Defer non-critical components

```tsx
// ✅ GOOD - Route-based code splitting
const MacroHome = lazy(() => import('@/modules/s2/macro/pages/Home'));

// ❌ BAD - Everything in one bundle
import { MacroHome } from '@/modules/s2/macro/pages/Home';
```

### Runtime Performance
- **Memoize expensive calculations** - `useMemo` for derived state
- **Prevent unnecessary re-renders** - `React.memo`, `useCallback`
- **Virtual scrolling** for long lists (if needed)
- **Debounce** search inputs, filter functions

## Accessibility Requirements

- **Keyboard navigation** - All interactive elements accessible via Tab
- **Focus indicators** - Visible focus rings (don't remove `outline`)
- **ARIA labels** - Describe icon buttons, complex interactions
- **Semantic HTML** - Use proper heading hierarchy (h1 → h2 → h3)
- **Color contrast** - WCAG AA minimum (4.5:1 for text)
- **Screen reader friendly** - Test with VoiceOver/NVDA

## Security Best Practices

- **Sanitize user input** - No direct HTML injection
- **Validate data** - Don't trust client-side validation alone (when backend added)
- **Secure dependencies** - Regular `npm audit`, keep packages updated
- **Environment variables** - Use `.env` for sensitive config, never commit secrets

## Questions & Clarifications

When uncertain about:
- **Feature scope** - Ask user for clarification
- **Design decisions** - Propose 2-3 options with pros/cons
- **Architecture changes** - Create implementation plan, get approval
- **Breaking changes** - Clearly communicate impact

## Final Reminder

**This is a premium SaaS product for students.** Every interaction should feel polished, every component should be reusable, every line of code should be maintainable. We're building for excellence, not just functionality.

If you're ever unsure whether your solution is "good enough," **it's probably not**. Aim higher. Make it beautiful, make it fast, make it right.
