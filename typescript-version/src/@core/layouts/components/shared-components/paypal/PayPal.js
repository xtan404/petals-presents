import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    // Load the PayPal SDK script dynamically
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AXzpamtMAWscdwZHQ1K5HeImmtBaO8y3Qw_jw6kr6bj9B9_hVjeFq66xuKEIIDjDP_L3H6zIpYFuK6XT&currency=USD"; // Set to Peso (PHP)
    script.async = true;
    document.body.appendChild(script);

    // Initialize PayPal Buttons when the script is loaded
    script.onload = () => {
      if (window.paypal && paypal.current) {
        window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Cool looking table",
                    amount: {
                      currency_code: "USD", // Ensure consistency with the SDK currency
                      value: 2694.0,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log("Order approved:", order);
            },
            onError: (err) => {
              console.error("PayPal Checkout Error:", err);
            },
          })
          .render(paypal.current);
      }
    };

    // Clean up the script on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div ref={paypal}></div>;
}
