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

    // TODO: Integrar com Mailchimp, ConvertKit ou outro serviço
    // Por enquanto, apenas simula sucesso
    console.log('Newsletter signup:', email);

    // Aqui você integraria com seu serviço de email marketing
    // Exemplo Mailchimp:
    // const response = await fetch('https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed',
    //   }),
    // });

    return NextResponse.json(
      { success: true, message: 'Inscrição realizada com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    );
  }
}
