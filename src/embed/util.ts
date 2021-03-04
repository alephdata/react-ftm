export const fetchLocalData = (id: string) => {
  const storedData = localStorage.getItem(id);
  return storedData && JSON.parse(storedData);
}

export const setLocalData = (id: string, updated: any) => {
  if (!updated) { return; }
  const existing = fetchLocalData(id);

  const updatedData = JSON.stringify({
    entities: updated.entities || existing.entities,
    layout: updated.layout || existing.layout,
    viewport: updated.viewport || existing.viewport,
  })
  localStorage.setItem(id, updatedData);
}
