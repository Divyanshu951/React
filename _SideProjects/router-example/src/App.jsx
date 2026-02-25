import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import NoPageFound from "./NoPageFound";
import PricingMontly from "./components/PricingMontly";
import PricingYearly from "./components/PricingYearly";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />}>
          <Route path="montly" element={<p>Monthly</p>} />
          <Route path="yearly" element={<p>Yearly</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
