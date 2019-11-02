export function formatText(formatter: string, object: any) {
  return formatter.replace(/\{\{(.*?)\}\}/, (_, key) => {
    let o = object;
    for (const k of key.split('.')) {
      if (!o || !o.hasOwnProperty(k)) {
        return 'undefined';
      }
      o = object[k];
    }
    return String(o);
  });
}
