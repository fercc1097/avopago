import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Input, Icon, Transition } from 'semantic-ui-react'
import { useCartMutations } from '@store/Cart'

type AddToCartProps = {
  product: TProduct
}

// Fake a server Response, we don't care on this project
// about data persistency, but you may add it :)
const addToCartRequest = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(resolve, 600)
  })

const validate = (quantity: number) => {
  let error = ''
  if (quantity < 1) error = "Can't be blank"

  return error
}

const AddToCart = ({ paymentlink }: any) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const { addToCart } = useCartMutations()

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const handleSubmit = async () => {
    console.log(paymentlink)
    router.push(paymentlink)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(parseInt(target.value, 10))

  return (
    <>
      <a href={paymentlink}>Comparar Ahora</a>
      {/* <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: 'green',
          content: 'Buy Now',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      /> */}
      {error && (
        <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
      )}
      <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
        <div style={{ color: 'green', position: 'absolute' }}>
          <Icon name="check" />
          Buy Now
        </div>
      </Transition>
    </>
  )
}

export default AddToCart
