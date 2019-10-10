export function serializeLastUpdate(lastUpdate: number): string {
  return lastUpdate.toString();
}


export function deserializeLastUpdate(strLastUpdate: string | null): number | null {
  if (!strLastUpdate) {
    return null;
  }
  const lastUpdate = parseInt(strLastUpdate, 10);
  if (isNaN(lastUpdate)) {
    return null;
  }
  return lastUpdate;
}
