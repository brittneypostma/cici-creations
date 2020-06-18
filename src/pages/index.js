import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Cart from "../components/Cart"
import Products from "../components/Products"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Checkout with cart example</h1>
      <h2>
        With{" "}
        <a href="https://use-shopping-cart.netlify.app/">use-shopping-cart</a>
      </h2>
      <CartProvider
        stripe={stripePromise}
        successUrl={`http://localhost:8000/page-2/`}
        cancelUrl={`http://localhost:8000/`}
        currency="USD"
        allowedCountries={["US", "GB", "CA"]}
        billingAddressCollection={true}
      >
        <Cart />
        <Products />
      </CartProvider>
    </Layout>
  )
}

export default IndexPage
