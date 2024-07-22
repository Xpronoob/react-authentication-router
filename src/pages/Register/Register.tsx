import { createUser, resetUser, UserKey } from '../../redux/states/user'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../../models'
import { useEffect, useState } from 'react'
import { clearLocalStorage } from '../../utilities'
import { useDispatch } from 'react-redux'
import { postLogin } from '../../services'
import { useForm } from 'react-hook-form'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [postError, setPostError] = useState<any>('')

  const onSubmit = async (data: any) => {
    try {
      const response = await postLogin(data.email, data.password)

      if (response.status === 200) {
        dispatch(createUser(response.data.user))
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
      } else {
        // Todo: manage errors
      }
    } catch (error) {
      setPostError(error)
      // Todo: manage connection errors
    }
  }

  useEffect(() => {
    // Limpiar cualquier estado de usuario existente y localStorage al cargar el componente
    dispatch(resetUser())
    clearLocalStorage(UserKey)
  }, [dispatch])

  // Observa el valor del campo de contraseña
  const password = watch('password')

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="" alt="" />
      <h2 className="">Welcome to the app!</h2>
      <p>Please register to continue</p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Input
              type="text"
              placeholder="example@email.com"
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
            {errors.email && (
              <p className="mt-2 text-md text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="flex gap-1">
            <div className="">
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
              {errors.password && (
                <p className="mt-2 text-md text-red-600">{errors.password?.message}</p>
              )}
            </div>

            <div className="">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: value => value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-md text-red-600">{errors.confirmPassword?.message}</p>
              )}
            </div>
          </div>

          {postError.response?.status === 400 && (
            <p className="mt-2 text-md text-red-600">User not found</p>
          )}

          <Button type="submit">REGISTER</Button>
        </form>
      </div>
    </div>
  )
}

export default Register
