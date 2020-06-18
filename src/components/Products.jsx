import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Product from "./product"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const PRODUCTS_QUERY = graphql`
  query AllProducts {
    allStripePrice {
      edges {
        node {
          id
          product
          type
          unit_amount
        }
      }
    }
  }
`

const Products = () => {
  return (
    <StaticQuery
      query={PRODUCTS_QUERY}
      render={({ allStripePrice }) => {
        return allStripePrice.edges.map(product => {
          const price = allStripePrice.edges.filter(
            price => price.node.product.id === product.node.id
          )
          return (
            <Product
              key={price.id}
              price={price}
              stripePromise={stripePromise}
            />
          )
        })
      }}
    />
  )
}

export default Products
