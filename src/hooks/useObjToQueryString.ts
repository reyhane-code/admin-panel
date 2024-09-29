export const useObjToQueryString = (obj: {}): string => {
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== "" && value !== null
    )
  );

  // Convert all values to strings for URLSearchParams
  const stringifiedObj = Object.fromEntries(
    Object.entries(filteredObj).map(([key, value]) => [key, String(value)])
  );

  return new URLSearchParams(stringifiedObj).toString();
};
