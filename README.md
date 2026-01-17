# 🚀 Next.js 15/16 Learning Hub

Este projeto é um laboratório prático para dominar as funcionalidades mais avançadas do **Next.js 16 (App Router)** com implementações reais.

---

## 📖 Guia Detalhado de Funcionalidades

Abaixo você encontra uma explicação profunda de cada conceito aplicado neste projeto, onde encontrar o código e por que ele é poderoso.

### 1. App Router & Layouts Aninhados
**Onde olhar:** `app/layout.tsx`

O Next.js usa o sistema de arquivos para roteamento. Arquivos `layout.tsx` permitem criar UI compartilhada (como Navbars e Sidebars) que **não são desmontadas** na navegação. Isso economiza processamento e mantém o estado (scroll, inputs).

#### 💡 Por que isso é incrível?
Em SPAs antigas ou páginas tradicionais, navegar muitas vezes destruía o layout inteiro para reconstruí-lo. No Next.js App Router, se você navega de `/dashboard/settings` para `/dashboard/profile`, apenas o "miolo" da página muda. O menu lateral (layout) permanece intacto. Isso significa:
- ⚡ **Zero desperdício:** Não recarrega imagens nem re-executa scripts do menu.
- 💾 **Estado Preservado:** Se você digitou algo numa busca no header, o texto continua lá enquanto troca de página.

```tsx
// app/layout.tsx
// Observe que recebemos 'children' (a página) e 'modal' (um slot paralelo)
export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <html>
      <body>
        <nav>...</nav> {/* Fica fixo enquanto você navega */}
        <main>
          {children} {/* A página muda aqui */}
          {modal}   {/* O modal aparece aqui por cima */}
        </main>
      </body>
    </html>
  );
}
```

### 2. Data Fetching & Cache (ISR - Incremental Static Regeneration)
**Onde olhar:** `app/products/page.tsx`

Em vez de escolher entre "Estático" ou "Dinâmico" para o site todo, você escolhe **por rota**. O ISR permite que uma página seja estática (super rápida), mas se atualize sozinha em background após um tempo (`revalidate`), sem precisar de um novo build.

#### 💡 "Cache que se atualiza sozinho"
Imagine um e-commerce gigante. 
- Gerar 100 mil páginas estáticas a cada mudança de preço é inviável (Build demora horas).
- Fazer tudo dinâmico (no servidor) a cada acesso é lento e caro.

**A Solução Híbrida (ISR):**
1. O usuário acessa a página (cacheada, instantânea).
2. Se o tempo (`revalidate: 60`) expirou, o Next serve a versão velha (rápida) mas dispara um "rebuild" nos bastidores.
3. O _próximo_ usuário já vê o preço novo.
**Resultado:** Seu site é rápido como um site estático, mas "vivo" como um dinâmico.

```tsx
// app/products/page.tsx
export const revalidate = 60; // Define que essa página vale por 60 segundos

async function getProducts() {
  // A flag 'tags' permite que a gente apague esse cache manualmente depois
  const res = await fetch('https://api...', {
    next: { tags: ['products'] } 
  });
  return res.json();
}
```

### 3. Server Actions & Revalidação On-Demand
**Onde olhar:** `app/products/actions.ts` e `app/products/page.tsx`

**Server Actions** são funções assíncronas que rodam no servidor, mas podem ser chamadas como funções normais no frontend (em formulários ou eventos). Aqui usamos para limpar o cache "sob demanda" (ex: quando um produto é editado), ignorando o tempo de 60s do ISR.

#### 💡 Adeus, API Boilerplate!
Antigamente, para salvar um form, você precisava:
1. Criar um arquivo `api/submit.ts`.
2. No botão, criar um `onSubmit` com `preventDefault()`.
3. Fazer um `fetch('/api/submit', { method: 'POST', body: JSON.stringify... })`.
4. Tratar estados de loading e erro.

Com **Server Actions**, você apenas diz: `<form action={savePost}>`.
- O Next cuida do envio.
- Funciona mesmo se o JS falhar ou demorar para carregar (Progressive Enhancement).
- Tipo seguro (TypeScript) ponta a ponta, pois você chama a função, não uma URL.

```ts
// app/products/actions.ts
"use server"; // Marca que isso roda SOMENTE no servidor

import { revalidateTag } from "next/cache";

export async function revalidateProducts() {
  revalidateTag("products"); // Invalida o cache IMEDIATAMENTE
}
```

```tsx
// app/products/page.tsx
<form action={revalidateProducts}>
  <button type="submit">🔄 Forçar Revalidação</button>
</form>
```

### 4. Middleware (Proteção de Rotas)
**Onde olhar:** `middleware.ts`

O Middleware roda **antes** da requisição chegar na página. É o lugar perfeito para checar autenticação. Se você tentar acessar `/dashboard` sem um cookie, ele te chuta para o login instantaneamente.

#### 💡 Segurança na "Borda" (Edge)
Muitos apps React fazem o redirecionamento no cliente (`useEffect`). Isso causa um efeito feio: a página "privada" pisca por um milissegundo antes de redirecionar para o login.
Com Middleware, isso acontece no servidor. O usuário nem chega a baixar o HTML da página protegida. É mais seguro e a experiência é sólida.

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth")?.value;

  // Se for rota protegida e não tiver token...
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

