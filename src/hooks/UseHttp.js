import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import PropTypes from 'prop-types'

useHttp.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default async function useHttp (url, params, callback, errorCallback, dependencies) {
  const errorFunction = errorCallback || function (errorSpec) {
    console.log(errorSpec)
  }

  const [cookies,, removeCookie] = useCookies()

  let headers = {}
  headers = {
    ...params.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (cookies.login) {
    headers = { ...headers, 'client-security-token': cookies.login }
  }

  const options = {
    ...params,
    headers: headers,
    cache: 'no-cache',
    mode: 'cors'
  }

  const deps = dependencies || []

  await useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then(response => callback(response))
      .catch(error => {
        if (cookies.login) {
          removeCookie('login')
        }
        errorFunction(error)
      })
  }, deps)
}
