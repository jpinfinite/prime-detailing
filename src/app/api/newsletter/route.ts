import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Aqui você pode integrar com:
    // 1. Resend (recomendado)
    // 2. Mailchimp
    // 3. ConvertKit
    // 4. Seu próprio banco de dados

    // Exemplo com armazenamento local (temporário)
    // Em produção, use um serviço de email marketing

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const NEWSLETTER_LIST = process.env.NEWSLETTER_LIST_EMAIL || 'detailingprime@proton.me';

    if (RESEND_API_KEY) {
      // Integração com Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Detailing Prime <newsletter@detailingprime.com.br>',
          to: [email],
          subject: '🚀 Bem-vindo ao Detailing Prime!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0A0A0A; padding: 40px; text-align: center;">
                <h1 style="color: #FFC107; margin: 0;">Detailing Prime</h1>
              </div>
              
              <div style="padding: 40px; background: #1F1F1F; color: #F5F5F5;">
                <h2 style="color: #FFC107;">Bem-vindo à Comunidade! 🎉</h2>
                
                <p>Olá!</p>
                
                <p>Obrigado por se inscrever na newsletter do Detailing Prime. Você acaba de entrar para a maior comunidade brasileira de estética automotiva!</p>
                
                <h3 style="color: #FFC107;">O que você vai receber:</h3>
                <ul style="line-height: 1.8;">
                  <li>✅ Guias exclusivos semanais</li>
                  <li>✅ Reviews antes de todos</li>
                  <li>✅ Técnicas profissionais</li>
                  <li>✅ Ofertas especiais de produtos</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://detailingprime.com.br/artigos" 
                     style="background: #FFC107; color: #0A0A0A; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Explorar Artigos
                  </a>
                </div>
                
                <p style="color: #B0B0B0; font-size: 14px; margin-top: 40px;">
                  Você está recebendo este email porque se inscreveu em detailingprime.com.br
                </p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API Error:', errorData);
        throw new Error('Erro ao enviar email via Resend');
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Inscrição realizada com sucesso!'
        },
        { status: 200 }
      );

    } else {
      console.warn('RESEND_API_KEY não configurada');
      // Em produção, isso deve falhar se não tivermos como salvar o email
      return NextResponse.json(
        { error: 'Serviço de newsletter temporariamente indisponível (Configuração pendente)' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    );
  }
}
