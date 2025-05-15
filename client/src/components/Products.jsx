import React, { useEffect } from "react";
// import products from "../../products.json";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { checkAuthStatus } from "../features/authSlice";

const Products = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        // dispatch(checkAuthStatus());
    }, []);

    const { products, loading, error } = useSelector((state) => state.products);


    if (loading) {
        return <div>Loading....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            <div className=" flex justify-center  p-10">
                <div className=" grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((prod) => {
                        return (
                            <div key={prod.id}>
                                <ProductCard product={prod} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Products;
