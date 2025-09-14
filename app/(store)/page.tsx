
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/productsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import BlackFridayBanner from "@/components/BlackFridayBanner";

export const dynamic="force-static";
export const revalidate=60;

export default async function Home() {
  const products= await getAllProducts(); // fetch products from your sanity backend or any other source
  const categories= await getAllCategories();// you can fetch categories similarly if needed

  console.log(
    crypto.randomUUID().slice(0,5) + `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  )
  return (
    <div>
      <BlackFridayBanner />
      {/* Render all the products here */}
      <div className="flex flex-col items-center justify-top min-h-screen bg=gray-100 p-4">
        <ProductsView products={ products} categories={categories}/>
      </div>
    </div>
  );
}
 