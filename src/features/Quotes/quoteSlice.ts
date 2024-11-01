import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Quote {
  _id?: string;
  passengers_number: number;
  journey_type: string;
  estimated_start_time?: string;
  estimated_return_start_time?: string;
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  start_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  quote_ref?: string;
  vehicle_type: string;
  id_visitor: string;
  school_id?: string;
  company_id?: string;
  id_affiliate?: string;
  id_affiliate_driver?: string;
  id_affiliate_vehicle?: string;
  id_group_employee?: {
    groupName?: string;
  };
  id_group_student?: {
    groupName?: string;
  };
  notes: string;
  createdAt?: Date;
  luggage_details: string;
  manual_cost: string;
  status: string;
  progress: string;
  balance: string;
  deposit?: string;
  id_driver: string;
  id_vehicle: string;
  total_price: string;
  deposit_percentage: string;
  automatic_cost: string;
  deposit_amount: string;
  category?: string;
  pushed_price?: string;
  date?: string;
  dropoff_date?: string;
  return_date?:string;
  return_time?: string;
  pickup_time?: string;
  mid_stations: {
    id: string;
    address: string;
    time: string;
  }[];
  white_list?: {
    name: string;
    phone: string;
    email: string;
    fleetNumber: string;
    vehicles: {
      type: string;
    }[];
  }[];
  type?: string;
  heard_of_us?: string;
  information?: string[]
}

export interface BookEmail {
  quote_id: string;
  id_visitor: string;
  price: number;
  automatic_cost: string;
  deposit_amount: string;
  deposit_percentage: string;
  total_price: string;
  type?: string;
  return_date?: string;
  return_time?: string;
}

export interface AssignDriver {
  quote_id: string;
  id_visitor: string;
  manual_cost: string;
  id_vehicle: string;
  id_driver: string;
}

export interface AssignDriverAndVehicleToQuoteInterface {
  quote_ID: string;
  vehicle_ID: string;
  driver_ID: string;
}

export interface AssignDriverToQuote {
  quote_id: string;
  id_driver: string;
}

export interface AssignVehicleToQuote {
  quote_id: string;
  id_vehicle: string;
}

export interface AssignAffiliateToQuote {
  idQuote: string;
  white_list: string[];
  pushedDate: string;
  pushed_price: string;
}

export interface SurveyAffiliates {
  id_Quote: string;
  white_list?: string[];
}

export interface AcceptAssignedAffiliate {
  idQuote: string;
  id_affiliate?: string;
}

export interface CancelQuote {
  quoteId: string;
  status: string;
}

export interface UpdateQuoteProgress {
  quote_id: string;
  progress: string;
}

export interface AddAffiliateToWhiteList {
  id_Quote: string;
  white_list?: string[];
}

export interface DeleteAffiliateFromWhiteList {
  QuoteID: string;
  whiteListe?: string[];
}

export interface DeleteWhiteList {
  Quote_ID: string;
}

export interface NewQuote {
  passengers_number: number;
  journey_type: string;
  estimated_start_time: string;
  estimated_return_start_time: string;
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  start_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  quote_ref?: string;
  vehicle_type: string;
  id_visitor: string;
  notes: string;
  luggage_details: string;
  manual_cost: string;
  status: string;
  progress: string;
  balance: string;
  deposit: string;
  total_price: string;
  deposit_percentage: string;
  automatic_cost: string;
  deposit_amount: string;
  category?: string;
  distance?: string;
  duration?: string;
  pushed_price?: string;
  date?: string;
  dropoff_date?: string;
  dropoff_time?: string;
  return_date?:string;
  return_time?: string;
  pickup_time?: string;
  type?: string;
  heard_of_us?: string;
}

