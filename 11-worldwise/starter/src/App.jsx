// STEP 1: Import required routing components from react-router-dom
// BrowserRouter → Enables routing in the entire app
// Routes → Wraps all Route definitions
// Route → Defines individual route paths and their components
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
FINAL NOTE:

This setup creates a Single Page Application (SPA):

1. Only one HTML file loads.
2. React switches components based on URL.
3. No full page refresh happens.
4. Navigation must use <Link> instead of <a> for SPA behavior.

NEXT STEPS TO IMPROVE:
- Add a shared Layout component (Navbar/Footer).
- Learn nested routes.
- Use dynamic routes like /product/:id.
- Use useNavigate for programmatic navigation.
*/
