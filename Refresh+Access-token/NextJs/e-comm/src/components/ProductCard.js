import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/layout/product/${product.id}`}>
        <div className="relative flex h-52 sm:h-60 md:h-64 items-center justify-center bg-muted p-4">
          <img
            src={product.image}
            alt={product.title}
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-contain p-4"
          />
        </div>
      </Link>

      <CardContent className="space-y-3 p-4">
        <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {product.category}
        </span>

        <h2 className="line-clamp-2 text-base sm:text-lg font-semibold">
          {product.title}
        </h2>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <span>⭐</span>
            <span>{product.rating.rate}</span>
            <span className="text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          <span className="text-lg sm:text-xl font-bold">
            ${product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;