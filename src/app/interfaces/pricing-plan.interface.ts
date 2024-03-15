export interface IPricingPlan {
  _id: string
  type: string
  planName: string
  price: number
  duration: string
  freeTrailDays: number
  planDescription: string
  features: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
  stripePriceId: string
  stripeProductId: string
}
