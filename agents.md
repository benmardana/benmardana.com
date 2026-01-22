# Agents

Guidelines for AI agents working with this codebase.

## Project Overview

This is a personal website (benmardana.com) built with [Astro](https://astro.build/), deployed on [Cloudflare Pages](https://pages.cloudflare.com/). The site features interactive "doodles" - creative coding experiments including a Game of Life implementation with Three.js.

## Tech Stack

- **Framework**: Astro 4.x
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest
- **3D Graphics**: Three.js
- **State Management**: Hyperapp (for some interactive components)
- **Deployment**: Cloudflare Pages

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layouts
└── pages/          # File-based routing
    ├── doodles/    # Interactive experiments
    │   └── game-of-life/
    │       ├── _game-mutable/  # Core game logic
    │       └── three-js/       # 3D visualization
    └── index.astro
public/
├── css/           # Global stylesheets
└── img/           # Static images and icons
```

### File Naming Conventions

- Files prefixed with `_` (e.g., `_cell.ts`, `_game-of-life.ts`) are private/internal modules not meant to be directly accessed as routes
- Test files use the `.test.ts` suffix

## Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Run tests
npx vitest
```

## Testing

Tests are written with Vitest. Test files are co-located with their source files using the `.test.ts` suffix.

To run tests:

```bash
npx vitest        # Watch mode
npx vitest run    # Single run
```

## Code Style

- TypeScript strict mode is enabled via `astro/tsconfigs/strictest`
- Prefer functional patterns where appropriate (see Game of Life implementation)
- Keep components small and focused

## Working with Astro

- `.astro` files contain component markup with a frontmatter script section
- Pages in `src/pages/` are automatically routed based on file structure
- Static assets go in `public/`

## Game of Life Implementation

The Game of Life doodle has two implementations:

1. **Mutable version** (`_game-mutable/`): Object-oriented approach with Cell, Grid, and Game abstractions
2. **Fast version** (`three-js/`): Optimized for Three.js rendering

Both implementations use a toroidal grid (wrapping at edges).
