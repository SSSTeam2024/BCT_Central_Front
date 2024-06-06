import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Visitor {
  _id?: string;
  estimated_start_time: string;
  estimated_return_start_time: string;
  destination_point: object;
  start_point: object;
  email: string;
  phone: string;
  name: string;
  enquiryDate: string;
  status: string;
}

export interface VisitorByEmail {
  _id?: string;
  estimated_start_time?: string;
  estimated_return_start_time?: string;
  destination_point?: object;
  start_point?: object;
  email?: string;
  phone?: string;
  name?: string;
  enquiryDate?: string;
  status?: string;
  visitorEmail?:string 
}

export const visitorSlice = createApi({
  reducerPath: "visitor",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/visitor`,
  }),
  tagTypes: ["Visitor", "VisitorByEmail"],
  endpoints(builder) {
    return {
      getAllVisitors: builder.query<Visitor[], number | void>({
        query() {
          return "/getAllVisitors";
        },
        providesTags: ["Visitor"],
      }),
      addNewVisitor: builder.mutation<void, Visitor>({
        query(payload) {
          return {
            url: "/newVisitor",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Visitor"],
      }),
      getVisitorByEmail: builder.query<Visitor, string | void>({
        query: (visitorEmail) => ({
          url: `/getVisitorByEmail/${visitorEmail}`,
          method: "GET",
        }),
        providesTags: ["Visitor"],
      }),
      deleteVisitor: builder.mutation<void, Visitor>({
        query: (_id) => ({
          url: `/deleteVisitor/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Visitor"],
      }),
    };
  },
});

export const {
  useAddNewVisitorMutation,
  useGetAllVisitorsQuery,
  useDeleteVisitorMutation,
  useGetVisitorByEmailQuery
} = visitorSlice;
