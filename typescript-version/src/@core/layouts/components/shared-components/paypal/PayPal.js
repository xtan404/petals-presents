import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    // Load the PayPal SDK script dynamically
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AbqRrxCoI4-tiiFWZDCPIRXcjgkFEvsj4KLEu76zXSsKqmP-ul6ife4rJrSpdx5Nm_Kh-J2APSZgqjt3&currency=PESO";
    script.async = true;
    document.body.appendChild(script);

    // Initialize PayPal Buttons when the script is loaded
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: 567.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    };

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
