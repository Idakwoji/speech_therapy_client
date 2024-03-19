import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import Cookies from 'js-cookie'
import { useVerifyTwoFactorAuthMutation } from '../../state/services/auth'
import OtpInput from 'react-otp-input'

const QR_Page = () => {
  const [verifyTwoFactorAuthMutation, verifyTwoFactorAuthMutationApi] =
    useVerifyTwoFactorAuthMutation()
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [queryParams, setQueryParams] = useState({
    isNew: undefined,
    cameFrom: '',
    qrCodeUri: '',
    user_id: undefined,
  })

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLocation = async () => {
      // Simulate an asynchronous operation
      // You can replace this with actual fetching logic if needed
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const searchParams = new URLSearchParams(location.search)
      const params = Object.fromEntries(searchParams.entries())
      const qrCodeUri = Cookies.get('qrCodeUri')
      const user_id = Cookies.get('user_id')

      setQueryParams(params)
      setIsLoading(false)

      setQueryParams((prevState) => ({
        ...prevState,
        qrCodeUri: qrCodeUri,
        user_id: user_id,
      }))
    }

    fetchLocation()
  }, [location.search])

  useEffect(() => {
    if (!verifyTwoFactorAuthMutationApi.isSuccess) return undefined

    if (verifyTwoFactorAuthMutationApi.data?.status) {
      alert('Your are good to go, you have got access')
      navigate('/')
    }
  }, [verifyTwoFactorAuthMutationApi.isSuccess])

  if (isLoading) return <Loader />

  if (!queryParams.qrCodeUri && !queryParams.user_id)
    return navigate('/', { replace: true })

  const submitHandler = async (e) => {
    e.preventDefault()
    verifyTwoFactorAuthMutation({
      user_id: queryParams.user_id,
      otp_code: otp,
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1F2937]">
      <div
        style={{
          maxWidth:
            queryParams.isNew === 'true' && queryParams.qrCodeUri
              ? '896px'
              : '400px',
        }}
        className="mx-2 flex w-full items-center justify-center rounded-md bg-[#283240] py-6"
      >
        {queryParams.isNew === 'true' && queryParams.qrCodeUri ? (
          <div className="mx-auto w-full max-w-[400px] rounded-md bg-[#1F2937] px-3 pb-3 text-center text-white">
            <h1 className="mb-4 mt-8 text-xl font-medium">Scan QR code</h1>
            <p className="tex-sm mb-10 text-[#8c929f]">
              Plaats de QR-code in het frame om te scannen, vermijd schudden om
              te krijgen resultaat snel
            </p>

            <QRCode
              className="mx-auto h-[256px] w-[256px]"
              value={queryParams.qrCodeUri ?? ''}
              size={256}
            />
            <p className="mt-[20px] text-center text-sm text-[#8c929f]">
              Scan bovenstaande code met uw Google Authenticator
            </p>
          </div>
        ) : null}

        <div className="mx-auto mt-[30px] w-full max-w-[316px]">
          <h1 className="mb-4 text-xl font-medium text-white">OTP</h1>
          <p className="tex-sm mb-10 text-[#8c929f]">
            Voer uw OTP in vanuit de authenticator-app om door te gaan
          </p>
          <form onSubmit={submitHandler}>
            <OtpInput
              inputType="number"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="text-[#1F2937]">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: '48px',
                  }}
                  className="no-arrow-input h-12 w-12 rounded-md bg-[#1F2937] px-3 text-white outline-none"
                />
              )}
            />
            <button
              type="submit"
              className="mt-6 h-12 w-full items-center justify-center rounded-md bg-[#1F2937] px-3 font-medium uppercase text-white duration-150 hover:bg-[#1a2431] active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QR_Page
