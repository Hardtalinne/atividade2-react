import { api } from "./api";

export const getCharacters = async (id, value, offset) => {
  const { data, status } = await api.get(
    `characters${id ? `/${id}` : ""}${
      value ? `?nameStartsWith=${value}&` : "?"
    }${offset ? `offset=${offset}&` : "offset=1&"}limit=100`
  );
  return status === 200 ? data.data : [];
};
