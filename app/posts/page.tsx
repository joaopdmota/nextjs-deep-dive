import { getPosts, createPost } from "./actions";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Comunidade (Server Actions)</h1>
        <p className="text-slate-400">Adicione posts sem criar APIs manuais ou gerenciar estados complexos de loading no cliente.</p>
      </div>

      <form action={createPost} className="glass p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">O que você está pensando?</label>
          <input 
            type="text" 
            name="title" 
            id="title"
            required
            placeholder="Digite algo interessante..."
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
        >
          Postar Agora
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Posts Recentes</h2>
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="card py-4">
              <p className="font-medium text-lg">{post.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
