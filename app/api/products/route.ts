export const dynamic = "force-dynamic"; // Para garantir que a API sempre gere dados novos quando chamada

export async function GET() {
  console.log("🚀 API DE PRODUTOS FOI CHAMADA!");
  
  // Simulando dados de um banco que mudam
  const products = [
    { id: 1, name: "MacBook Pro M3", price: "R$ 15.000", stock: Math.floor(Math.random() * 20) },
    { id: 2, name: "iPhone 15 Pro", price: "R$ 8.000", stock: Math.floor(Math.random() * 50) },
    { id: 3, name: "iPad Pro", price: "R$ 6.500", stock: Math.floor(Math.random() * 10) },
    { id: 4, name: "Apple Watch Ultra", price: "R$ 5.000", stock: Math.floor(Math.random() * 15) },
  ];

  return Response.json({
    products,
    updatedAt: new Date().toLocaleTimeString(),
  });
}
