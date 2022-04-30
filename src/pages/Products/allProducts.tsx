import { Link, useNavigate } from "react-router-dom";

function AllProductsPage() {
  const navigate = useNavigate();
  const products = [
    {
      id: 6781,
      name: "LoftOS",
      userName: "Christopher Stirner",
      companyName: "Innoloft GmbH",
    },
  ];

  return (
    <main>
      <h1>All Products</h1>

      <div className="overflow-x-auto border-x border-t">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium">ID</th>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">User</th>
              <th className="text-left p-4 font-medium">Company</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="cursor-pointer border-b hover:bg-gray-50"
                >
                  <td className="p-4">{product.id}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.userName}</td>
                  <td className="p-4">{product.companyName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AllProductsPage;
