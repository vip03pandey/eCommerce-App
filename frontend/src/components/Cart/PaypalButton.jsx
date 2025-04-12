import React from 'react'
import {PayPalButtons,PayPalScriptProvider} from '@paypal/react-paypal-js';
const PaypalButton= ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider 
      options={{"client-id":"AToiTSUK4c8C44apHlV06VLwSgj-rUIEtOWiUxtvdTbcoe258PaQZUla13g340kF1tTy7BWtGcjueMBq",intent: "capture",currency: "USD"}}
      >
     <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString()
                }
              }
            ]
          });
        }}
        onApprove={(data,actions)=>{
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

export default PaypalButton
