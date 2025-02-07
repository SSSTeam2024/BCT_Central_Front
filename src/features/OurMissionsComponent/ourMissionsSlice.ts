import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OurMissionCollection {
  _id?: string;
  missions: {
    page: string,
    display?: string,
    littleTitle: {
      name: string,
      display: string
    };
    bigTitle: {
      name: string,
      display: string
    };
    content: string
  }[]
}

export const ourMissionSlice = createApi({
  reducerPath: "ourmission",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/our-mission-component`,
  }),
  tagTypes: ["OurMissionCollection"],
  endpoints(builder) {
    return {
      getAllOurMissions: builder.query<OurMissionCollection[], number | void>({
        query() {
          return "/getOurMissions";
        },
        providesTags: ["OurMissionCollection"],
      }),
      addNewOurMission: builder.mutation<void, OurMissionCollection>({
        query(payload) {
          return {
            url: "/createOurMission",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["OurMissionCollection"],
      }),
      deleteOurMission: builder.mutation<void, OurMissionCollection>({
        query: (_id) => ({
          url: `/deleteOurMission/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["OurMissionCollection"],
      }),
      updateOurMission: builder.mutation<void, OurMissionCollection>({
        query: ({ _id, missions }) => ({
          url: `/updateOurMission/${_id}`,
          method: "PATCH",
          body: { missions },
        }),
        invalidatesTags: ["OurMissionCollection"],
      }),
    };
  },
});

export const {
  useAddNewOurMissionMutation,
  useDeleteOurMissionMutation,
  useGetAllOurMissionsQuery,
  useUpdateOurMissionMutation
} = ourMissionSlice;
