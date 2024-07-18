// import { useDispatch } from 'react-redux'
// import { getMorty } from '../../services'
// import { createUser, resetUser, UserKey } from '../../redux/states/user'
// import { useNavigate } from 'react-router-dom'
// import { PrivateRoutes, PublicRoutes } from '../../models'
// import { useEffect } from 'react'
// import { clearLocalStorage } from '../../utilities'
import { useForm } from 'react-hook-form'

function Login() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log('errors')
  console.log(errors.email?.message)

  // useEffect(() => {
  //   clearLocalStorage(UserKey)
  //   dispatch(resetUser())
  //   navigate(`/${PublicRoutes.LOGIN}`, {replace: true})
  // }, [])

  // const login = async () => {
  //   try {
  //     const result = await getMorty()
  //     // dispatch(createUser({...result, rol: Roles.USER}))
  //     dispatch(createUser(result))
  //     navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true})
  //   } catch (error) {}
  // }

  return (
    <div>
      {/* <h2>LOGIN!</h2>
      <button onClick={login}>LOGIN</button> */}
      <form
        onSubmit={handleSubmit(data => {
          console.log(data)
        })}
      >
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}
export default Login
