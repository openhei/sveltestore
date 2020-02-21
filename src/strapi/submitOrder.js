import axios from 'axios'
import url from './URL'

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  const response = await axios
    .post(
      `${url}/orders`,
      { name, total, items, stripeTokenId },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    .catch(err => console.error(err))

  return response
}

export default submitOrder
