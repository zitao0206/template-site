import ProductCard from "./ProductCard";

type ProductItem = {
  id: number;
  title: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  status?: string;
};

export default function ProductList({ products }: { products: ProductItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          stock={item.stock}
          imageUrl={item.imageUrl}
          status={item.status}
        />
      ))}
    </div>
  );
}
