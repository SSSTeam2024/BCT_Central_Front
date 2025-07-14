import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FeedBack {
  _id?: string;
  driver_id?: string;
  student_id?: string;
  employee_id?: string;
  category?: string;
  quote_id?: string;
  description?: string;
  status?: string;
  answer?: string;
  image?: string;
  imageBase64?: string;
  imageExtension?: string;
  createdAt?: string;
}

export interface AnswerFeedBack {
  feedback_id?: string;
  answer?: string;
}

export const feedbackSlice = createApi({
  reducerPath: "feedback",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/feedback`,
  }),
  tagTypes: ["FeedBack"],
  endpoints(builder) {
    return {
      getAllFeedBacks: builder.query<FeedBack[], number | void>({
        query() {
          return "/get-all-feedbacks";
        },
        providesTags: ["FeedBack"],
      }),
      //   fetchJourneyById: builder.query<Journey, string | void>({
      //     query: (_id) => ({
      //       url: `/getJourneyById/${_id}`,
      //       method: "GET",
      //     }),
      //     providesTags: ["Journey"],
      //   }),
      updateFeedback: builder.mutation<void, AnswerFeedBack>({
        query: (payload) => ({
          url: `/answer-feedback`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: ["FeedBack"],
      }),
      //   deleteJourney: builder.mutation<void, Journey>({
      //     query: (_id) => ({
      //       url: `/deleteJouney/${_id}`,
      //       method: "Delete",
      //     }),
      //     invalidatesTags: ["Journey"],
      //   }),
    };
  },
});

export const {
  useGetAllFeedBacksQuery,
  useUpdateFeedbackMutation,
  //   useDeleteJourneyMutation,
  //   useFetchJourneyByIdQuery,
} = feedbackSlice;
