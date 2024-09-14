import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import AxiosAdapter from '../lib/axios.adapter'
import { PostUser } from '../models/postUser.model'

// export const getUsers = () => {
//   return AxiosAdapter.getRequest('/admin/findAll')
// }

// todo: Only find ids
export const findAllUsersIds = () => {
  return AxiosAdapter.findAllUsersIds()
}

export const findUserById = (id: string | undefined) => {
  return AxiosAdapter.findUserById(id)
}

// Queries
// Manage api responses to manage the cache storage, re validate, charge states, pending states...etc

export function useUsersIds() {
  return useQuery({
    queryKey: ['usersIds'],
    queryFn: findAllUsersIds,
  })
}

// If you want to fetch multiple queries and you don't know how many queries yo will be need
export function useUsers(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map(id => {
      return {
        queryKey: ['user', { id }],
        queryFn: () => findUserById(id!),
      }
    }),
  })
}

// Mutations
// onSuccess first
// onSettled second
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostUser) => AxiosAdapter.createUser(data),
    onMutate: () => {
      console.log('mutate')
    },

    onError: () => {
      console.log('error')
    },

    onSuccess: async () => {
      console.log('success')
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      await queryClient.invalidateQueries({ queryKey: ['usersIds'] })
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({
          queryKey: ['user', { id: variables.id }],
        })
      }
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostUser) => AxiosAdapter.updateUser(data),

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({
          queryKey: ['user', { id: variables.id }],
        })
      }
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => AxiosAdapter.deleteUser(id),

    onSuccess: () => {
      console.log('deleted successfully')
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({ queryKey: ['usersIds'] })
      }
    },
  })
}
