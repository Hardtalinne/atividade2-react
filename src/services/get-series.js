import { api } from "./api";

export const getSeries = async (id, value, offset) => {
  const { data, status } = await api.get(
    `series${id ? `/${id}` : ""}${value ? `?titleStartsWith=${value}&` : "?"}${
      offset ? `offset=${offset}&` : "offset=1&"}limit=100`
  );
  return status === 200 ? data.data : [];
};
