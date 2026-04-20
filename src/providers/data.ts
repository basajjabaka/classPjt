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

