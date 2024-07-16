import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => '/Todos',
      providesTags: ['Todo'],
    }),

    getTodoById: builder.query({
      query: (id) => `/Todos/${id}`,
      providesTags: ['Todo'],
    }),

    addNewTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/Todos',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),

    updateTodo: builder.mutation({
      query: ({ id, updatedTodo }) => ({
        url: `/Todos/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updatedTodo,
      }),
      invalidatesTags: ['Todo'],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/Todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoByIdQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
