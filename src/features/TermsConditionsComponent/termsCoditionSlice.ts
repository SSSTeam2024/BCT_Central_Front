import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TermConditionModel {
  _id?: string;
  page: string,
  bigTitle: {
    content: string,
    display: string,
  },
  paragraph: {
    content: string,
    display: string,
  },
  display: string,
}

export const termConditionSlice = createApi({
  reducerPath: "termcondition",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/terms-condition`,
  }),
  tagTypes: ["TermConditionModel"],
  endpoints(builder) {
    return {
        getTermsConditions: builder.query<TermConditionModel[], number | void>({
        query() {
          return "/getTermsCondition";
        },
        providesTags: ["TermConditionModel"],
      }),
      addNewTermCondition: builder.mutation<void, TermConditionModel>({
              query(payload) {
                return {
                  url: "/createTermsConditions",
                  method: "POST",
                  body: payload,
                };
              },
              invalidatesTags: ["TermConditionModel"],
            }),
      updateTermCondition: builder.mutation<void, TermConditionModel>({
              query: ({ _id, ...rest }) => ({
                url: `/updateTermsCondition/${_id}`,
                method: "PATCH",
                body: rest,
              }),
              invalidatesTags: ["TermConditionModel"],
            }),
    };
  },
});

export const { useGetTermsConditionsQuery, useUpdateTermConditionMutation, useAddNewTermConditionMutation } = termConditionSlice;
