import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ModePrice {
  _id?: string;
  type: string;
}

export const modePriceSlice = createApi({
  reducerPath: "modePrice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/mode`,
  }),
  tagTypes: ["ModePrice"],
  endpoints(builder) {
    return {
      getAllModePrices: builder.query<ModePrice[], number | void>({
        query() {
          return "/getAllModes";
        },
        providesTags: ["ModePrice"],
      }),
      addNewModePrice: builder.mutation<void, ModePrice>({
        query(payload) {
          return {
            url: "/newMode",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["ModePrice"],
      }),
      updateModePrice: builder.mutation<void, ModePrice>({
        query: ({ _id, ...rest }) => ({
          url: `/updateMode/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["ModePrice"],
      }),
      deleteModePrice: builder.mutation<void, ModePrice>({
        query: (_id) => ({
          url: `/deleteMode/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["ModePrice"],
      }),
    };
  },
});

export const {
  useAddNewModePriceMutation,
  useDeleteModePriceMutation,
  useGetAllModePricesQuery,
  useUpdateModePriceMutation,
} = modePriceSlice;
