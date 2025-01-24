import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Block1Model {
  _id?: string;
  image: {
    path: string;
    display: string;
  };
  page: string;
  image_base64: string;
  image_extension: string;
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  subTitle: {
    name: string;
    display: string;
  };
  tabs: {
    title: string;
    icon: string;
    content: string;
  }[];
}

export const block1Slice = createApi({
  reducerPath: "block1",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/services-block1-component/`,
  }),
  tagTypes: ["Block1Model"],
  endpoints(builder) {
    return {
      getBlock1s: builder.query<Block1Model[], number | void>({
        query() {
          return "/getBlock1";
        },
        providesTags: ["Block1Model"],
      }),
      updateBlock1: builder.mutation<void, Block1Model>({
        query: ({ _id, ...rest }) => ({
          url: `/updateBlock1/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Block1Model"],
      }),      
    };
  },
});

export const { useGetBlock1sQuery, useUpdateBlock1Mutation } =
block1Slice;
