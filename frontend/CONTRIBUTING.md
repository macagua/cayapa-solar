# Contributing to Madrid Solar Admin Panel

¡Gracias por tu interés en contribuir! Este documento proporciona pautas para contribuir al proyecto.

## 🚀 Cómo contribuir

### 1. Fork del proyecto

Haz un fork del repositorio y clónalo localmente:

```bash
git clone https://github.com/TU-USUARIO/cayapa-solar.git
cd cayapa-solar/frontend
```

### 2. Crear una rama

Crea una rama para tu feature o bugfix:

```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Hacer cambios

- Sigue las convenciones de código establecidas
- Escribe código limpio y legible
- Añade comentarios cuando sea necesario
- Actualiza la documentación si es relevante

### 4. Ejecutar tests y validaciones

```bash
npm run lint           # Verifica el código
npm run type-check     # Verifica tipos TypeScript
npm run format         # Formatea el código
```

### 5. Commit de cambios

Usa mensajes de commit descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: añadir nueva funcionalidad X"
git commit -m "fix: corregir bug en componente Y"
git commit -m "docs: actualizar README"
git commit -m "style: formatear código"
git commit -m "refactor: mejorar estructura de Z"
git commit -m "perf: optimizar rendimiento de W"
```

### 6. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego abre un Pull Request en GitHub con:
- Descripción clara de los cambios
- Referencias a issues relacionados
- Screenshots si aplica

## 📋 Convenciones de código

### TypeScript

- Usa TypeScript strict mode
- Define tipos explícitos para funciones y componentes
- Evita el uso de `any` sin justificación
- Usa interfaces para objetos complejos

### React

- Usa functional components con hooks
- Nombra componentes con PascalCase
- Usa arrow functions para componentes
- Mantén componentes pequeños y enfocados

### Estilos

- Usa clases de AdminLTE cuando sea posible
- Sigue la convención BEM para clases custom
- Evita inline styles
- Usa variables CSS para colores y espaciados

### Archivos

- Un componente por archivo
- Nombra archivos igual que el componente
- Agrupa archivos relacionados en carpetas
- Usa index.ts para exportar múltiples módulos

## 🐛 Reportar bugs

Abre un issue con:
- Descripción clara del bug
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si aplica
- Información del entorno (navegador, OS)

## 💡 Sugerir features

Abre un issue de tipo "Feature Request" con:
- Descripción clara de la funcionalidad
- Casos de uso
- Beneficios esperados
- Posibles alternativas consideradas

## ✅ Checklist antes de PR

- [ ] El código compila sin errores
- [ ] ESLint pasa sin warnings
- [ ] TypeScript no tiene errores de tipos
- [ ] El código está formateado con Prettier
- [ ] La documentación está actualizada
- [ ] Los commits siguen Conventional Commits
- [ ] El PR tiene una descripción clara

## 📝 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto (MIT).

## 🙏 Agradecimientos

¡Gracias por contribuir a Madrid Solar!
