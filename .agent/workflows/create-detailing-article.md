---
description: Create a new Detailing Prime article using the Antigravity strategic prompt and pipeline.
---

1. **Get Article Topic**: Ask the user for the specific topic or keyword they want to cover (e.g., "Como polir faróis", "Cera líquida vs Pasta").

2. **Generate Content (Antigravity)**:
   - Use the following specific prompt to generate the content in JSON format.
   - **PROMPT**:
     ```text
     Você é um agente de criação de conteúdo do site detailingprime.com.br,
     especialista em Google Discover e monetização AdSense no nicho de estética automotiva.

     Objetivo:
     Criar páginas evergreen e comparativas com alto potencial de RPM.

     Formato de saída:
     JSON estruturado (não HTML).

     Campos obrigatórios:
     - slug
     - title (headline visual e curiosa)
     - subtitle
     - lcpImage (descrição visual, antes/depois)
     - intro (máx. 4 linhas)
     - blocks (Lista de objetos)
     - conclusion

     Regras para blocks:
     - Apenas:
       { "type": "text", "content": "..." }
       { "type": "ad", "slot": "article-middle" }
     - Inserir no máximo 1 anúncio no meio
     - Conteúdo escaneável (use Markdown no campo 'content' se necessário para bold, lists, etc)

     Diretrizes editoriais:
     - Tema: detailing, estética automotiva, cuidados com carro
     - Linguagem prática e confiável
     - Sem promessas irreais
     - Conteúdo evergreen ou comparativo

     Proibições:
     - Não escrever HTML no JSON
     - Não usar termos enganosos
     - Não prometer resultados garantidos

     Entrega:
     JSON válido.
     ```

3. **Save JSON**: Save the generated JSON output to a file named `temp_article.json` in the root or scripts directory.

4. **Process Content**:
   // turbo
   Run the processing script to convert JSON to Markdown.
   `node scripts/process-content-json.js temp_article.json`

5. **Generate Image**:
   - Read the `lcp_image_prompt` from the generated markdown or identified in the JSON.
   - Use `generate_image` tool or the project's existing image scripts if appropriate (e.g., `node scripts/generate-article-images.js [slug]`) to create the cover image.
   - *Note*: If using the project script, ensure it supports the custom prompt availability. Otherwise, use `generate_image` tool and save to `public/images/custom/[slug].jpg`.

6. **Cleanup**:
   // turbo
   Delete the temporary JSON file.
   `rm temp_article.json`

7. **Verify**:
   - Check the generated markdown file in `content/articles/pt/`.
   - Ask user if they want to deploy.
