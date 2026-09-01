# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Reglas de Trabajo y Buenas Prácticas

Este proyecto está configurado como un entorno profesional de React Native con Expo y TypeScript.

## Arquitectura Modular (Estructura `src/`)

El código base se organiza bajo la carpeta `src/`:
- **`components/`**: Componentes de UI reutilizables (Botones, Tarjetas, Inputs). Deben ser "dumb components" siempre que sea posible.
- **`screens/`**: Pantallas de la aplicación (HomeScreen, ProfileScreen). Aquí va la lógica principal de la vista y la orquestación de componentes.
- **`navigation/`**: Configuración de rutas y navegadores de React Navigation.
- **`services/`**: Lógica de negocio externa (peticiones API, base de datos local, analíticas).
- **`assets/`**: Imágenes, fuentes, íconos personalizados.

## Reglas de Código

1. **TypeScript Obligatorio**: Todo el código debe estar tipado. Evita usar `any`. Usa `interfaces` para objetos y `types` para combinaciones o alias.
2. **Componentes Funcionales**: Usa componentes funcionales de React con Hooks (useState, useEffect, useCallback, etc.).
3. **Navegación**: Usa `@react-navigation/native` para el tipado de rutas y parámetros.
4. **Estilos**: 
   - Usa `StyleSheet.create` de React Native.
   - Evita los estilos en línea (inline styles).
5. **Iconografía**: Usa `lucide-react-native` para todos los íconos de la UI.
6. **Linter y Formatter**: El código debe cumplir con las reglas de ESLint y estar formateado con Prettier.
