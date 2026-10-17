# PC Remote | Landing Page de Alta Conversão

Landing Page oficial do **PC Remote** (controle local de Windows e Linux pelo Android), construída com foco em **CRO (Conversion Rate Optimization)**, velocidade extrema, acessibilidade (WCAG AA+) e transparência técnica.

## Stack & Arquitetura
- **React 19 + TypeScript 5 + Vite 6 + Tailwind CSS v4**
- **Paleta Estrita:** Obsidian (`#0F141C`), Ice (`#F8FAFC`) e Cyan Neon (`#00E5FF`).
- **Ícones:** `@phosphor-icons/react` + geometria vetorial oficial (`public/brand/symbol.svg` e `public/brand/icon.svg`).
- **Algoritmo Real de Pareamento SAS:** `src/lib/fingerprint.ts` reproduz exatamente a derivação de 8 blocos de cores do SHA-256 usada no `pc-remote-desktop` e no `pc-remote-android`.

## Como Executar Localmente

```powershell
cd pc-remote-landing
npm install
npm run dev
```

Para gerar o bundle estático de produção:

```powershell
npm run build
npm run preview
```
