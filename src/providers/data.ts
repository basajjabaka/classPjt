import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
import {BACKEND_BASE_URL} from "@/constants";
import {ListResponse} from "@/types";

if (!BACKEND_BASE_URL) throw new Error("BACKEND_BASE_URL is not defined");

const options: CreateDataProviderOptions = {
  getList: {
      getEndpoint: ({ resource }) => resource,

      buildQueryParams: async ({resource, pagination, filters}) => {
          const page = pagination?.currentPage ?? 1;
          const pageSize = pagination?.pageSize ?? 10;

          const params: Record<string, string|number> = {page, limit: pageSize}

          filters?.forEach((filter)=> {
              const field = 'field' in filter ? filter.field : ''

              const value = String(filter.value)

              if(resource === 'subjects') {
                  if (field === 'department') params.department = value;
                  if (field === 'name' || field === 'code') params.search = value;
              }
          })

          return params;
      },

      mapResponse: async (response) => {
        const payload: ListResponse = await response.clone().json()

        return payload.data ?? [];
      },
      getTotalCount: async (response) => {
          const payload: ListResponse = await response.clone().json()

          return payload.pagination?. total ?? payload.data?.length ?? 0;
      }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options)

export { dataProvider}
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { MOCK_SUBJECTS } from "./mock-subjects";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource, pagination }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") return { data: [] as TData[], total: 0 };

    const all = MOCK_SUBJECTS as unknown as TData[];
    const total = all.length;

    // simple server-side pagination support
    const pageSize = (pagination as any)?.pageSize ?? total;
    const current = (pagination as any)?.current ?? (pagination as any)?.page ?? 1;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;

    const data = all.slice(start, end);

    return {
      data,
      total,
    };
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({ resource, id }: any) => {
    if (resource !== "subjects") throw new Error("Resource not found");
    const item = MOCK_SUBJECTS.find((s) => String(s.id) === String(id));
    if (!item) throw new Error("Record not found");
    return { data: item as unknown as TData };
  },

  create: async () => {
    throw new Error("Not implemented in mock data provider");
  },
  update: async () => {
    throw new Error("Not implemented in mock data provider");
  },
  deleteOne: async () => {
    throw new Error("Not implemented in mock data provider");
  },

  getApiUrl: () => "",
};

