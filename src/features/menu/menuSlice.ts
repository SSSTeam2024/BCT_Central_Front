import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MenuModel {
    _id?: string;
    menuName: string;
    items: {
      label: string;
      link: string;
      order: number;
      target: string;
      display: boolean;
      subItems: {
        label: string;
        link: string;
        order: number;
        target: string;
        display: boolean;
      }[];
    }[];
  }
  
  interface AddNewItemPayload {
    menuId: string;
    newItem: {
      label: string;
      link: string;
      order: number;
      target: string;
      display: boolean;
    };
  }

  interface AddSubItemPayload {
    menuId: string;
    itemId: string;
    subItem: {
      label: string;
      link: string;
      order: number;
      target: string;
      display: boolean;
    };
  }

export const menuSlice = createApi({
  reducerPath: "menu",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/menu/`,
  }),
  tagTypes: ["MenuModel"],
  endpoints(builder) {
    return {
      getMenus: builder.query<MenuModel[], number | void>({
        query() {
          return "/getMenus";
        },
        providesTags: ["MenuModel"],
      }),
      addNewItem: builder.mutation<void, AddNewItemPayload>({
        query(payload) {
          return {
            url: "/addMenuItem",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["MenuModel"],
      }),
      addSubItemToItem: builder.mutation<void, AddSubItemPayload>({
        query(payload) {
          return {
            url: `/${payload.menuId}/items/${payload.itemId}/subitems`,
            method: "POST",
            body: payload.subItem,
          };
        },
        invalidatesTags: ["MenuModel"],
      }),
      updateMenu: builder.mutation<void, MenuModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateMenu/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["MenuModel"],
      }),
      deleteMenu: builder.mutation<void, MenuModel>({
        query: (_id) => ({
          url: `/deleteMenu/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["MenuModel"],
      }),
    };
  },
});

export const {
  useGetMenusQuery,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
  useAddNewItemMutation,
  useAddSubItemToItemMutation
} = menuSlice;
