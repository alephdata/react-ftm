export const fetchLocalData = (id: string) => {
  const storedData = localStorage.getItem(id);
  return storedData && JSON.parse(storedData);
}
