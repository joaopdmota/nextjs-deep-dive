export const revalidate = 60; 

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 60, tags: ['products'] } 
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return res.json();
}

import { revalidateProducts } from "./actions";

export default async function Products() {
  const { products, updatedAt } = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Produtos (Data Fetching)</h1>
          <p className="text-slate-400">Páginas estáticas que se comportam como dinâmicas.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <form action={revalidateProducts}>
            <button 
              type="submit"
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              🔄 Forçar Revalidação (Tag)
            </button>
          </form>
          <div className="text-right">
            <span className="text-xs font-mono bg-primary/20 text-primary px-3 py-1 rounded-full">
              ISR ATIVO (60s)
            </span>
            <p className="text-[10px] text-slate-500 mt-2 text-right">
              Última carga da API: {updatedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p: any) => (
          <div key={p.id} className="card flex justify-between items-center group">
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-slate-400 text-sm">Estoque atual: <span className="text-white font-medium">{p.stock}</span></p>
            </div>
            <div className="text-xl font-bold text-primary">{p.price}</div>
          </div>
        ))}
      </div>

      <section className="glass p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-lg">🤔 Como funciona o Revalidate?</h3>
        <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
          <p>
            1. <strong>Primeiro acesso:</strong> O Next.js serve a página gerada no build.
          </p>
          <p>
            2. <strong>Janela de 60s:</strong> Qualquer pessoa que acessar verá a mesma versão (cacheada).
          </p>
          <p>
            3. <strong>Após 60s:</strong> Se alguém acessar, o Next.js ainda serve a versão antiga (rápido!), 
            mas dispara um "fetch" em background para atualizar o cache.
          </p>
          <p>
            4. <strong>Próximo acesso:</strong> O próximo usuário já verá os dados novos (Stale-While-Revalidate).
          </p>
        </div>
      </section>
    </div>
  );
}
