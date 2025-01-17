import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FooterListModel {
    _id?: string;
    name: string;
    items: {
      name: string;
      order: string;
      display: string;
      link:string
    }[];
    order: string;
    display: string
  }
  interface NewItem {
    _id?:string;
    name: string;
    display: string;
    order: string;
    link: string
  }
export const footerListSlice = createApi({
  reducerPath: "footerList",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/footer-list/`,
  }),
  tagTypes: ["FooterListModel"],
  endpoints(builder) {
    return {
        getFooterLists: builder.query<FooterListModel[], number | void>({
        query() {
          return "/getFooterLists";
        },
        providesTags: ["FooterListModel"],
      }),
      addNewFooterList: builder.mutation<void, FooterListModel>({
        query(payload) {
          return {
            url: "/createFooterList",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["FooterListModel"],
      }),
      addNewItemToFooterList: builder.mutation<void, NewItem & { footerListId: string }>({
        query(payload) {
          const { footerListId, ...itemData } = payload;
          return {
            url: `/footerList/${footerListId}/addItem`,
            method: "POST",
            body: itemData,
          };
        },
        invalidatesTags: ["FooterListModel"],
      }),
      
      updateFooterList: builder.mutation<void, FooterListModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateFooterList/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["FooterListModel"],
      }),
    //   deleteMenu: builder.mutation<void, FooterList>({
    //     query: (_id) => ({
    //       url: `/deleteMenu/${_id}`,
    //       method: "Delete",
    //     }),
    //     invalidatesTags: ["FooterList"],
    //   }),
    };
  },
});

export const {
  useGetFooterListsQuery,
  useAddNewFooterListMutation,
  useUpdateFooterListMutation,
  useAddNewItemToFooterListMutation
} = footerListSlice;
