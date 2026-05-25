export interface ShareData {
  code: string;
  name: string;
}

export function encodeShare(data: ShareData): string {
  const json = JSON.stringify(data);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  return encoded;
}

export function decodeShare(hash: string): ShareData | null {
  try {
    const json = decodeURIComponent(escape(atob(hash)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function generateShareUrl(data: ShareData): string {
  const encoded = encodeShare(data);
  return `${window.location.origin}${window.location.pathname}?share=${encoded}`;
}

export async function copyShareUrl(data: ShareData): Promise<string> {
  const url = generateShareUrl(data);
  await navigator.clipboard.writeText(url);
  return url;
}
