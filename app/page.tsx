import Link from "next/link";

export default function Home() {
  const features = [
    { title: "App Router", desc: "Estrutura de diretórios intuitiva e poderosa.", link: "/dashboard" },
    { title: "Data Fetching", desc: "SSR, SSG e ISR facilitados com o fetch estendido.", link: "/products" },
    { title: "Server Actions", desc: "Mutação de dados diretamente nos componentes.", link: "/posts" },
    { title: "Streaming", desc: "Carregamento progressivo de partes da interface.", link: "/streaming" },
    { title: "Parallel & Intercepting", desc: "Modais e Dashboards avançados sem perder contexto.", link: "/gallery" },
    { title: "Route Handlers", desc: "Criação de APIs REST personalizadas.", link: "/api/users" },
    { title: "Middleware", desc: "Logica de borda (Edge) para auth e redirecionamentos.", link: "/dashboard" },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl gradient-text">
          Masterize o Next.js 15
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore as funcionalidades core deste framework para criar apps modernos, rápidos e escaláveis.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.title} href={f.link} className="card group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            <div className="mt-4 text-primary text-xs font-semibold uppercase tracking-wider">Ver Exemplo &rarr;</div>
          </Link>
        ))}
      </div>

      <section className="glass rounded-3xl p-8 border border-white/10 mt-12">
        <h2 className="text-2xl font-bold mb-4">Por que Next.js?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400">
          <li>🚀 Performance impecável com pré-renderização</li>
          <li>🎯 SEO nativo e otimizado</li>
          <li>💎 Experiência de desenvolvimento excepcional</li>
          <li>📦 Otimização automática de imagens e fontes</li>
        </ul>
      </section>
    </div>
  );
}
