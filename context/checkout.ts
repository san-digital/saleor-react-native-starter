

export const handleErrors = (response: any) => {
  if (response[0]) {
    throw new Error(response[0].code + " - \n " + response[0].message);
  }
  (response)
};
