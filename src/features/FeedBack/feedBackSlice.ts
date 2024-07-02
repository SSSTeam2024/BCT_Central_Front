import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FeedBack {
  _id?: string;
  experience_satisfaction_scale?: string;
      booking_process?: string;
      most_enjoyed?: string;
      service_quality_scale?: string;
      choosen_reason?: string;
      trip_overall_rating?: string;
      website_navigation?: string;
      id_coorporate?: string;
      id_student?: string;
      id_parent?: string;
      id_visitor?: string;
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
          return "/getAllFeedbacks";
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
    //   addNewJourney: builder.mutation<void, Journey>({
    //     query(payload) {
    //       return {
    //         url: "/newJourney",
    //         method: "POST",
    //         body: payload,
    //       };
    //     },
    //     invalidatesTags: ["Journey"],
    //   }),
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
//   useAddNewJourneyMutation,
//   useDeleteJourneyMutation,
//   useFetchJourneyByIdQuery,
} = feedbackSlice;
