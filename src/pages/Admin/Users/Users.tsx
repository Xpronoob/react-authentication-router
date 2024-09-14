import { useIsFetching } from '@tanstack/react-query'
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
  useUsersIds,
} from '../../../services/user.service'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PostUser } from '../../../models/postUser.model'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Users = () => {
  const usersIdsQuery = useUsersIds()
  // const { data, status, isPending, isError } = usersIdsQuery
  const usersQueries = useUsers(usersIdsQuery.data)

  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const { register, handleSubmit } = useForm<PostUser>()

  const handleCreateUserSubmit: SubmitHandler<PostUser> = data => {
    createUserMutation.mutate(data)
  }

  const handleUpdateUserSubmit: SubmitHandler<PostUser> = data => {
    if (data) {
      updateUserMutation.mutate(data)
    }
  }

  // const handleUpdateUserSubmit = (data: PostUser | undefined) => {
  //   if (data) {
  //     updateUserMutation.mutate(data)
  //   }
  // }

  // const handleMarkAsDoneSubmit = (data: PostUser | undefined) => {
  //   if (data) {
  //     updateUserMutation.mutate({ ...data, checked: true })
  //   }
  // }

  const handleDeleteUser = async (id: string) => {
    await deleteUserMutation.mutateAsync(id)
  }

  const isFetching = useIsFetching()

  if (usersIdsQuery.isPending) return <p>Loading...</p>
  // if (usersIdsQuery.isLoading) return <p>Loading...</p>
  if (usersIdsQuery.isError) return <p>Error: {usersIdsQuery.error.message}</p>

  return (
    <>
      <p> {isFetching ? 'Fetching data...' : 'Data loaded'} </p>
      {/* <p>Query function status: {usersIdsQuery.status}</p> */}
      {/* <p>Query data status: {usersIdsQuery.status}</p> */}
      {/* <div>{usersIdsQuery.data?.map(userId => <p key={userId}>{userId}</p>)}</div> */}

      <form onSubmit={handleSubmit(handleCreateUserSubmit)}>
        <h4>New User:</h4>
        <input placeholder="Name" {...register('name')} />
        <br />
        <input placeholder="Email" {...register('email')} />
        <br />
        <input placeholder="Password" {...register('password')} />
        <br />
        <input placeholder="Roles" {...register('roles')} />
        <br />
        <input
          type="submit"
          disabled={createUserMutation.isPending}
          value={createUserMutation.isPending ? 'Creating...' : 'Create User'}
        />
      </form>
      <div>
        {usersQueries.map(({ data }) => (
          <div key={data?.id} className="py-1">
            <p>Name: {data?.name}</p>
            <p>Email: {data?.email}</p>
            <p>Roles: {data?.roles}</p>
            <img src={data?.img}></img>
            <div>
              {data && data.id && <Link to={`/admin/users/${data.id}`}>Edit</Link>}
              {data && data.id && (
                <button onClick={() => handleDeleteUser(data.id!)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Users
