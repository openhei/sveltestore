import axios from 'axios'
import url from './URL'
import setupUser from './setupUser'

async function logiUser({ email, password }) {
  const response = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password
    })
    .catch(err => console.error(err))

  if (response) {
    // setup user
    setupUser(response)
  }

  return response
}

export default logiUser
