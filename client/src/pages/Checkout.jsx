import { useState } from "react";
import axios from "axios";

function CheckoutForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Call backend to create PaymentIntent
        const response = await axios.post("http://localhost:4000/order/create-payment-intent", {
            amount: 1000, // amount in cents => $10.00
        });

        console.log(response.data.url);
        window.location.href = response?.data?.url;
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
                {loading ? "Processing…" : "Pay"}
            </button>
        </form>
    );
}

export default CheckoutForm;
