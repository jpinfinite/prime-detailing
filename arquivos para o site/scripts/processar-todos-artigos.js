#!/usr/bin/env node

/**
 * Script para processar todos os artigos pendentes automaticamente
 * Executa: node scripts/processar-todos-artigos.js
 */

const fs = require('fs');
const path = require('path');

const requestsDir = path.join(__dirname, '../article-requests');
const outputLog = path.join(__dirname, '../relatorios/processamento-completo.md');

console.log('🚀 Iniciando processamento de todos os artigos pendentes...\n');

// Ler todos os arquivos de solicitação
const files = fs.readdirSync(requestsDir)
  .filter(f => f.endsWith('.md') && f !== 'topicos-pendentes.md')
  .sort();

console.log(`📋 Encontrados ${files.length} arquivos de solicitação\n`);

const log = [];
log.push('# RELATÓRIO DE PROCESSAMENTO COMPLETO');
log.push(`**Data:** ${new Date().toLocaleString('pt-BR')}`);
log.push(`**Total de artigos:** ${files.length}\n`);
log.push('---\n');

files.forEach((file, index) => {
  const num = index + 1;
  console.log(`[${num}/${files.length}] Processando: ${file}`);
  log.push(`## ${num}. ${file}`);
  log.push(`- Status: ✅ Pronto para processamento`);
  log.push(`- Arquivo: \`${file}\``);
  log.push('');
});

// Salvar log
fs.writeFileSync(outputLog, log.join('\n'));

console.log(`\n✅ Processamento concluído!`);
console.log(`📄 Relatório salvo em: ${outputLog}`);
console.log(`\n🎯 Próximo passo: Executar a KIRO para gerar cada artigo`);
