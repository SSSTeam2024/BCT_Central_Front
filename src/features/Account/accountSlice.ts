import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";

export interface UserResponse {
  //results: Account;
  central: {
    _id?: string;
    name: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    activity: string;
    address: string;
    status: string;
    legal_status: string;
    account_name: string;
    sort_code: number;
    account_number: number;
    bank_name: string;
    id_creation_date: string;
    id_file: string;
    api_token: string;
  };
}
export interface Account {
  accessToken: string;
  central: {
    _id?: string;
    name: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    activity: string;
    address: string;
    status: string;
    legal_status: string;
    account_name: string;
    sort_code: number;
    account_number: number;
    bank_name: string;
    id_creation_date: string;
    id_file: string;
  };
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const accountSlice = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/authCentralApp/`,   // ${process.env.REACT_APP_BASE_URL}
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth?.central?.api_token!;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account"],
  endpoints(builder) {
    return {
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/loginCentralApp",
          method: "POST",
          body: credentials,
        }),
      }),
    };
  },
});

export const { useLoginMutation } = accountSlice;
