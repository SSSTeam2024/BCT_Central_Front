import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Programm {
  _id?: string;
  programDetails: {
    _id?: string;
    programName: string;
    origin_point: {
      placeName: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    stops: {
      id: string;
      address: {
        placeName: string;
        coordinates: {
          lat: number;
          lng: number;
        };
      },
      time: string;
    }[];
    destination_point: {
      placeName: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    pickUp_date: string;
    droppOff_date: string;
    freeDays_date: string[];
    exceptDays: string[];
    recommanded_capacity: string;
    extra: any[];
    notes: string;
    dropOff_time: string;
    pickUp_Time: string;
    school_id?: any;
    company_id?: any;
    luggage?: string;
    vehiculeType?: string;
    unit_price?: string;
    total_price?: string;
    journeyType?: string;
    program_status?: {
      status: string;
      date_status: string;
    }[];
    within_payment_days?: string;
    invoiceFrequency?: string;
    notes_for_client?: {
      msg: string;
      date: string;
      sender: string;
    }[];
    groups_creation_mode: string
  };
  groups: {
    type: string;
    groupCollection: {
      id_company?: string;
      passenger_number?: string;
      groupName: string;
      student_number?: string;
      id_school?: string;
      vehicle_type: string;
      luggage_details: string;
      program?: string;
    }[];
  };
}

export interface ProgrammGroups {
  _id?: string;
  programName: string;
  origin_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stops: {
    id: string;
    address: string;
    time: string;
  }[];
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  pickUp_date: string;
  droppOff_date: string;
  freeDays_date: string[];
  exceptDays: string[];
  recommanded_capacity: string;
  extra: string[];
  notes: string;
  dropOff_time: string;
  pickUp_Time: string;
  school_id?: string;
  company_id?: string;
  luggage?: string;
  vehiculeType?: string;
  unit_price?: string;
  total_price?: string;
  journeyType?: string;
  program_status?: {
    status: string;
    date_status: string;
  }[];
  within_payment_days?: string;
  invoiceFrequency?: string;
  notes_for_client?: {
    msg: string;
    date: string;
    sender: string;
  }[];
  tab_number?: string;
}

export interface FetchedGroup {
  groupName: string;
  id_school: string;
  luggage_details: string;
  program: string;
  student_number: string;
  students: Array<any>;
  unit_price: string;
  vehicle_type: any;
  _id: string;
  luggages?: Array<{ max_luggage: { description: string; _id: string } }>;
}

export interface SendResponse {
  id: string;
  notes_for_client: {
    msg: string;
    date: string;
    sender: string;
  }[];
  unit_price: string;
  total_price: string;
  program_status: {
    status: string;
    date_status: string;
  }[];
  invoiceFrequency: string;
  within_payment_days?: string;
}

export interface ConvertTo {
  idProgram: String;
}

export interface ConvertToQuote {
  id_schedule: String;
}

export interface UpdateStatus {
  id: string;
  status: string;
}

export const programmSlice = createApi({
  reducerPath: "programm",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/programm/`,
  }),
  tagTypes: [
    "Programm",
    "SendResponse",
    "ConvertTo",
    "ConvertToQuote",
    "UpdateStatus",
    "ProgrammGroups",
  ],
  endpoints(builder) {
    return {
      fetchProgramms: builder.query<ProgrammGroups[], number | void>({
        query() {
          return `/getAllProgramms`;
        },
        providesTags: ["Programm"],
      }),
      fetchStudentGroupsByProgramId: builder.mutation<FetchedGroup[], number | void>({
        query(id) {
          return {
            url: `/get-program-groups-students/${id}`,
            method: "GET",
          };
        },
        invalidatesTags: ["Programm"],
      }),
      fetchEmployeeGroupsByProgramId: builder.mutation<FetchedGroup[], number | void>({
        query(id) {
          return {
            url: `/get-program-groups-employees/${id}`,
            method: "GET",
          };
        },
        invalidatesTags: ["Programm"],
      }),
      fetchProgrammById: builder.query<Programm, string | void>({
        query: (_id) => ({
          url: `/getProgrammById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Programm"],
      }),
      addProgramm: builder.mutation<Programm, Programm>({
        query(payload) {
          return {
            url: "/newProgramm",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Programm"],
      }),
      updateProgram: builder.mutation({
        query: ({ id, updatedProgram }) => ({
          url: `/updateProgram/${id}`,
          method: 'PUT',
          body: updatedProgram,
        }),
      }),
      editProgram: builder.mutation({
        query: ({ id, updatedProgram }) => ({
          url: `/edit/${id}`,
          method: 'PUT',
          body: updatedProgram,
        }),
      }),
      sendResponse: builder.mutation<void, SendResponse>({
        query({
          id,
          notes_for_client,
          unit_price,
          total_price,
          program_status,
          invoiceFrequency,
          within_payment_days,
        }) {
          return {
            url: "/sendResponse",
            method: "POST",
            body: {
              id,
              notes_for_client,
              unit_price,
              total_price,
              program_status,
              invoiceFrequency,
              within_payment_days,
            },
          };
        },
        invalidatesTags: ["Programm", "SendResponse"],
      }),
      convertToContract: builder.mutation<void, ConvertTo>({
        query({ idProgram }) {
          return {
            url: "/toContract",
            method: "POST",
            body: {
              idProgram,
            },
          };
        },
        invalidatesTags: ["Programm", "ConvertTo"],
      }),
      convertToQuote: builder.mutation<void, ConvertToQuote>({
        query({ id_schedule }) {
          return {
            url: "/convertToQuote",
            method: "POST",
            body: {
              id_schedule,
            },
          };
        },
        invalidatesTags: ["Programm", "ConvertToQuote"],
      }),
      updateStatus: builder.mutation<void, UpdateStatus>({
        query({ id, status }) {
          return {
            url: "/statusToConverted",
            method: "POST",
            body: {
              id,
              status,
            },
          };
        },
        invalidatesTags: ["Programm", "UpdateStatus"],
      }),
      deleteProgram: builder.mutation<void, Programm>({
        query: (_id) => ({
          url: `/deleteProgram/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Programm"],
      }),
    };
  },
});

export const {
  useAddProgrammMutation,
  useFetchProgrammsQuery,
  useFetchProgrammByIdQuery,
  useSendResponseMutation,
  useConvertToContractMutation,
  useConvertToQuoteMutation,
  useDeleteProgramMutation,
  useUpdateStatusMutation,
  useUpdateProgramMutation,
  useFetchEmployeeGroupsByProgramIdMutation,
  useFetchStudentGroupsByProgramIdMutation,
  useEditProgramMutation
} = programmSlice;
