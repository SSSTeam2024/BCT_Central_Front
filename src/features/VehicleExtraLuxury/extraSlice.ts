import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Extra {
  _id?: string;
  name: string;
}

export const extraSlice = createApi({
  reducerPath: "extra",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/vehicleExtraLuxurys`,
  }),
  tagTypes: ["Extra"],
  endpoints(builder) {
    return {
      getAllExtras: builder.query<Extra[], number | void>({
        query() {
          return "/getAllLuxuries";
        },
        providesTags: ["Extra"],
      }),
      addNewExtra: builder.mutation<void, Extra>({
        query(payload) {
          return {
            url: "/newLuxury",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Extra"],
      }),
    };
  },
});

export const { useAddNewExtraMutation, useGetAllExtrasQuery } = extraSlice;
