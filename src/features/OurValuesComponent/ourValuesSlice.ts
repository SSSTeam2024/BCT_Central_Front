import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OurValuesModel {
  _id?: string;
  image: {
    path: string;
    display: string;
  };
  page: string;
  display?: string
  newImage?:string;
  image_base64?: string;
  image_extension?: string;
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  subTitle: {
    name: string;
    display: string;
  };
  tabs: {
    title: string;
    display: string;
    content: string;
    buttonLabel: string;
    buttonLink: string;
    buttonDisplay: string;
  }[];
  order?: string,
  typeComponent?: string
}

export const ourValuesSlice = createApi({
  reducerPath: "ourvalues",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/our-value-component/`,
  }),
  tagTypes: ["OurValuesModel"],
  endpoints(builder) {
    return {
      getOurValue: builder.query<OurValuesModel[], number | void>({
        query() {
          return "/getOurValue";
        },
        providesTags: ["OurValuesModel"],
      }),
      updateOurValues: builder.mutation<void, OurValuesModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateOurValue/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["OurValuesModel"],
      }),
      addTabToOurValue: builder.mutation<void, { _id: string; tabData: OurValuesModel["tabs"][0] }>({
        query: ({ _id, tabData }) => ({
          url: `/addTabToValue/${_id}`,
          method: "PUT",
          body: tabData, // If the API expects the tab data only, pass it here.
        }),
        invalidatesTags: ["OurValuesModel"],
      }),
      createOurValue: builder.mutation<void, OurValuesModel>({
                    query(payload) {
                      return {
                        url: "/createOurValue",
                        method: "POST",
                        body: payload,
                      };
                    },
                    invalidatesTags: ["OurValuesModel"],
                  }),
    };
  },
});

export const { useGetOurValueQuery, useUpdateOurValuesMutation, useAddTabToOurValueMutation, useCreateOurValueMutation } =
  ourValuesSlice;
