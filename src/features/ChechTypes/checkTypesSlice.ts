import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CheckType {
  _id?: string;
  type: {
    category: string;
    message: string;
    checkType_images: string;
  }[];
  duration: string;
}

export const checkTypesSlice = createApi({
  reducerPath: "checkType",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/duty-check`,
  }),
  tagTypes: ["CheckType"],
  endpoints(builder) {
    return {
      getAllCheckTypes: builder.query<CheckType[], number | void>({
        query() {
          return "/get-all-duty-checks";
        },
        providesTags: ["CheckType"],
      }),
      addNewCheckType: builder.mutation<void, CheckType>({
        query(payload) {
          return {
            url: "/create-duty-checks",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["CheckType"],
      }),
      deleteCheckType: builder.mutation<void, CheckType>({
        query: (_id) => ({
          url: `/delete-duty-check/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["CheckType"],
      }),
    };
  },
});

export const {
  useAddNewCheckTypeMutation,
  useDeleteCheckTypeMutation,
  useGetAllCheckTypesQuery,
} = checkTypesSlice;
