import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OnTheRoadModel {
    _id?: string;
    page: string;
    bigTitle?: string;
    paragraph?: string;
    grids: {
        date: string;
        category: string;
        image: string;
        title: string;
        details: string;
        image_base64?: string;
  image_extension?: string;
  newImage?: string;
    }[];
    display?: string,
  order?: string,
  typeComponent?: string,
  }
  
export const onTheRoadSlice = createApi({
  reducerPath: "ontheroad",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/on-the-road-component/`,
  }),
  tagTypes: ["OnTheRoadModel"],
  endpoints(builder) {
    return {
        getAllOnTheRoad: builder.query<OnTheRoadModel[], number | void>({
        query() {
          return "/getOnTheRoads";
        },
        providesTags: ["OnTheRoadModel"],
      }),
      addOnTheRoad: builder.mutation<void, OnTheRoadModel>({
                    query(payload) {
                      return {
                        url: "/createOnTheRoad",
                        method: "POST",
                        body: payload,
                      };
                    },
                    invalidatesTags: ["OnTheRoadModel"],
                  }),
      updateOnTheRoad: builder.mutation<void, OnTheRoadModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateOnTheRoad/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["OnTheRoadModel"],
      }),
    };
  },
});

export const {
  useGetAllOnTheRoadQuery,
  useUpdateOnTheRoadMutation,
  useAddOnTheRoadMutation
} = onTheRoadSlice;
