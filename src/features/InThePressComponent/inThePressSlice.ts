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
  }[]
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
    //   addNewIcon: builder.mutation<void, IconModel>({
    //     query(payload) {
    //       return {
    //         url: "/createIcon",
    //         method: "POST",
    //         body: payload,
    //       };
    //     },
    //     invalidatesTags: ["IconModel"],
    //   }),
    };
  },
});

export const {
  useGetAllInThePressQuery,
} = inThePressSlice;
