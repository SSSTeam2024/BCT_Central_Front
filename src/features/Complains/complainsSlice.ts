import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Complain {
  _id?: string;
  id_corporate: string;
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
     
    };
  },
});

export const {
  useGetAllComplainsQuery,
} = complainSlice;
