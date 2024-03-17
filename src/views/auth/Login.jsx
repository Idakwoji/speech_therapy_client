import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import { useLogin, useEnable2fa, useVerify2fa } from './api'
import Loader from '../../components/Loader/index'
import ErrorMessage from '../../components/ErrorMessage/index'

const Login = () => {
  const { slug } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [OTP, setOTP] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [QR, setQR] = useState('')
  const { mutate: login, isLoading, error } = useLogin({ email, password })
  const { mutate: enable2FA } = useEnable2fa()
  const { mutate: verify2FA } = useVerify2fa(OTP)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const status = await login({ email, password })
      console.log(status?.data)
      // handleLoginResponse(result)
      console.log(
        `Login as ${slug} with email: ${email} and password: ${password}`,
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginResponse = (result) => {
    switch (result.status) {
      case 'INVALID_USER_TYPE':
        // Handle invalid user type error
        console.error('Invalid user type')
        return (
          <ErrorMessage message="Ongeldig gebruikerstype, controleer de inloggegevens en probeer het opnieuw!" />
        )
        break
      case '2FA_NOT_ENABLED':
        // If 2FA not enabled, call enable2FA
        handleEnable2FA()
        break
      case '2FA_VERIFY':
        // Show OTP field for verification
        setShowOTP(true)
        break
      case 'INVALID_CREDENTIALS':
        // Handle invalid credentials error
        console.error('Invalid credentials')
        return (
          <ErrorMessage message="Ongeldige inloggegevens, controleer de inloggegevens en probeer het opnieuw!" />
        )
        break
      case 'INVALID_REQUEST_METHOD':
        // Handle invalid request method error
        console.error('Invalid request method')
        return <ErrorMessage message="Ongeldige aanvraagmethode" />
        break
      default:
        // Handle unknown status
        console.error('Unknown status:', result.status)
        return <ErrorMessage message="Er is een onbekende fout opgetreden" />
    }
  }

  const handleEnable2FA = async () => {
    try {
      const { data } = await enable2FA()
      // If 2FA enabled, show QR code
      if (data.status === '2FA_ENABLED') {
        console.log('2FA enabled. QR code URI:', data.totp_uri)
        setShowQR(true)
        setQR(data.totp_uri)
      } else if (data.status === '2FA_ALREADY_ENABLED') {
        console.warn('2FA already enabled')
        return (
          <ErrorMessage message="2FA is al ingeschakeld voor dit account" />
        )
      } else {
        console.error('Unexpected response:', data)
        return <ErrorMessage message="Er is een onverwachte fout opgetreden" />
      }
    } catch (error) {
      // Handle enable 2FA error
      console.error('Enable 2FA error:', error)
      return (
        <ErrorMessage message="Er is een fout opgetreden bij het inschakelen van 2FA" />
      )
    }
  }

  const handleVerify2FA = async (e) => {
    e.preventDefault()
    try {
      const { data } = await verify2FA()
      // Handle verify 2FA response
      if (data.status === '2FA_VERIFIED') {
        console.log('2FA verified. Proceed to dashboard.')
        slug === 'admin'
          ? navigate('/admin/thema')
          : slug === 'therapist'
            ? navigate('/therapist/')
            : navigate('/client/')
      } else if (data.status === 'INVALID_2FA_CODE') {
        console.error('Invalid OTP code')
        return <ErrorMessage message="Ongeldige OTP-code" />
      } else {
        console.error('Unexpected response:', data)
        return <ErrorMessage message="Er is een onverwachte fout opgetreden" />
      }
    } catch (error) {
      // Handle verify 2FA error
      console.error('Verify 2FA error:', error)
      return (
        <ErrorMessage message="Er is een fout opgetreden bij het verifiëren van de 2FA-code" />
      )
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1F2937]">
      <div className="mb-8 flex flex-col gap-4">
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
        {showQR &&
          QR &&
          (<div className="mx-2 flex items-center justify-center">
            <div className="bg-white p-3">
              <QRCode value={QR} size={256} />
              <p>Scan bovenstaande code met uw Google Authenticator</p>
            </div>
          </div>)(setShowOTP(true))}
        {showOTP && (
          <div>
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Otp
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP-code van de Authenticator-app"
              required
            />
            <button
              type="submit"
              className={`w-full rounded-md py-2 text-center font-semibold ${slug === 'admin' ? 'bg-purple-800' : slug === 'therapist' ? 'bg-orange-600' : slug === 'client' ? 'bg-black bg-gradient-to-br from-blue-300 to-blue-700 shadow shadow-blue-500/50 duration-500 hover:scale-110' : 'bg-yellow-300'} text-white`}
              onClick={handleVerify2FA}
            >
              Sign in
            </button>
          </div>
        )}
        {!showOTP && (
          <button
            type="submit"
            className={`w-full rounded-md py-2 text-center font-semibold ${slug === 'admin' ? 'bg-purple-800' : slug === 'therapist' ? 'bg-orange-600' : slug === 'client' ? 'bg-black bg-gradient-to-br from-blue-300 to-blue-700 shadow shadow-blue-500/50 duration-500 hover:scale-110' : 'bg-yellow-300'} text-white`}
          >
            Sign in
          </button>
        )}

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
