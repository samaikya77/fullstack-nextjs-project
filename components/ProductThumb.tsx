import { Product} from "@/sanity.types";
import Link from "next/link";
import Image from "next/image"
import { imageUrl  } from "@/lib/imageUrl";

function ProductThumb({product}: {product: Product}) {
    const isOutOfStock=(product.stock ?? 0)<= 0;
  return(
    
    <Link href={`/product/${product.slug?.current}`} 
    className={`group flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden rounded-lg ${isOutOfStock? "opacity-50": ""}`}>
      
      <div className="relative aspect-square w-full h-full overflow-hidden">
      {product.image && (
       <Image
       className="object-contain transition-transform duration-300 group-hover:scale-105"
       src={imageUrl(product.image).url()}
       alt={product.name || "Product Image"}
       fill
       sizes="(max-width: 640px) 100vw, (max-width:768px) 50vw 33vw"
       />
      )}
      {isOutOfStock && (
        
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Out Of Stock</span>
        </div>

      )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {product.description
          ?.map((block)=>
          block._type === "block"
          ?block.children?.map((child)=> child.text).join(" ")
        :""
        )
        .join(" ")|| "No description available."}
        </p>
      </div>
    </Link>
  
  )
}
export default ProductThumb;