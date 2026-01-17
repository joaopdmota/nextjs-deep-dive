"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { use } from "react";

export default function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const url = `https://picsum.photos/seed/${Number(id) + 49}/1200/800`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={() => router.back()}
    >
      <div 
        className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => router.back()}
          className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto h-[400px] md:h-[600px]">
             <Image src={url} alt={`Photo ${id}`} fill className="object-cover" />
          </div>
          <div className="p-8 space-y-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold gradient-text">Foto Interceptada #{id}</h2>
            <p className="text-slate-400">
              Isso é uma <strong>Intercepting Route</strong>! O <code>useRouter</code> do cliente permite fechar o modal voltando no histórico sem perder o scroll da galeria.
            </p>
            <button 
              onClick={() => router.back()}
              className="bg-primary text-center hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all"
            >
              Fechar Modal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
