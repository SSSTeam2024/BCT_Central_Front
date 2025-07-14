import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Complain {
  _id?: string;
  id_school?: string;
  id_company?: string;
  id_student: string;
  id_parent: string;
  subject: string;
  description: string;
  complainDate: string;
  responseMessage: string;
  responseAuthor: string;
  responseDate: string;
  status: string;
  archived: string;
  pdf: string;
  photo: string;
  video: string;
  resPhoto: string;
  resVideo: string;
  createdAt?:string;
}

export const complainSlice = createApi({
  reducerPath: "complain",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/complains/`,
  }),
  tagTypes: ["Complain"],
  endpoints(builder) {
    return {
      getAllComplains: builder.query<Complain[], number | void>({
        query() {
          return "/getAllComplains";
        },
        providesTags: ["Complain"],
      }),
      updateComplainResponse: builder.mutation<void, Complain>({
          query:(payload)=> {
            return {
              url: "/response",
              method: "POST",
              body: payload,
            };
          },
          invalidatesTags: ["Complain"],
        }),
    };
  },
});

export const { useGetAllComplainsQuery, useUpdateComplainResponseMutation } = complainSlice;
