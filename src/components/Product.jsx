import React from "react"

const Product = ({ stripePromise, price }) => {
  const redirectToCheckout = async event => {
    event.preventDefault()
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: `${price.id}`, quantity: 1 }],
      mode: "payment",
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <div>
      <h4>Product</h4>
      <p>
        Price: {price.unit_amount} {price.currency}
      </p>
      <button onClick={event => redirectToCheckout(event, price.id)}>
        BUY ME
      </button>
    </div>
  )
}

export default Product
