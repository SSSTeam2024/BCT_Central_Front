import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Team {
  _id?: string;
  firstName: string;
  lastName: string;
  birth_date: string;
  nationality: string;
  gender: string;
  login: string;
  address: string;
  password: string;
  marital_status: string;
  number_of_childs: string;
  legal_card: string;
  id_card_date: string;
  email: string;
  phone: string;
  service_date: string;
  statusTeam: string;
  id_file: string;
  access_level: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  sort_code: string;
  contract_type: string;
  salary: string;
  IdFileBase64String: string;
  IdFileExtension: string;
  avatar: string;
  avatarBase64String: string;
  avatarExtension: string;
}

export const teamSlice = createApi({
  reducerPath: "team",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/team`,
  }),
  tagTypes: ["Team"],
  endpoints(builder) {
    return {
      getAllTeam: builder.query<Team[], number | void>({
        query() {
          return "/getAllTeams";
        },
        providesTags: ["Team"],
      }),
      addNewTeam: builder.mutation<void, Team>({
        query(payload) {
          return {
            url: "/registerTeam",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Team"],
      }),
      deleteTeam: builder.mutation<void, Team>({
        query: (_id) => ({
          url: `/deleteTeam/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Team"],
      }),
    };
  },
});

export const {
  useAddNewTeamMutation,
  useGetAllTeamQuery,
  useDeleteTeamMutation,
} = teamSlice;
