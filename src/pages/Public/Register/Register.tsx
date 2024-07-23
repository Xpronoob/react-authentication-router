import { createUser, resetUser, UserKey } from '../../../redux/states/user'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../../../models'
import { useEffect, useState } from 'react'
import { clearLocalStorage } from '../../../utilities'
import { useDispatch } from 'react-redux'
import { postRegisterService } from '../../../services'
import { useForm } from 'react-hook-form'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Label from '../../../components/ui/Label'

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
      const response = await postRegisterService(data.name, data.email, data.password)

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
            <Label>Complete Name</Label>
            <Input
              type="text"
              placeholder="Name"
              // a to z with accents, 1 to 20 characters
              {...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{1,21}$/,
                  message: 'Invalid Name',
                },
                maxLength: {
                  value: 20,
                  message: 'Name must be more than 20 characters',
                },
              })}
            />
            {errors.name && (
              <p className="mt-2 text-md text-red-600">{errors.name?.message}</p>
            )}
          </div>

          <Label>Email</Label>
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
              <Label>Password</Label>
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
              <Label>Repeat Password</Label>
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
