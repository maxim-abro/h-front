export default async function ({store, route}:any) {
  if (route.query.coupon) {
    await store.dispatch('popup/getPost', route.query.coupon)
  }
}
