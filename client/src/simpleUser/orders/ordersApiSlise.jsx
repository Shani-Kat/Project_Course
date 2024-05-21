import apiSlice from "../../App/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({
        url: "/api/orders",

      }),
      providesTags:["orders"]
    }),
    
    getUserOrders: build.query({
      query: () => ({
        url: "/api/orders/userOrders",

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
        url: `/api/orders/${_id}`,
        method: "DELETE"
      }),
      invalidatesTags:["orders"]
    }),
  }),
});
export const {useAddOrderMutation,useGetOrdersQuery,useDeleteOrderMutation,useGetUserOrdersQuery} = orderApiSlice;
