import apiSlice from "../../App/apiSlice"

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/users'
            }),
            providesTags: ["users"]
        }),

        getUserById: build.query({
            query: (_id) => ({
                url: '/api/users/'+_id
            }),
            providesTags: ["user"]

        }),
        addUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["users"]
        }),
        addManager: build.mutation({
            query: (user) => ({
                url: "api/users/manager",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["users"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["users","user"]
        }),
        deleteUser: build.mutation({
            query: (_id) => ({
                url: "api/users",
                method: "DELETE",
                body: _id
            }),
            invalidatesTags: ["users"]
        })
    }),
})
export const {useAddUserMutation,useGetUsersQuery,useDeleteUserMutation,useUpdateUserMutation,useAddManagerMutation,useGetUserByIdQuery} = userApiSlice