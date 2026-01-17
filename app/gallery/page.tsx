import Link from "next/link";
import Image from "next/image";

export default function GalleryPage() {
  const photos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/${i + 50}/600/400`,
  }));

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
        <p className="text-slate-400">
          Esta página demonstra <strong>Parallel & Intercepting Routes</strong>. 
          Ao clicar numa foto, ela abrirá num modal (interceptando a rota). 
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link 
            key={photo.id} 
            href={`/photo/${photo.id}`}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
          >
            <Image
              src={photo.url}
              alt={`Photo ${photo.id}`}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
