export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-8 py-20 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Acesso Restrito</h1>
        <p className="text-slate-400">Você foi redirecionado pelo <strong>Middleware</strong> porque não possui um cookie de sessão.</p>
      </div>

      <div className="card text-left p-8">
        <p className="text-sm font-mono bg-black/30 p-4 rounded-lg mb-6">
          // Rógica do Middleware:<br/>
          if (!cookie.auth) redirect('/login')
        </p>

        <button className="w-full bg-primary py-3 rounded-xl font-bold">
          Simular Login
        </button>
      </div>
    </div>
  );
}
