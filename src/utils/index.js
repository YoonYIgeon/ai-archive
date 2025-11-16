export const trimArray = (array) => {
  return array?.map((item) => item.trim()) || [];
};

export const parseSearchParamsToJson = (searchParams) => {
  const obj = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
};
