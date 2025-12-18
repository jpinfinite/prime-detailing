const fs = require('fs');
const path = require('path');

// Read existing image generation script to reuse logic if possible, 
// or just standard placeholder logic.

// Function to process the JSON
async function processContent(jsonPath) {
    try {
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(rawData);

        const { slug, title, subtitle, lcpImage, intro, blocks, conclusion } = data;

        // Construct Frontmatter
        const date = new Date().toISOString().split('T')[0];
        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${subtitle.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${date}"
category: "Guias"
tags: ["detailing", "estética automotiva"]
featured: false
image: "/images/custom/${slug}.jpg"
lcp_image_prompt: "${lcpImage.replace(/"/g, '\\"')}"
---`;

        // Construct Content
        let content = `${frontmatter}\n\n${intro}\n\n`;

        if (blocks && Array.isArray(blocks)) {
            blocks.forEach(block => {
                if (block.type === 'text') {
                    content += `${block.content}\n\n`;
                } else if (block.type === 'ad') {
                    // Start with a generic placeholder or HTML that might be replaced or hydrated
                    content += `<div className="ad-container" data-slot="${block.slot}"></div>\n\n`;
                }
            });
        }

        if (conclusion) {
            content += `## Conclusão\n\n${conclusion}\n`;
        }

        // Determine output path (default to pt for now)
        const outputDir = path.join(__dirname, '..', 'content', 'articles', 'pt');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${slug}.md`);
        fs.writeFileSync(outputPath, content);

        console.log(`✅ Article processed and saved to: ${outputPath}`);
        console.log(`🖼️ LCP Image Prompt saved in frontmatter. Run image generation script next regarding this slug.`);

    } catch (error) {
        console.error("Error processing JSON:", error);
        process.exit(1);
    }
}

const jsonFile = process.argv[2];
if (!jsonFile) {
    console.error("Please provide a JSON file path.");
    process.exit(1);
}

processContent(jsonFile);
