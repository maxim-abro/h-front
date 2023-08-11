import { ShopDescriptionModel } from '~/models/ShopDescription.model'

type ShopModel = {
  id?: number
  uin?: string
  title: string
  description: string
  image: string
  contacts: string
  url: string
  dostavka: string
  tags: string
  categories: string
  counter: number
  shop_description: ShopDescriptionModel
}

export type { ShopModel }
