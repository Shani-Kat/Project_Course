import apiSlice from "../../App/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({
        url: "/api/orders",

      }),
      providesTags:["orders"]
    }),
    getOldDateOrders: build.query({
      query: () => ({
        url: "/api/orders/oldDateOders",
      }),
      providesTags:["orders"]
    }),
    getUserActiveOrders: build.query({
      query: () => ({
        url: "/api/orders/userActiveOrders",

      }),
      providesTags:["orders"]
    }),
    getOldDateUserOrders: build.query({
      query: () => ({
        url: "/api/orders/userOldDateOrders",

      }),
      providesTags:["orders"]
    }),
    addOrder: build.mutation({
      query: (order) => ({
        url: "/api/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags:["orders"]
    }),
    deleteOrder: build.mutation({
      query: (_id) => ({
        url: "/api/orders",
        method: "DELETE",
        body: _id,
      }),
      invalidatesTags:["orders"]
    }),
  }),
});
export const {useAddOrderMutation,useGetOrdersQuery,useDeleteOrderMutation,useGetUserActiveOrdersQuery,useGetOldDateOrdersQuery,useGetOldDateUserOrdersQuery} = orderApiSlice;
