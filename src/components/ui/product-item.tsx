import { productWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from 'next/image'
import { Badge } from "./badge";
import Link from "next/link";

interface ProductItemProp {
  product: productWithTotalPrice
}

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4 max-w-[170px]">
        <div className="relative bg-accent rounded-lg h-[170px] w-full items-center flex justify-center ">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-auto max-w-[80%] max-h-[70%]"
            style={{
              objectFit: 'contain'
            }}
            alt={product.name}
          />

          {product.discountPercentage > 0 && (
            <Badge className="absolute left-3 top-3 px-2 py-[2px]">
              <ArrowDownIcon size={12} /> {product.discountPercentage}%
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
        </div>

        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis">R$ {product.totalPrice.toFixed(2)}</p>
              <p className="opacity-75 line-through text-xs">R$ {Number(product.basePrice).toFixed(2)}</p>
            </>
          ) : (
            <p className="font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis">R$ {product.basePrice.toFixed(2)}</p>
          )
          }
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;