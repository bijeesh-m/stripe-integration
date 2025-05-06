import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty, removeFromCart, addToCart, getCart } from "../features/cartSlice";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "../config/axios.config";
const Cart = () => {
    const { items, loading, error, totalAmount, userId } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, []);

    console.log(items);

    if (loading) {
        return <div>Loding...</div>;
    }

    // const totalPrice = useMemo(() => {
    //     return cart.itmes.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // }, [cart]);

    const handleAddToCart = async (prodId) => {
            dispatch(addToCart(product));
    
            try {
                await axios.post("/cart", { productId: product._id });
            } catch (error) {
                console.log(error);
            }
        };

    const handleRemoveFromCart = async (productId) => {
        dispatch(removeFromCart(productId));
        try {
            await axiosInstance.delete(`/cart/${productId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className=" grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 mx-5">
                {items.map((product) => {
                    return (
                        <div
                            key={product._id}
                            className="  rounded-2xl flex flex-col h-[420px]  overflow-hidden shadow-2xl "
                        >
                            <div className=" h-[200px]  ">
                                <img
                                    className=" h-full w-full object-cover"
                                    src={product.productId?.images[0]}
                                    alt=""
                                />
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
                                                ? dispatch(removeFromCart(product.productId._id))
                                                : dispatch(decQty(product.productId._id));
                                        }}
                                        className=" font-bold text-xl cursor-pointer"
                                    >
                                        {product.quantity === 1 ? <FaTrash className=" text-md" /> : "-"}
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incQty(product.productId._id))}
                                        className=" font-bold text-2xl cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                <div
                                    onClick={() => handleRemoveFromCart(product.productId._id)}
                                    className=" bg-amber-500 rounded px-3 py-2 text-center text-sm font-bold"
                                >
                                    <button>Remove from Cart</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* {cart.length !== 0 && (
                <div>
                    <h1>Total Price : {Math.round(totalPrice)}</h1>
                </div>
            )} */}
        </div>
    );
};

export default Cart;
