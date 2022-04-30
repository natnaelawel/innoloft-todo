import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAppConfiguration } from "./api/products";
import { useAppDispatch } from "./hooks/redux_hooks";
import NotFoundPage from "./pages/404";
import HomePage from "./pages/Homepage";
import ProductsIndexPage from "./pages/Products";
import AllProductsPage from "./pages/Products/allProducts";
import SingleProductPage from "./pages/Products/singleProduct";
import { updateConfiguration } from "./store/features/configurationsSlice";

function App() {
  const dispatch = useAppDispatch();
  const appId = process.env.REACT_APP_APP_ID
    ? process.env.REACT_APP_APP_ID
    : "1";
  const fetchConfiguration = useCallback(async () => {
    try {
      const { data } = await getAppConfiguration(appId);
      dispatch(updateConfiguration(data));
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchConfiguration();
  }, [fetchConfiguration]);

  return (
    <Routes>
      <Route path="/products" element={<ProductsIndexPage />}>
        <Route index element={<AllProductsPage />} />
        <Route path=":id" element={<SingleProductPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
