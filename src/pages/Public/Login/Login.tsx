// Login.tsx
import { createUser, resetUser, UserKey } from '../../../redux/states/user'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../../../models'
import { useEffect, useState } from 'react'
import { clearLocalStorage } from '../../../utilities'
import { useDispatch } from 'react-redux'
import { postLoginService } from '../../../services'
import { useForm } from 'react-hook-form'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [postError, setPostError] = useState<any>('')

  const onSubmit = async (data: any) => {
    try {
      const response = await postLoginService(data.email, data.password)

      if (response.status === 200) {
        dispatch(createUser(response.data.user))
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
      } else {
        // console.error('Login failed:', response.data)
        // Todo: manage errors
      }
    } catch (error) {
      setPostError(error)
      // console.error('Error:', error)
      // Todo: manage connection errors
    }
  }

  useEffect(() => {
    // Limpiar cualquier estado de usuario existente y localStorage al cargar el componente
    //@ts-ignore
    dispatch(resetUser())
    clearLocalStorage(UserKey)
  }, [dispatch])

  return (
    <div className="flex flex-col items-center justify-center">
      <img src="./logo.png" alt="Logo" className="h-24" />
      <h2 className="">Welcome again!</h2>
      <p>Please login to continue</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Invalid email address',
            },
            maxLength: {
              value: 50,
              message: 'Email must be less than 50 characters',
            },
          })}
        />
        {errors.email && typeof errors.email.message === 'string' && (
          <p className="mt-2 text-md text-red-600">{errors.email.message}</p>
        )}
        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        {errors.password && typeof errors.password.message === 'string' && (
          <p className="mt-2 text-md text-red-600">{errors.password?.message}</p>
        )}

        {postError.response?.status == 400 && (
          <p className="mt-2 text-md text-red-600">User not found</p>
        )}

        <Button type="submit">LOGIN</Button>
      </form>
    </div>
  )
}

export default Login
