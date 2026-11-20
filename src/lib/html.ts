export function stripHtml(html: string): string {
  return (
    new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() ?? ''
  );
}
