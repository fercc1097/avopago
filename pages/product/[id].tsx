import React from 'react'
import fetch from 'isomorphic-unfetch'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://tiendamp-4jcsp68gu.vercel.app/api/avo')
  const { data }: TAPIAvoResponse = await response.json()

  const paths = data.map(({ id }) => ({ params: { id } }))

  return {
    // Statically generate all paths
    paths,
    // Display 404 for everything else
    fallback: false,
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await fetch(
    `https://tiendamp-4jcsp68gu.vercel.app/api/avo/${params?.id}`
  )
  const product = await response.json()
  // Pass post data to the page via props
  return { props: { product } }
}

const ProductPage = (props: any) => {
  // console.log(props)
  return (
    <Layout>
      {props.product == null ? null : (
        <ProductSummary
          product={props.product.avo}
          paymentlink={props.product.paymentlink}
        />
      )}
      <script src="https://www.mercadopago.com/v2/security.js"></script>
    </Layout>
  )
}

export default ProductPage
