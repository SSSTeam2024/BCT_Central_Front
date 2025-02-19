import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface InThePressModel {
  _id?: string;
  page: string;
  paragraph: string;
  title: string;
  news: {
    title: string,
    date: string,
    by: string,
    content: string,
    image: string,
    display: string
  }[];
  display?: string;
  order?: string;
  typeComponent?:string;
  newImage?: string
}

export const inThePressSlice = createApi({
  reducerPath: "inThePress",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/in-the-press-component`,
  }),
  tagTypes: ["InThePressModel"],
  endpoints(builder) {
    return {
      getAllInThePress: builder.query<InThePressModel[], number | void>({
        query() {
          return "/getAllInThePresss";
        },
        providesTags: ["InThePressModel"],
      }),
      addNewInThePress: builder.mutation<void, InThePressModel>({
        query(payload) {
          return {
            url: "/newInThePress",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["InThePressModel"],
      }),
      updateInThePress: builder.mutation<void, InThePressModel>({
              query: ({ _id, ...rest }) => ({
                url: `/updateInThePress/${_id}`,
                method: "PATCH",
                body: rest,
              }),
              invalidatesTags: ["InThePressModel"],
            }),
    };
  },
});

export const {
  useGetAllInThePressQuery,
  useAddNewInThePressMutation,
  useUpdateInThePressMutation
} = inThePressSlice;
