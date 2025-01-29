import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Notification {
  _id?: string;
  message: string;
  quote_id: string;
  typeNotif: string;
  lu: string;
  createdAt?: string
}

export interface UpdateNotification {
    _id: string;
    lu: string;
  }

export const notificationSlice = createApi({
  reducerPath: "notification",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/notifications`,
  }),
  tagTypes: ["Notification"],
  endpoints(builder) {
    return {
        getAllNotifications: builder.query<Notification[], number | void>({
        query() {
          return "/getAllNotifications";
        },
        providesTags: ["Notification"],
      }),
      updateNotification: builder.mutation<void, UpdateNotification>({
              query(payload) {
                return {
                  url: "/updateNotification",
                  method: "PATCH",
                  body: payload,
                };
              },
              invalidatesTags: ["Notification"],
            }),
    };
  },
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation
} = notificationSlice;
