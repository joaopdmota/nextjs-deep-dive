import Link from "next/link";
import Image from "next/image";

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = `https://picsum.photos/seed/${Number(id) + 49}/1200/800`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/gallery" className="text-primary hover:underline">← Voltar para Galeria</Link>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Foto #{id}</h1>
        <p className="text-slate-400">Esta é a página individual da foto (carregada via F5 ou Link direto).</p>
      </div>
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <Image src={url} alt={`Photo ${id}`} fill className="object-cover" />
      </div>
    </div>
  );
}
