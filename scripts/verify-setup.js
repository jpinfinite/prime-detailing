#!/usr/bin/env node

/**
 * Script de verificação de setup
 * Verifica se todas as variáveis de ambiente estão configuradas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do Detailing Prime...\n');

// Variáveis obrigatórias
const requiredVars = [
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_SITE_URL',
];

// Variáveis recomendadas
const recommendedVars = [
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_CLARITY_ID',
  'NEXT_PUBLIC_GSC_VERIFICATION',
  'RESEND_API_KEY',
  'NEXT_PUBLIC_GISCUS_REPO',
  'NEXT_PUBLIC_GISCUS_REPO_ID',
];

// Variáveis opcionais
const optionalVars = [
  'MAILCHIMP_API_KEY',
  'CONVERTKIT_API_KEY',
  'PIXABAY_API_KEY',
  'HF_TOKEN',
];

// Verificar se .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('⚠️  Arquivo .env.local não encontrado!');
  console.log('📝 Crie o arquivo .env.local na raiz do projeto');
  console.log('💡 Use .env.example como referência\n');
  process.exit(1);
}

// Carregar variáveis
require('dotenv').config({ path: envPath });

let allGood = true;
let warnings = 0;

// Verificar obrigatórias
console.log('✅ VARIÁVEIS OBRIGATÓRIAS:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === 'seu-codigo-aqui' || value === 'XXXXXXX') {
    console.log(`   ❌ ${varName} - NÃO CONFIGURADA`);
    allGood = false;
  } else {
    console.log(`   ✅ ${varName} - OK`);
  }
});

console.log('\n⚠️  VARIÁVEIS RECOMENDADAS:');
recommendedVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === 'seu-codigo-aqui' || value === 'XXXXXXX') {
    console.log(`   ⚠️  ${varName} - NÃO CONFIGURADA`);
    warnings++;
  } else {
    console.log(`   ✅ ${varName} - OK`);
  }
});

console.log('\n💡 VARIÁVEIS OPCIONAIS:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === 'seu-codigo-aqui' || value === 'XXXXXXX') {
    console.log(`   ⚪ ${varName} - Não configurada (opcional)`);
  } else {
    console.log(`   ✅ ${varName} - OK`);
  }
});

// Verificar arquivos importantes
console.log('\n📁 VERIFICANDO ARQUIVOS:');

const importantFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'src/app/layout.tsx',
  'src/app/api/newsletter/route.ts',
  'src/components/Comments.tsx',
  'src/components/GoogleTagManager.tsx',
  'src/lib/analytics.ts',
];

importantFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - NÃO ENCONTRADO`);
    allGood = false;
  }
});

// Verificar conteúdo
console.log('\n📝 VERIFICANDO CONTEÚDO:');
const articlesDir = path.join(process.cwd(), 'content/articles/pt');
if (fs.existsSync(articlesDir)) {
  const articles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  console.log(`   ✅ ${articles.length} artigos encontrados`);
  
  if (articles.length < 10) {
    console.log(`   ⚠️  Recomendado: pelo menos 20 artigos`);
    warnings++;
  }
} else {
  console.log(`   ❌ Diretório de artigos não encontrado`);
  allGood = false;
}

// Resultado final
console.log('\n' + '='.repeat(50));
if (allGood && warnings === 0) {
  console.log('🎉 TUDO CONFIGURADO PERFEITAMENTE!');
  console.log('🚀 Você está pronto para fazer deploy!');
} else if (allGood) {
  console.log(`⚠️  CONFIGURAÇÃO BÁSICA OK (${warnings} avisos)`);
  console.log('💡 Configure as variáveis recomendadas para melhor experiência');
  console.log('📖 Veja SETUP-MELHORIAS.md para instruções');
} else {
  console.log('❌ CONFIGURAÇÃO INCOMPLETA');
  console.log('📖 Veja SETUP-MELHORIAS.md para instruções');
  console.log('💡 Configure as variáveis obrigatórias antes de continuar');
  process.exit(1);
}
console.log('='.repeat(50) + '\n');
