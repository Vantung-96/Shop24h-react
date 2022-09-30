import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Cart from "./page/Cart";
import DanhMuc from "./page/DanhMuc";
import ProductInfo from "./page/ProductInfo ";


function App() {
  
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route  path="/product" element={<DanhMuc />}></Route>
        <Route path="/product/:productId" element={<ProductInfo/>}>  </Route>
        <Route path="/cart" element={<Cart />}>  </Route>
      </Routes>
    </div>
  );
}

export default App;
