type Url = string
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type TProductId = string

type TProductAttributes = {
  description: string
  shape: string
  hardiness: string
  taste: string
}
type TMPResponse = {
  body: {
    id: number
    items: any
    init_point: string
  }
}
type TPreferenceID = number

type TProduct = {
  id: TProductId
  name: string
  sku: string
  price: number
  image: Url
  paymentlink: string
  attributes: TProductAttributes
}

type TAPIAVODetailResponse = TProduct

type TAPIAvoResponse = {
  lenght: number
  data: TProduct[]
  error?: string
}
