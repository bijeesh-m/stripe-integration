import React, { useEffect } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import ScrollPage from "./pages/ScrollPage";
import Payment from "./pages/Payment";
import Success from "./components/Success";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import UserLayout from "./layouts/UserLayout";

const App = () => {


    return (
        <div>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route path="/scroll" element={<ScrollPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
