import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty, removeFromCart } from "../features/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const cart = useSelector((state) => state.cart);

    console.log(cart);

    const dispatch = useDispatch();

    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);

    return (
        <div>
            <div className=" grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 mx-5">
                {cart.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className="  rounded-2xl flex flex-col h-[420px]  overflow-hidden shadow-2xl "
                        >
                            <div className=" h-[200px]  ">
                                <img className=" h-full w-full object-cover" src={product.imageUrl} alt="" />
                            </div>
                            <div className=" p-5 flex-1 h-[200px]  flex flex-col justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1 className=" font-bold text-xl line-clamp-1">{product.name}</h1>
                                    <p className=" line-clamp-2">{product.description}</p>
                                    <p className=" font-bold text-xl">{product.price}</p>
                                </div>
                                <div className=" ring-2 ring-amber-300 rounded-full w-fit text-sm    flex gap-5 px-2  items-center justify-between">
                                    <button
                                        onClick={() => {
                                            product.quantity === 1
                                                ? dispatch(removeFromCart(product.id))
                                                : dispatch(decQty(product.id));
                                        }}
                                        className=" font-bold text-xl cursor-pointer"
                                    >
                                        {product.quantity === 1 ? <FaTrash className=" text-md" /> : "-"}
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incQty(product.id))}
                                        className=" font-bold text-2xl cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                <div
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                    className=" bg-amber-500 rounded px-3 py-2 text-center text-sm font-bold"
                                >
                                    <button>Remove from Cart</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {cart.length !== 0 && (
                <div>
                    <h1>Total Price : {Math.round(totalPrice)}</h1>
                </div>
            )}
        </div>
    );
};

export default Cart;
