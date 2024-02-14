import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createSession } from '@/api/create-session'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormLogin = z.infer<typeof formLoginSchema>

export function Signin() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLogin>({
    resolver: zodResolver(formLoginSchema),
    values: {
      email: '',
      password: '',
    },
  })

  const { mutateAsync: makeSession } = useMutation({
    mutationFn: createSession,
  })

  async function handleSigin(payload: FormLogin) {
    try {
      await makeSession(payload)

      toast.success('Login feito com sucesso')

      navigate('/', { replace: true })
    } catch (err) {
      if (err instanceof AxiosError && err.code === '401') {
        toast.error('Usuário ou senha inválidos!')
      } else {
        toast.error('Opa, algo deu errado! Tente novamente mais tarde.')
      }
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[320px] flex-col justify-center gap-6">
          <header className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanha suas obras Favoritas e muito mais
            </p>
          </header>

          <form
            className="flex flex-col gap-4 "
            onSubmit={handleSubmit(handleSigin)}
          >
            <div className="space-y-4">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="user@email.com"
                type="email"
                {...register('email')}
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="*********"
                type="password"
                {...register('password')}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
