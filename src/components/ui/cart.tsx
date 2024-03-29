import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext)

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products)

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    )

    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })

  }

  return (
    <div className="flex flex-col gap-8 h-full">
      <Badge className="w-fit gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2" variant="outline">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5 h-full overflow-hidden max-h-full">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">Carrinho vazio. Vamos fazer compras?</p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p>Entrega</p>
          <p>Grátis</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p>Descontos</p>
          <p>- R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>

        <Button className="uppercase font-bold mt-7" onClick={handleFinishPurchaseClick}>Finalizar compra</Button>

      </div>
    </div>
  );
}

export default Cart;