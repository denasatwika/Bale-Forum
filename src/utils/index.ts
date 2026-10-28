export function postedAt(date: string): string {
  const diffInSeconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return 'baru saja';
}

export function toPlainText(html: string): string {
  const withLineBreaks = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div)>/gi, '\n');
  const doc = new DOMParser().parseFromString(withLineBreaks, 'text/html');
  return (doc.body.textContent || '').trim();
}

export function getExcerpt(html: string, maxLength = 160): string {
  const text = toPlainText(html).replace(/\s+/g, ' ');
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
}

export function getCategoryLabel(category: string): string {
  return category.trim() ? category.trim().toLowerCase() : 'umum';
}