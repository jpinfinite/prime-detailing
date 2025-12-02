import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // TODO: Integrar com serviço de email (Mailchimp, ConvertKit, etc.)
    // Por enquanto, apenas simula sucesso e salva em arquivo
    
    console.log('Nova inscrição:', email);

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Aqui você integraria com:
    // - Mailchimp: https://mailchimp.com/developer/
    // - ConvertKit: https://developers.convertkit.com/
    // - SendGrid: https://sendgrid.com/
    // - Resend: https://resend.com/

    return NextResponse.json(
      { 
        success: true,
        message: 'Inscrição realizada com sucesso!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API de newsletter:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
