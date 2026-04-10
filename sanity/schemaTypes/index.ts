import { type SchemaTypeDefinition } from 'sanity'


import {categoryType} from './categoryType'
import {productType} from "./productType"
import { orderType } from './orderType'
import { storeType } from './storeType'
import { reviewType } from './reviewType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ categoryType,productType,orderType, storeType, reviewType],
}
