import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Loader from '../../components/Loader/index'
import {
  useEnableTwoFactorAuthMutation,
  useLoginMutation,
} from '../../state/services/auth'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import { MdError } from 'react-icons/md'

const Login = () => {
  const [loginMutation, loginApi] = useLoginMutation()
  const [enableTwoFactorAuthMutation, enableTwoFactorAuthMutationApi] =
    useEnableTwoFactorAuthMutation()
  const { slug } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (error) setError('')
    try {
      loginMutation({ username: email, password, account_type: slug })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginResponse = (result) => {
    switch (result.status) {
      case '2FA_NOT_ENABLED':
        // If 2FA not enabled, call enable2FA
        enableTwoFactorAuthMutation({ user_id: result.user_id })
        break
      case '2FA_VERIFY':
        const oneHourInMs = 60 * 60 * 1000 // 1 hour in milliseconds
        const expiryTime = new Date(Date.now() + oneHourInMs) // Current time + 1 hour

        Cookies.set('user_id', result.user_id, { expires: expiryTime })
        navigate(`/qr-code?isNew=${false}&cameFrom=${slug}`)
        break
      default:
        // Handle unknown status
        console.error('Unknown status:', result.status)
    }
  }

  useEffect(() => {
    if (!enableTwoFactorAuthMutationApi.isSuccess) return undefined

    const oneHourInMs = 60 * 60 * 1000 // 1 hour in milliseconds
    const expiryTime = new Date(Date.now() + oneHourInMs) // Current time + 1 hour
    Cookies.set('qrCodeUri', enableTwoFactorAuthMutationApi.data.totp_uri, {
      expires: expiryTime,
    })
    navigate(`/qr-code?isNew=${true}&cameFrom=${slug}`)
  }, [enableTwoFactorAuthMutationApi])

  useEffect(() => {
    if (!loginApi.isSuccess) return undefined

    const isErrorAdmin =
      slug === 'admin' && loginApi.data?.status === 'INVALID_USER_TYPE_ADMIN'
    const isErrorClient =
      slug === 'client' && loginApi.data?.status === 'INVALID_USER_TYPE_CLIENT'
    const isErrorTherapist =
      slug === 'therapist' &&
      loginApi.data?.status === 'INVALID_USER_TYPE_THERAPIST'

    if (isErrorAdmin)
      return setError('Please enter a valid admin account details')
    else if (isErrorClient)
      return setError('Please enter a valid client account details')
    else if (isErrorTherapist)
      return setError('Please enter a valid therapist account details')

    if (!loginApi.data.user_id) return undefined
    handleLoginResponse(loginApi.data)
  }, [loginApi])

  useEffect(() => {
    if (slug && slug !== 'client' && slug !== 'therapist' && slug !== 'admin') {
      navigate('/', { replace: true })
    }
  }, [slug, navigate])

  if (loginApi.isLoading) return <Loader />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1F2937]">
      <div className="relative mb-8 flex flex-col gap-4">
        <h1 className="text-center text-4xl font-extrabold text-white">
          {slug === 'admin' && `Welkom, Beheerder`}
          {slug === 'therapist' && `Therapeuten Inloggen`}
          {slug === 'client' && `Studenten Inloggen`}
        </h1>
        <h4 className="text-center text-gray-300">
          Meld u aan bij uw account om door te gaan
        </h4>
      </div>
      <form
        className="border-1 h-1/2 w-1/2 space-y-4 rounded-3xl border border-white px-10 py-10 md:space-y-6"
        onSubmit={handleLogin}
      >
        <AnimatePresence>
          {error && (
            <motion.div
              className="flex w-full items-center space-x-2 rounded-md bg-red-500 px-3 py-2 text-sm text-white"
              animate={{ opacity: 1, y: -10 }}
              initial={{ opacity: 0, y: 5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MdError />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Gebruikersnaam
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="e.g finn25"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Wachtwoord
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-3 right-0 flex items-center px-3 text-gray-400 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full rounded-md py-2 text-center font-semibold ${slug === 'admin' ? 'bg-purple-800' : slug === 'therapist' ? 'bg-orange-600' : slug === 'client' ? 'bg-black bg-gradient-to-br from-blue-300 to-blue-700 shadow shadow-blue-500/50 duration-500 hover:scale-110' : 'bg-yellow-300'} text-white`}
        >
          Sign in
        </button>

        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-medium text-gray-400 underline hover:text-gray-500"
          >
            Forgot password?
          </a>
        </div>

        {slug === 'client' ? (
          ' '
        ) : (
          <p className="text-sm font-light text-gray-500 dark:text-gray-300">
            Don’t have an account yet?{' '}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
