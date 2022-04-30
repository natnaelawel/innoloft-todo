import { Link, Outlet } from "react-router-dom";
import BaseLayout from "../../components/common/BaseLayout";

function ProductsIndexPage() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export default ProductsIndexPage;
