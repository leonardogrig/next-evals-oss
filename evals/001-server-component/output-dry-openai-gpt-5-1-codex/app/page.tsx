type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

export default async function Page() {
  const response = await fetch('https://api.vercel.app/products', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  const products: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : [];

  const firstProductName = products[0]?.name ?? 'No products available';

  return <h1>{firstProductName}</h1>;
}

