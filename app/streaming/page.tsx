import { Suspense } from "react";

async function HeavyStats() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="card text-center">
        <p className="text-3xl font-bold">1.2M</p>
        <p className="text-xs text-slate-400">Views</p>
      </div>
      <div className="card text-center">
        <p className="text-3xl font-bold">45k</p>
        <p className="text-xs text-slate-400">Sales</p>
      </div>
      <div className="card text-center">
        <p className="text-3xl font-bold">89%</p>
        <p className="text-xs text-slate-400">Rating</p>
      </div>
    </div>
  );
}

function SkeletonStats() {
  return (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white/5 h-24 rounded-2xl border border-white/10" />
      ))}
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Streaming & Suspense</h1>
        <p className="text-slate-400">O Next.js entrega o HTML base imediatamente e faz o "stream" dos componentes pesados conforme eles ficam prontos.</p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Dashboard Estatístico</h2>
          <Suspense fallback={<SkeletonStats />}>
            <HeavyStats />
          </Suspense>
        </section>

        <section className="glass p-8 rounded-3xl border border-white/10">
          <h3 className="text-lg font-bold mb-2">Como funciona?</h3>
          <p className="text-slate-400 leading-relaxed">
            Ao usar <code>Suspense</code>, o Next.js não espera o componente <code>HeavyStats</code> (que demora 3s) para enviar a página. 
            O usuário vê o esqueleto (skeleton) instantaneamente, melhorando a métrica de LCP e a percepção de velocidade.
          </p>
        </section>
      </div>
    </div>
  );
}
