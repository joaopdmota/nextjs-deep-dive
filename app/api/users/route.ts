export async function GET() {
  const users = [
    { id: 1, name: "João", role: "Developer" },
    { id: 2, name: "Maria", role: "Designer" },
    { id: 3, name: "Pedro", role: "Product Manager" },
  ];

  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return Response.json({
    message: "Usuário criado com sucesso! (Simulado)",
    received: body
  }, { status: 201 });
}
