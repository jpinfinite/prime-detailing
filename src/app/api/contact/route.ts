import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validação
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // TODO: Integrar com serviço de email
    // Opções:
    // - Resend: https://resend.com/
    // - SendGrid: https://sendgrid.com/
    // - Nodemailer: https://nodemailer.com/
    // - EmailJS: https://www.emailjs.com/

    console.log('Nova mensagem de contato:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem enviada com sucesso! Responderemos em breve.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API de contato:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