export const quoteSlice = createApi({
  reducerPath: "quote",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/quote`,
  }),
  tagTypes: [
    "Quote",
    "BookEmail",
    "AssignDriver",
    "AssignVehicleToQuote",
    "AssignDriverToQuote",
    "CancelQuote",
    "ConvertTo",
    "AssignDriverAndVehicleToQuoteInterface",
    "AssignAffiliateToQuote",
    "SurveyAffiliates",
    "AcceptAssignedAffiliate",
    "AddAffiliateToWhiteList",
    "DeleteAffiliateFromWhiteList",
    "DeleteWhiteList",
    "UpdateQuoteProgress",
    "NewQuote"
  ],
  endpoints(builder) {
    return {
      getAllQuote: builder.query<Quote[], number | void>({
        query() {
          return "/getAllQuotes";
        },
        providesTags: ["Quote"],
      }),
      getQuoteById: builder.query<Quote, number | void | string>({
        query: (_id) => ({
          url: `/getQuoteById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Quote"],
      }),
      getQuotesByReference: builder.query<any[], number | void>({
        query: (_id) => ({
          url: `/allQuotesByReference/${_id}`,
          method: "GET",
        }),
        providesTags: ["Quote"],
      }),
      getQuoteByIdSchedule: builder.query<Quote[], { id_schedule: string }>({
        query: ({ id_schedule }) => ({
          url: `/getQuoteByIdSchedule`,
          method: "POST",
          body: { id_schedule: id_schedule },
        }),
        providesTags: ["Quote"],
      }),
      getAllQuotesByVisitorEmail: builder.query<Quote[], string>({
      query: (_id) =>({
          url: `/getAllQuotesByVisitorEmail/${_id}`,
          method: "GET",
      }),
      providesTags: ["Quote"],
    }),
    getAllQuotesBySchoolEmail: builder.query<Quote[], string>({
      query: (_id) =>({
          url: `/getAllQuotesBySchoolEmail/${_id}`,
          method: "GET",
      }),
      providesTags: ["Quote"],
    }),
    getAllQuotesByCompanyEmail: builder.query<Quote[], string>({
      query: (_id) =>({
          url: `/getAllQuotesByCompanyEmail/${_id}`,
          method: "GET",
      }),
      providesTags: ["Quote"],
    }),
      addSendBookEmail: builder.mutation<void, BookEmail>({
        query({
          id_visitor,
          price,
          quote_id,
          automatic_cost,
          deposit_amount,
          deposit_percentage,
          total_price,
          type,
          return_date,
      return_time
        }) {
          return {
            url: "/sendBookingEmail",
            method: "POST",
            body: {
              id_visitor,
              price,
              quote_id,
              automatic_cost,
              deposit_amount,
              deposit_percentage,
              total_price,
              type, 
              return_date,
      return_time
            },
          };
        },
        invalidatesTags: ["BookEmail"],
      }),
      addAssignDriver: builder.mutation<void, AssignDriver>({
        query({ quote_id, manual_cost, id_visitor, id_vehicle, id_driver }) {
          return {
            url: "/assignDriver",
            method: "POST",
            body: { quote_id, manual_cost, id_visitor, id_vehicle, id_driver },
          };
        },
        invalidatesTags: ["Quote", "AssignDriver"],
      }),
      createNewQuote: builder.mutation<void, NewQuote>({
        query(payload) {
          return {
            url: "/newQuote",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["NewQuote"],
      }),
      addDriverToQuote: builder.mutation<void, AssignDriverToQuote>({
        query({ quote_id, id_driver }) {
          return {
            url: "/assignDriverToQuote",
            method: "POST",
            body: { quote_id, id_driver },
          };
        },
        invalidatesTags: ["Quote", "AssignDriverToQuote"],
      }),
      updateStatusQuoteToCancel: builder.mutation<void, CancelQuote>({
        query({ quoteId, status }) {
          return {
            url: "/cancelQuote",
            method: "POST",
            body: { quoteId, status },
          };
        },
        invalidatesTags: ["Quote", "CancelQuote"],
      }),
      updateProgress: builder.mutation<void, UpdateQuoteProgress>({
        query({ quote_id, progress }) {
          return {
            url: "/updateProgress",
            method: "POST",
            body: { quote_id, progress },
          };
        },
        invalidatesTags: ["Quote", "UpdateQuoteProgress"],
      }),
      addVehicleToQuote: builder.mutation<void, AssignVehicleToQuote>({
        query({ quote_id, id_vehicle }) {
          return {
            url: "/assignVehicleToDriver",
            method: "POST",
            body: { quote_id, id_vehicle },
          };
        },
        invalidatesTags: ["Quote", "AssignVehicleToQuote"],
      }),
      addAffilaiteToQuote: builder.mutation<void, AssignAffiliateToQuote>({
        query({ idQuote, white_list, pushedDate, pushed_price }) {
          return {
            url: "/assignAffiliate",
            method: "POST",
            body: { idQuote, white_list, pushedDate, pushed_price },
          };
        },
        invalidatesTags: ["Quote", "AssignAffiliateToQuote"],
      }),
      surveyAffilaites: builder.mutation<void, SurveyAffiliates>({
        query({ id_Quote, white_list }) {
          return {
            url: "/surveyAffiliate",
            method: "POST",
            body: { id_Quote, white_list },
          };
        },
        invalidatesTags: ["Quote", "SurveyAffiliates"],
      }),
      addAffiliateToWhiteList: builder.mutation<void, AddAffiliateToWhiteList>({
        query({ id_Quote, white_list }) {
          return {
            url: "/addAffiliateToWhiteList",
            method: "POST",
            body: { id_Quote, white_list },
          };
        },
        invalidatesTags: ["Quote", "AddAffiliateToWhiteList"],
      }),
      deleteAffiliateFromWhiteList: builder.mutation<void, DeleteAffiliateFromWhiteList>({
        query({ QuoteID, whiteListe }) {
          return {
            url: "/deleteAffiliateToWhiteList",
            method: "POST",
            body: { QuoteID, whiteListe },
          };
        },
        invalidatesTags: ["Quote", "DeleteAffiliateFromWhiteList"],
      }),
      deleteWhiteList: builder.mutation<void, DeleteWhiteList>({
        query({ Quote_ID }) {
          return {
            url: "/deleteWhiteList",
            method: "POST",
            body: { Quote_ID },
          };
        },
        invalidatesTags: ["Quote", "DeleteWhiteList"],
      }),
      acceptAssignedAffilaite: builder.mutation<void, AcceptAssignedAffiliate>({
        query({ idQuote, id_affiliate }) {
          return {
            url: "/acceptAssignedAffiliate",
            method: "POST",
            body: { idQuote, id_affiliate },
          };
        },
        invalidatesTags: ["Quote", "AcceptAssignedAffiliate"],
      }),
      deleteQuote: builder.mutation<void, Quote>({
        query: (_id) => ({
          url: `/deleteQuote/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Quote"],
      }),
      assignDriverAndVehicleToQuote: builder.mutation<
        void,
        AssignDriverAndVehicleToQuoteInterface
      >({
        query({ quote_ID, vehicle_ID, driver_ID }) {
          return {
            url: "/assignDriverAndVehicleToQuote",
            method: "POST",
            body: { quote_ID, vehicle_ID, driver_ID },
          };
        },
        invalidatesTags: ["Quote", "AssignDriverAndVehicleToQuoteInterface"],
      }),
      addNotes: builder.mutation<void, { id_quote: string; information: { note: string; by: string, date: string, time: string } }>({
        query({ id_quote, information }) {
          return {
            url: `/updateQuoteInformation/${id_quote}`,
            method: 'PATCH',
            body: { information },
          };
        },
        invalidatesTags: ['Quote'],
      }),
      updateQuote: builder.mutation<void, Quote>({
        query: ({ _id, ...rest }) => ({
          url: `/updateQuote/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Quote"],
      }),
    };
  },
});

export const {
  useGetAllQuoteQuery,
  useAddSendBookEmailMutation,
  useAddAssignDriverMutation,
  useGetQuoteByIdQuery,
  useAddDriverToQuoteMutation,
  useAddVehicleToQuoteMutation,
  useUpdateStatusQuoteToCancelMutation,
  useGetQuoteByIdScheduleQuery,
  useDeleteQuoteMutation,
  useAssignDriverAndVehicleToQuoteMutation,
  useAddAffilaiteToQuoteMutation,
  useSurveyAffilaitesMutation,
  useAcceptAssignedAffilaiteMutation,
  useAddAffiliateToWhiteListMutation,
  useDeleteAffiliateFromWhiteListMutation,
  useDeleteWhiteListMutation,
  useGetQuotesByReferenceQuery,
  useGetAllQuotesByVisitorEmailQuery,
  useGetAllQuotesBySchoolEmailQuery,
  useGetAllQuotesByCompanyEmailQuery,
  useUpdateProgressMutation,
  useCreateNewQuoteMutation,
  useAddNotesMutation,
  useUpdateQuoteMutation
} = quoteSlice;
