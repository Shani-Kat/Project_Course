import apiSlice from "../../App/apiSlice"

const kategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getKategories: build.query({
            query: () => ({
                url: '/api/kategories'
            }),
            providesTags:["kategories"]
        }),

        addKategory: build.mutation({
            query:(kategory)=>({
            url:"api/kategories",
            method:"POST",
            body: kategory
        }),
        invalidatesTags:["kategories"]
        }),
        updateKategory: build.mutation({
            query:(kategory)=>({
            url:"api/kategories",
            method:"PUT",
            body: kategory
        }),
        invalidatesTags:["kategories"]
        }),
        deleteKategory: build.mutation({
            query: (id) => ({
              url: `/api/kategories/${id}`,
              method: "DELETE",
            }),
            invalidatesTags:["kategories"]
          }),
    }),
})
export const {useGetKategoriesQuery,useAddKategoryMutation,useUpdateKategoryMutation,useDeleteKategoryMutation} = kategoryApiSlice