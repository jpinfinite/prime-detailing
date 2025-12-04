// Script de teste da newsletter
// Script de teste da newsletter
// const fetch = require('node-fetch'); // Node 18+ tem fetch nativo

async function testNewsletter() {
  console.log('🧪 Testando Newsletter API...\n');

  const testEmail = 'detailingprime@proton.me';

  try {
    console.log(`📧 Enviando email de teste para: ${testEmail}`);

    const response = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Sucesso!');
      console.log('📬 Resposta:', data);
      console.log('\n🎉 Newsletter funcionando perfeitamente!');
      console.log('📧 Verifique o email: detailingprime@proton.me');
    } else {
      console.log('❌ Erro:', data);
    }
  } catch (error) {
    console.error('❌ Erro ao testar:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando:');
    console.log('   npm run dev');
  }
}

testNewsletter();
