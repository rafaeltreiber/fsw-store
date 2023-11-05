import { Product } from "@prisma/client";
import Image from 'next/image'

interface ProductItemProp {
  product: Product
}

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <div className="flex flex-col gap-4 max-w-[156px]">
      <div className="bg-accent rounded-lg h-[170px] w-[156px] items-center flex justify-center ">
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
      </div>
      <div>
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
      </div>
    </div>
  );
}

export default ProductItem;