import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GroupeEmployee {
  _id?: string;
  groupName: string;
  note: string;
  startPoint: string;
  dateStart: string;
  timeStart: string;
  Destination: string;
  dateEnd: string;
  timeEnd: string;
  status: string;
  passenger_number: string;
  id_company: string;
  luggage_details: string;
  vehicle_type: string;
  employees: string;
  program: string;
  unit_price: string;
}

export const groupEmployeeSlice = createApi({
  reducerPath: "groupeemployee",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/groupEmployee`,
  }),
  tagTypes: ["GroupeEmployee"],
  endpoints(builder) {
    return {
      getGroupsByProgramId: builder.mutation<GroupeEmployee[], string>({
        query: (programId) => ({
          url: `/getGroupsByIdProgram/${programId}`,
          method: "GET",
        }),
        invalidatesTags: ["GroupeEmployee"],
      }),
      addNewGroup: builder.mutation<void, GroupeEmployee>({
        query(payload) {
          return {
            url: "/addNewGroup_NoEditEmployees",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["GroupeEmployee"],
      }),
      deleteManyGroups: builder.mutation<GroupeEmployee, { ids: string[] }>({
        query({ ids }) {
          return {
            url: `delete-many`,
            method: "DELETE",
            body: { ids },
            headers: {
              Accept: "application/json", // Explicitly ask for JSON
            },
            responseHandler: (response) => response.text(), // Handle as text
          };
        },
        invalidatesTags: ["GroupeEmployee"],
      }),
    };
  },
});

export const {
  useGetGroupsByProgramIdMutation,
  useDeleteManyGroupsMutation,
  useAddNewGroupMutation,
} = groupEmployeeSlice;
