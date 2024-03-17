import { handleError } from '../../utils/functions'

const API_URL = import.meta.env.DEV ? 'http://83.85.157.106:8000/api/' : '/api/'

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    if (!response.ok) {
      throw new Error(`Failed to log the user in! Status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error logging the user in:', error)
    throw new Error('Failed to authenticate user')
  }
}

export const enable2fa = async (id) => {
  try {
    const response = await fetch(`${API_URL}enable_2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ id }),
    })
    if (!response.ok) {
      throw new Error(
        `Failed to enable 2 factor authentication! Status: ${response.status}`,
      )
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error Enabling 2FA:', error)
    throw new Error('Failed to enable two factor authentication (2FA)')
  }
}

export const verify2fa = async (otp) => {
  try {
    const response = await fetch(`${API_URL}verify_2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp_code: otp }),
    })
    if (!response.ok) {
      throw new Error(`Failed to verify code! Status: ${response.status}`)
    }
    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('Error verifying code:', error)
    throw new Error('Failed to verify 2FA code!')
  }
}
