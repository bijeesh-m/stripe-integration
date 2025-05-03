import React, { useEffect } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import ScrollPage from "./pages/ScrollPage";
import Payment from "./pages/Payment";
import Success from "./components/Success";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/productSlice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);


    

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/scroll" element={<ScrollPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </div>
    );
};

export default App;
