import apiSlice from "../../App/apiSlice";
const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: () => ({
        url: "/api/courses",
      }),
      providesTags:["courses"]
    }),
    getOrdersForCourse: build.query({
      query: (id) => ({
        url: `/api/courses/${id}/orders`,
      }),
      providesTags:["courses"]
    }),

    getCourseById: build.query({
      query: (id) => ({
        url: `api/courses/${id}`,
      })
    }),
    getActiveCourses: build.query({
      query: () => ({
        url: "/api/courses/getActivecourses",
      }),
      invalidatesTags:["courses"]
    }),
    getCourseByKategories: build.query({
      query: (id) => ({
        url: `/api/courses/kategories/${id}`,
      }),
      invalidatesTags:["courses"]
    }),
    addCourse: build.mutation({
      query: (course) => ({
        url: "/api/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags:["courses"]
    }),
    updateCourse: build.mutation({
      query: (course) => ({
        url: "/api/courses",
        method: "PUT",
        body: course,
      }),
      invalidatesTags:["courses"]
    }),

    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/api/courses/${id}`,
        method: "DELETE",
       
      }),
      invalidatesTags:["courses"]
    }),

  }),
});
export const { useAddCourseMutation, useGetCoursesQuery,useUpdateCourseMutation,useDeleteCourseMutation,useGetActiveCoursesQuery,useGetCourseByIdQuery,useGetCourseByKategoriesQuery,useGetOrdersForCourseQuery } = courseApiSlice;
