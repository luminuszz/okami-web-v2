import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/layouts/app'
import { AuthLayout } from './components/layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { ScrappingReport } from './pages/app/scrapping-report/scrapping-report'
import { Works } from './pages/app/works/works'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,

    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/works',
        element: <Works />,
      },
      {
        path: '/scrapping-report',
        element: <ScrappingReport />,
      },
    ],
  },

  {
    path: '/auth',
    errorElement: <NotFound />,
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/sign-in',
        lazy: async () => {
          const { Signin } = await import('./pages/auth/signin')
          return {
            element: <Signin />,
          }
        },
      },

      {
        path: '/auth/sign-up',
        lazy: async () => {
          const { SignUp } = await import('./pages/auth/signup')
          return {
            element: <SignUp />,
          }
        },
      },

      {
        path: '/auth/checkout',
        lazy: async () => {
          const { Checkout } = await import('./pages/payment/checkout')
          return {
            element: <Checkout />,
          }
        },
      },
      {
        path: '/auth/payment/success',
        lazy: async () => {
          const { PaymentSuccess } = await import(
            './pages/payment/payment-success'
          )
          return {
            element: <PaymentSuccess />,
          }
        },
      },
      {
        path: '/auth/payment/error',
        lazy: async () => {
          const { PaymentError } = await import('./pages/payment/payment-error')
          return {
            element: <PaymentError />,
          }
        },
      },
      {
        path: '/auth/password/send-reset-email',
        lazy: async () => {
          const { SendResetPasswordEmail } = await import(
            './pages/auth/send-reset-password-email'
          )
          return {
            element: <SendResetPasswordEmail />,
          }
        },
      },
      {
        path: '/auth/password/reset-password/:codeToken',
        lazy: async () => {
          const { ResetPassword } = await import('./pages/auth/reset-password')
          return {
            element: <ResetPassword />,
          }
        },
      },
    ],
  },
])
