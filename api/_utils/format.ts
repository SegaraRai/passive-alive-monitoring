export function formatText(formatter: string, object: any) {
  return formatter.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    let o = object;
    for (const k of key.split('.')) {
      if (!o || !o.hasOwnProperty(k)) {
        return 'undefined';
      }
      o = o[k];
    }
    return String(o);
  });
}
