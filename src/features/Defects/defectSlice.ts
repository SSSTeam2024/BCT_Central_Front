import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Defect {
  _id?: string;
  vehicle: string,
  time: string,
  level: string,
  issue: string,
  defectStatus: string,
  note: string,
  date:string
}

export const defectSlice = createApi({
  reducerPath: "defect",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/defects/`,
  }),
  tagTypes: ["Defect"],
  endpoints(builder) {
    return {
      getAllDefects: builder.query<Defect[], number | void>({
        query() {
          return "/getDefects";
        },
        providesTags: ["Defect"],
      }),
    //   getLocation: builder.query<Defect, string | void>({
    //     query: (_id) => ({
    //       url: `/getLocationById/${_id}`,
    //       method: "GET",
    //     }),
    //     providesTags: ["Defect"],
    //   }),
      addNewDefect: builder.mutation<void, Defect>({
        query(payload) {
          return {
            url: "/newDefect",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Defect"],
      }),
      deleteDefect: builder.mutation<void, Defect>({
        query: (_id) => ({
          url: `/deleteDefect/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Defect"],
      }),
    };
  },
});

export const {
  useAddNewDefectMutation,
  useGetAllDefectsQuery,
useDeleteDefectMutation
//   useGetLocationQuery,
} = defectSlice;
