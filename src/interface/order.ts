import {BasicProduct, Product} from "./products";
import {BasicCustomer, Customer} from "./customer";

export interface BasicOrder {
  product: BasicProduct,
  customer: BasicCustomer,
  productQuantity: number
}

export interface Order extends BasicOrder {
  id: number
}

export interface OrderWithDetails extends Order{
  product: Product,
  customer: Customer,
}