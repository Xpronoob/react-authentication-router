import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { PostUser } from '../../../models/postUser.model'
import { findUserById } from '../../../services/user.service'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosAdapter from '../../../lib/axios.adapter'

export const EditUser = () => {
  const { register, handleSubmit } = useForm<PostUser>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    isLoading,
    // isPending,
    isError,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => findUserById(id),
  })

  const updateUserMutation = useMutation({
    mutationFn: AxiosAdapter.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['usersIds'] })
      // navigate('/')
    },

    onSettled: (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries({
          queryKey: ['user', { id: variables.id }],
        })
      }
    },
  })

  if (isLoading) return <span>Loading user data...</span>
  if (isError) return `Error: ${error.message}`

  const onSubmit = (updatedUser: PostUser) => {
    updateUserMutation.mutate({ id, ...updatedUser })
  }

  return (
    <>
      <p> {isLoading ? 'Fetching data...' : 'Data loaded'} </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Edit User:</h4>
        <input placeholder="Name" {...register('name')} defaultValue={user?.name} />
        <br />
        <input placeholder="Email" {...register('email')} defaultValue={user?.email} />
        <br />
        {/* <input placeholder="Password" {...register('password')} /> */}
        <br />
        <input placeholder="Roles" {...register('roles')} defaultValue={user?.roles} />
        <br />
        <input
          type="submit"
          disabled={updateUserMutation.isPending}
          value={updateUserMutation.isPending ? 'Updating...' : 'Update User'}
        />
      </form>
    </>
  )
}

export default EditUser
