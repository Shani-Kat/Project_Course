import apiSlice from "../../App/apiSlice"

const lecturerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLecturers: build.query({
            query: () => ({
                url: '/api/lecturers'
            }),
            providesTags: ["lecturers"]
        }),
        addLecturer: build.mutation({
            query: (lecturer) => ({
                url: "api/lecturers",
                method: "POST",
                body: lecturer
            }),
            invalidatesTags: ["lecturers"]
        }),
        updateLecturer: build.mutation({
            query: (lecturer) => ({
                url: "api/lecturers",
                method: "PUT",
                body: lecturer
            }),
        
            invalidatesTags: ["lecturers"]
        }),
        updateLecturerActive: build.mutation({
            query: (_id) => ({
                url: "api/lecturers/active",
                method: "PUT",
                body: _id
            }),
            invalidatesTags: ["lecturers"]
        }),
        deleteLecturer: build.mutation({
            query: (_id) => ({
                url: "api/lecturers",
                method: "DELETE",
                body: _id
            }),
            invalidatesTags: ["lecturers"]
        })
    }),
})
export const { useGetLecturersQuery, useAddLecturerMutation, useUpdateLecturerMutation ,useDeleteLecturerMutation,useUpdateLecturerActiveMutation} = lecturerApiSlice