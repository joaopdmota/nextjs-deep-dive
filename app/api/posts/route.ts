export const dynamic = "force-dynamic";

// Memória temporária para posts (como você fez em api/users)
const posts = [
  { id: 1, title: "🚀 Next.js 15 é insano!" },
  { id: 2, title: "Server Actions facilitam muito a vida." },
];

export async function GET() {
  console.log("📡 API DE POSTS: Buscando posts...");
  return Response.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  if (!body.title || body.title.length < 3) {
    return Response.json({ error: "Título inválido" }, { status: 400 });
  }

  const newPost = { id: Date.now(), title: body.title };
  posts.push(newPost);
  
  console.log("📝 API DE POSTS: Novo post salvo!");
  return Response.json(newPost, { status: 201 });
}
