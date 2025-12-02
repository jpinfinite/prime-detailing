#!/usr/bin/env node

/**
 * Script interativo para configurar Giscus
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Configuração do Giscus - Detailing Prime\n');
console.log('Este script vai te ajudar a configurar os comentários.\n');

const questions = [
  {
    key: 'NEXT_PUBLIC_GISCUS_REPO',
    question: 'Repository (ex: jpinfinite/prime-detailing): ',
    default: 'jpinfinite/prime-detailing'
  },
  {
    key: 'NEXT_PUBLIC_GISCUS_REPO_ID',
    question: 'Repository ID (ex: R_xxxxx): ',
    default: ''
  },
  {
    key: 'NEXT_PUBLIC_GISCUS_CATEGORY',
    question: 'Category (ex: Announcements): ',
    default: 'Announcements'
  },
  {
    key: 'NEXT_PUBLIC_GISCUS_CATEGORY_ID',
    question: 'Category ID (ex: DIC_xxxxx): ',
    default: ''
  }
];

const answers = {};
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    saveConfig();
    return;
  }

  const q = questions[currentQuestion];
  const prompt = q.default ? `${q.question}[${q.default}] ` : q.question;

  rl.question(prompt, (answer) => {
    answers[q.key] = answer.trim() || q.default;
    currentQuestion++;
    askQuestion();
  });
}

function saveConfig() {
  console.log('\n📝 Salvando configuração...\n');

  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';

  // Ler .env.local existente
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  // Atualizar ou adicionar variáveis Giscus
  Object.keys(answers).forEach(key => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    const newLine = `${key}=${answers[key]}`;

    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, newLine);
    } else {
      // Adicionar no final da seção Giscus
      if (envContent.includes('# Giscus Comments')) {
        envContent = envContent.replace(
          /(# Giscus Comments[^\n]*\n)/,
          `$1${newLine}\n`
        );
      } else {
        envContent += `\n# Giscus Comments\n${newLine}\n`;
      }
    }
  });

  fs.writeFileSync(envPath, envContent);

  console.log('✅ Configuração salva em .env.local\n');
  console.log('📋 Valores configurados:');
  Object.keys(answers).forEach(key => {
    console.log(`   ${key}=${answers[key]}`);
  });

  console.log('\n🎉 Giscus configurado com sucesso!\n');
  console.log('Próximos passos:');
  console.log('1. Reinicie o servidor: npm run dev');
  console.log('2. Acesse um artigo');
  console.log('3. Role até o final');
  console.log('4. Veja os comentários funcionando!\n');

  rl.close();
}

console.log('📖 Antes de começar, você precisa:');
console.log('1. Habilitar Discussions no GitHub');
console.log('2. Instalar Giscus App no repositório');
console.log('3. Acessar https://giscus.app/pt e copiar os IDs\n');
console.log('Veja CONFIGURAR-GISCUS.md para instruções detalhadas.\n');

rl.question('Pronto para configurar? (s/n): ', (answer) => {
  if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
    console.log('\n');
    askQuestion();
  } else {
    console.log('\nOk! Execute este script quando estiver pronto.');
    rl.close();
  }
});
