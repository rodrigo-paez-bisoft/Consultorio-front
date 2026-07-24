# 🧠 Consejos para usar la IA como asistente de desarrollo

Guía práctica para aprovechar la IA (ChatGPT, Claude, Cursor, etc.) sin perder el criterio técnico.

---

## 1. Trata a la IA como un "Junior Dev" muy rápido, no como un oráculo
- **Revisa todo el código** que te dé. La IA alucina, inventa funciones que no existen y usa librerías obsoletas.
- **No copies y pegues sin entender**. Si no entiendes una línea, pídele que te la explique antes de usarla.
- **Pide tests**. Siempre que te dé una función, pídele: *"Ahora escríbeme los tests unitarios para este código"*.

---

## 2. Sé hiperespecífico en tus prompts (Contexto es Rey)
**Mal prompt:** *"Hazme una API en Python"*  
**Buen prompt:** *"Hazme un endpoint en FastAPI que reciba un JSON con 'usuario' y 'contraseña', valide que la contraseña tenga 8 caracteres, y devuelva un token JWT. Usa Python 3.10+ y Pydantic V2"*

**Incluye siempre:**
- Lenguaje y versión (Python 3.11, Node 20, etc.).
- Framework y versión (React 18, Next 14, Django 4).
- Estilo de código (PEP8, ESLint, TypeScript estricto).
- Ejemplo de entrada y salida esperada.

---

## 3. Usa la técnica de "Role Prompting"
Dale un rol concreto:
- *"Actúa como un arquitecto de software senior. Quiero que critiques mi diseño de microservicios y me propongas mejoras de escalabilidad."*
- *"Eres un experto en seguridad. Revisa este código por inyecciones SQL y XSS."*
- *"Eres un tester malvado. Encuentra todos los edge cases que rompan esta función."*

---

## 4. Divide y vencerás (No pidas todo de golpe)
Si pides "crea una app completa", la IA se perderá. En su lugar:
1. *"Dame la estructura de carpetas para un proyecto de Next.js con autenticación."*
2. *"Ahora escribe el contexto de autenticación con useContext y useReducer."*
3. *"Ahora crea el componente de Login usando ese contexto."*
4. *"Ahora conecta ese Login con esta API mock que te doy."*

---

## 5. Usa la IA como tu "Documentación Viva"
- **Pregunta**: *"¿Cómo se usa correctamente el hook useCallback de React con dependencias?"*  
- **Pregunta**: *"Explícame este error de TypeScript: 'Property does not exist on union type'"* y pídele 3 formas de solucionarlo.
- **Pide refactors**: *"Refactoriza esta función de 50 líneas para que sea más legible y uses early returns."*

---

## 6. Haz que la IA te enseñe, no solo que te dé código
- *"No me des el código directamente. Dame la estrategia paso a paso para implementar un sistema de colas con Redis y después pregúntame si quiero el código."*
- *"Enséñame el patrón Repository en TypeScript con ejemplos prácticos."*

---

## 7. Pide que justifique sus decisiones
- *"Dame 3 formas de resolver este problema y dime los pros y contras de cada una antes de elegir la mejor."*
- *"¿Por qué recomiendas async/await en vez de callbacks aquí?"*

---

## 8. Feedback iterativo (El verdadero poder)
No te conformes con la primera respuesta:
- *"Eso funciona, pero es muy lento para 10,000 registros. Optimízalo con un índice o un Set."*
- *"Me gusta tu solución, pero no cumple con el estándar de nombres de nuestra empresa (camelCase para variables, PascalCase para clases)."*
- *"Ese código no es accesible (accesibilidad). Añade roles ARIA y manejo de teclado."*

---

## 9. Pídele que genere documentación y logs
- *"Añade docstrings en formato Google Style a todas las funciones."*
- *"Añade logs estructurados (con JSON) para trazar toda la petición."*
- *"Genera un README.md con instrucciones de instalación, variables de entorno y ejemplos de uso."*

---

## 10. Cuidado con la seguridad y los datos sensibles
- **NUNCA** pegues claves API, tokens, contraseñas o datos de clientes reales en el chat.
- Sustituye datos sensibles por datos de ejemplo (*"usuario: test, pass: test123"*).
- Si usas GitHub Copilot o Cursor, revisa que no estén subiendo tu código privado a la nube (en empresas, usa versiones on-premise).

---

## 11. Usa herramientas especializadas, no solo chats
- **Cursor / Windsurf**: IDE con IA que ve todo tu proyecto y puede editar múltiples archivos.
- **GitHub Copilot**: Autocompletado predictivo, ideal para boilerplate.
- **Aider / Continue.dev**: Asistentes en terminal que leen tu código local.
- **Phind / Perplexity**: Buscadores IA que contrastan con documentación actual (evitan alucinaciones).

---

## 12. Pídele que genere código "mantenible" desde el principio
- *"Escribe este código con principios SOLID y baja cohesión/acoplamiento."*
- *"Asegúrate de que todas las funciones sean puras (sin efectos secundarios) excepto donde sea necesario."*
- *"Incluye manejo de errores con try/catch y errores personalizados."*

---

## 13. Úsala para migraciones y refactors pesados
- *"Tengo este código en JavaScript antiguo (CommonJS). Conviértelo a ES Modules y TypeScript."*
- *"Migra este componente de class component a functional component con hooks."*
- *"Cambia esta consulta SQL a un Query Builder de Knex."*

---

## 14. Pide resúmenes de código legacy
- *"Tengo este archivo de 800 líneas sin comentarios. Dame un resumen de alto nivel de lo que hace, sus dependencias principales y posibles puntos de fallo."*

---

## 15. Establece un "Prompt Template" personal
Crea tu propio formato para ahorrar tiempo:
