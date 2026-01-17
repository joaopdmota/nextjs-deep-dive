export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-slate-400">Parabéns! Se você está vendo isto, o Middleware deixou você passar.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="card h-40 flex items-center justify-center border-dashed">
            Conteúdo Protegido {i}
          </div>
        ))}
      </div>
    </div>
  );
}
