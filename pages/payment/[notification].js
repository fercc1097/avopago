import React from 'react'
import { useRouter } from 'next/router'

const Status = () => {
  const router = useRouter()
  const {
    notification,
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    merchant_account_id,
  } = router.query
  return (
    <div>
      <h1>collection id: {collection_id}</h1>
      <h1>collection status: {collection_status}</h1>
      <h1>payment id: {payment_id}</h1>
      <h1>status: {status}</h1>
      <h1>external reference: {external_reference}</h1>
      <h1>payment type: {payment_type}</h1>
      <h1>merchant order: {merchant_order_id}</h1>
      <h1>preference id: {preference_id}</h1>
      <h1> site id: {site_id}</h1>
      <h1> merchant account id: {merchant_account_id}</h1>
    </div>
  )
}

export default Status
