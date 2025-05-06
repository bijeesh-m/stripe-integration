import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const {items} = useSelector((state) => state.cart);

    return (
        <div className=" bg-slate-200 p-5">
            <nav className=" flex justify-between">
                <div className=" flex gap-5">
                    <h1>Home</h1>
                    <h1>Profile</h1>
                </div>
                <div onClick={() => navigate("/cart")} className=" relative ">
                    <FaShoppingCart size={30} />
                    <span className=" absolute -top-3 -right-2 font-bold text-orange-500">{items.length}</span>
                </div>
            </nav>
        </div>
    );
};

export default Header;
