export function getMetaData(name: string): DOMStringMap | undefined {
  const meta = document.head.querySelector(`meta[name=${name}]`) as HTMLElement;
  if (!meta || !meta.dataset) {
    return;
  }
  return meta.dataset;
}
