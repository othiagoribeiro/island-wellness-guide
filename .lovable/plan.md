# Ajustes da Home — Alinhamento com o Doc do Cliente

Escopo confirmado pelo usuário. Implementaremos 5 frentes; a seção "Não implementado" fica para depois; itens extras (HowItWorks, RecentBlog, FAQ, Blog no header) permanecem.

---

## 1. Hero — Refatorar dropdowns de busca

**Arquivo**: `src/components/home/Hero.tsx`

Substituir os dois `<select>`/`<input>` atuais por **popovers customizados** (mesma aparência da pill branca).

### Dropdown 1 — Terapia / síntoma / nombre
- Campo de texto com filtro em tempo real.
- Conteúdo padrão (sem filtro):
  - Cabeçalho: **"Terapias más buscadas"** (uppercase, muted).
  - Lista fixa: Masaje relajante, Osteopatía, Reiki, Acupuntura, Quiromasaje, Yoga, Meditación, Fisioterapia, Coaching, Terapia emocional.
  - Link no rodapé: **"Ver todas las terapias →"** (navega para `/therapies`).
- Ao digitar: mostra resultados filtrados sobre `getTherapies()`.

### Dropdown 2 — Ubicación
- Campo de texto.
- Opções fixas no topo (sempre visíveis):
  - 📍 **Cerca de mí** — usa `navigator.geolocation` (placeholder; envia flag `nearMe`).
  - 🏝️ **Toda Mallorca** — limpa filtro de cidade.
- Lista alfabética dos **municípios de Mallorca** (extraídos da página 9 do doc) — adicionar como constante em `src/data/municipios.ts`.
- Filtro em tempo real ao digitar.

### Detalhes técnicos
- Usar `Popover` do shadcn (já instalado) ou implementar com `useRef` + click-outside.
- Manter altura 56px da pill, radius 10px nos popovers.
- Sub-componentes (PopoverTherapy, PopoverLocation) **fora** do componente principal para evitar focus loss.
- Mobile: stack vertical mantém comportamento, mas com os mesmos popovers.

---

## 2. Conectar EmotionalSearch → OrientResults

**Arquivos**: `src/components/home/EmotionalSearch.tsx`, `src/pages/Index.tsx`, `src/components/home/OrientResults.tsx`.

- Adicionar prop `onSearch(query: string)` em `EmotionalSearch`.
- Tanto o botão **"Ver opciones"** quanto os **chips** chamam `onSearch(textoDoChip || query)` em vez de navegar para `/professionals`.
- `Index.tsx` passa um handler que faz busca em `getProfessionals({ q })` e popula `orientResult` (mesmo state já usado pelo Hero).
- Após setar resultado, fazer `scrollIntoView` suave para o bloco de resultados.
- **Cabeçalho do bloco**: substituir título atual em `OrientResults` por:
  > "Gracias por compartirlo."
  > "Aquí tienes personas y propuestas que pueden acompañarte."
  (Mostrar essa variante quando a busca vier do EmotionalSearch; manter título neutro para busca clássica do Hero — via prop `variant`.)
- **Tags coloridas por card**: garantir que cada `ProfessionalCard` em `OrientResults` exiba as tags de `conditions`/`specialties` em chips suaves abaixo do nome+rol (verificar componente atual; se faltar, adicionar).

---

## 3. Testimonios — mais espaço e variação orgânica

**Arquivo**: `src/components/home/Testimonials.tsx`

Manter os textos atuais (não substituir conteúdo). Apenas:
- Aumentar `gap` entre cards: de `gap-5` para `gap-8` md `gap-10`.
- Adicionar **leve variação de largura** entre cards: alternar entre 340/380/360px (índice par/ímpar/triplo) para sensação orgânica.
- Padding interno levemente maior (`p-8` em vez de `p-7`).
- Confirmar que velocidade do auto-scroll continua suave (0.4 px/frame).

---

## 4. Footer — disclaimer

**Arquivo**: `src/components/layout/Footer.tsx` (verificar primeiro se já existe).

Adicionar (em todas as 4 traduções) na barra inferior, próximo ao copyright, em texto pequeno e muted:
> "Orientación informativa. No sustituye diagnóstico médico."

Adicionar chave `footer.medicalDisclaimer` em `src/i18n/translations.ts` para es/ca/en/de.

---

## 5. Itens NÃO incluídos nesta rodada

- Bloco "Profesionales destacados" inline com 3 cards fixos (Sarah/Lucía/Pau) — fica para depois.
- Reorganizar/remover HowItWorks, RecentBlog, FAQ — manter como estão.
- Blog no header — manter.
- Substituir textos dos testimonios pelos 4 do doc — manter os atuais.

---

## Resumo de arquivos afetados

- ✏️ `src/components/home/Hero.tsx` (refatoração dos dropdowns)
- 🆕 `src/data/municipios.ts` (lista alfabética de municípios)
- ✏️ `src/components/home/EmotionalSearch.tsx` (prop onSearch)
- ✏️ `src/pages/Index.tsx` (handler emocional + scroll)
- ✏️ `src/components/home/OrientResults.tsx` (variant + cabeçalho + tags)
- ✏️ `src/components/home/Testimonials.tsx` (espaçamento e variação)
- ✏️ `src/components/layout/Footer.tsx` (disclaimer)
- ✏️ `src/i18n/translations.ts` (nova chave footer.medicalDisclaimer)
