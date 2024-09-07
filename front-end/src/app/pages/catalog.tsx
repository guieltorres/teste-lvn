import LoadingIndicator from "../components/elements/loadingIndicator";
import ProductCard from "../components/elements/productCard";
import useProducts from "../hooks/useProducts";

export default function Catalog() {
  const { products, loading, error } = useProducts();

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {error === true ? (
            <h1>Ops, one error occurred. Please try again later.</h1>
          ) : (
            <>
              <div className="mb-4 max-w-3xl">
                <h2 className="text-4xl font-bold mb-4">Get Inspired</h2>
                <p>
                  Browsing for your next favorite piece? Look no further, our
                  collection of products is curated to inspire you. From the
                  latest trends to timeless classics, we have something for
                  everyone.
                </p>
              </div>
              <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
