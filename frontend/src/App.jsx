import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from "./pages/HomePage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