### 5. Route Handlers (API Backend)
**Onde olhar:** `app/api/posts/route.ts`

Você não precisa de um backend separado (Node/Express). O Next.js permite criar rotas de API (`GET`, `POST`) dentro da mesma aplicação.

#### 💡 Fullstack num só lugar
Para projetos simples ou MVPs, manter dois repositórios (Front React + Back Node) é complexidade extra. Com Route Handlers, seu backend vive junto com seu frontend.
- Compartilham tipos e utilitários.
- Deploy unificado (apenas um comando).
- Serverless por padrão (escala infinitamente).

```ts
// app/api/posts/route.ts
export async function GET() {
  return Response.json(posts); // Retorna JSON direto
}

export async function POST(request: Request) {
  const body = await request.json();
  // Salva no banco...
  return Response.json(newPost, { status: 201 });
}
```

### 6. Parallel & Intercepting Routes (Galeria tipo Instagram)
**Onde olhar:** `app/@modal/(.)photo/[id]/page.tsx` e `app/photo/[id]/page.tsx`

Este é o recurso mais impressionante de UX.
- **Se você clica na foto na galeria:** O Next "intercepta" a rota `/photo/1` e mostra um Modal (`@modal/(.)photo`) **sem mudar a página de fundo**.
- **Se você dá refresh ou manda o link:** O Next carrega a página normal (`photo/[id]`).

Isso permite criar UIs contextuais complexas sem quebrar a URL.

#### 💡 A mágica do Contexto
Pense no Instagram ou Twitter. Quando você clica numa foto, ela abre num modal, mas você ainda vê o feed atrás. Isso dá a sensação de que você "não saiu" dali.
Porém, se você copiar o link e mandar pro amigo, ele não quer ver o SEU feed fundo. Ele quer ver SÓ a foto.
O **Intercepting Routes** resolve isso nativamente:
- **Navegação SPA:** Modal (Feed preservado no fundo).
- **Acesso Direto:** Página dedicada (Layout completo).

```tsx
// app/@modal/(.)photo/[id]/page.tsx (O Modal)
export default function PhotoModal() {
  // Esse componente é renderizado "por cima" da galeria
  return (
    <div className="fixed inset-0 bg-black/80">
      <Image ... />
    </div>
  )
}
```

### 7. Streaming & Suspense
**Onde olhar:** `app/streaming/page.tsx`

Antigamente, se um componente demorasse (ex: consulta lenta ao banco), a página inteira travava em branco. Com **Streaming**, o Next.js manda o HTML instantaneamente e deixa um "buraco" (Skeleton) onde o conteúdo pesado vai entrar depois.

#### 💡 Performance Percebida
O maior inimigo da conversão é a tela branca.
Com Suspense/Streaming:
1. O servidor manda o HTML do Header e do Footer instantaneamente.
2. O usuário já vê a marca e os menus.
3. O servidor continua trabalhando nos dados pesados.
4. Quando pronto, o HTML que faltava é "injetado" no lugar certo.
Isso melhora drasticamente o **TTFB** (Time to First Byte) e o **FCP** (First Contentful Paint).

```tsx
// app/streaming/page.tsx
<section>
  <h2>Dashboard Rápido</h2>
  
  {/* O resto da página carrega, só esse pedaço fica "Loading..." */}
  <Suspense fallback={<SkeletonStats />}>
    <HeavyStats /> {/* Componente que demora 3000ms */}
  </Suspense>
</section>
```

### 8. Otimização de Imagens (WebP & AVIF)
**Onde olhar:** Qualquer uso do componente `<Image />`

O Next.js converte e otimiza imagens automaticamente baseado no que o navegador do usuário suporta. Você não precisa gerar versões `.webp` ou `.avif` manualmente.

#### 💡 Negociação de Conteúdo
Quando seu navegador pede uma imagem ao servidor, ele envia um cabeçalho "secreto":
`Accept: image/webp, image/avif, image/jpeg`

Isso diz ao servidor: *"Eu consigo ler WebP e AVIF! Se você tiver, me manda que é mais leve."*

O componente `<Image />` do Next.js lê esse cabeçalho e, em tempo de execução (ou build), decide:
1. Se o navegador suporta **AVIF** (compressão ultra moderna), entrega o `.avif`.
2. Se não, mas suporta **WebP**, entrega o `.webp`.
3. Se for um navegador muito antigo, entrega o original (`.jpg` ou `.png`).

**Vantagem Crítica:** Uma imagem de 5MB vira 50KB sem perder qualidade visível, e sem você escrever uma linha de código extra.

```tsx
import Image from "next/image";

// O Next.js detecta o suporte do browser e serve o formato ideal automaticamente
<Image
  src="/hero.png" // Você fornece o original
  alt="Hero"
  width={800}
  height={600}
/>
```

---

## 🚀 Mão na Massa
1. **ISR:** Vá em `/products`, note o timestamp. Dê refresh. O horário não muda (cache). Clique em "Forçar Revalidação" e dê refresh. O horário muda (novo dado).
2. **Interceptação:** Vá em `/gallery`. Clique numa foto (abre modal). Dê F5 (abre página inteira).
3. **Streaming:** Vá em `/streaming`. Veja que o título aparece na hora, mas os números demoram 3s pra chegar.

---
🎓 Projeto criado para consolidar o aprendizado em Next.js Moderno.
