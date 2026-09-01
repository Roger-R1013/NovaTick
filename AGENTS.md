# NovaTick - Project Standards & Rules

## 1. Project Information
- **Name:** NovaTick
- **Type:** Professional React Native (Expo) Application

## 2. Design System (Cyber-Luxury)
- **Strict Color Palette:**
  - Rich Pitch Black: `#050507`
  - Obsidian Dark: `#0F0F12` / `#16161A`
  - Gold Neon: `#FFD700`
  - Classic Gold: `#D4AF37`
  - Glowing Amber: `#F59E0B`
  - Crisp White: `#F4F4F5`
  - Metallic Muted Grey: `#A1A1AA`
- **Mobile Frame:** The app must be wrapped in a restricted container (`maxWidth: 420px`, `alignSelf: 'center'`, `borderRadius: 32`) on web views to simulate a strict mobile viewport.

## 3. Code Standards
- **TypeScript Obligatorio:** Strict typing is mandatory. No `any` unless absolutely necessary.
- **Modular Architecture:**
  - `src/components/`: Reusable UI elements strictly bound to `Theme.ts`. No hardcoded colors.
  - `src/screens/`: Feature screens.
  - `src/services/`: State management, API, and logic.
- **State Management:** Use Zustand for global state.
- **Navigation:** `@react-navigation` using role-based routing (Admin vs Attendee).

## 4. Linting & Formatting
- Code must pass ESLint and Prettier without syntax or formatting errors.
