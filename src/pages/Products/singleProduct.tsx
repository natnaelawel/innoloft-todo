import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getTRL, updateProduct } from "../../api/products";
import { Product, TRL } from "../../helpers/types";
import ProductDetailComponent from "../../components/Products/SingleProductComponent";
import Loading from "../../components/common/Loading";

type Props = {};

const SingleProductPage = (props: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [trls, setTrls] = useState<Array<TRL>>([]);

  const { id } = useParams();

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await getProduct(id || "0");
      setProduct(data);
    } catch (error) {
      console.log("error is ", error);
    }
  }, []);

  const fetchTRL = useCallback(async () => {
    try {
      const { data } = await getTRL();
      setTrls(data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchTRL();
    fetchProduct();
  }, [fetchProduct, fetchTRL]);

  const handleUpdateProduct = (prod: Product | null) => {
    if (prod) {
      const fetchUpdateProduct = async () => {
        try {
          await updateProduct(prod?.id, prod);
          setProduct(prod);
        } catch (error) {
          console.log("error is ", error);
        }
      };
      fetchUpdateProduct();
    }
  };

  return (
    <main>
      <div className="container mx-auto px-4">
        {product ? (
          <ProductDetailComponent
            handleUpdateProduct={handleUpdateProduct}
            product={product}
            trls={trls}
          />
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default SingleProductPage;
