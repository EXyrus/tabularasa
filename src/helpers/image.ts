
import config from '@/config';

/**
 * Converts a relative image path to a full CDN URL
 * @param path - Relative path to the image
 * @returns Full CDN URL to the image
 */
export function getImageUrl(path: string): string {
  // If the path is already a full URL, return it
  if (path.startsWith('http')) {
    return path;
  }

  // If the path is relative, prefix it with the CDN URL
  return `${config.CDN_PREFIX || ''}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Returns a placeholder image URL when the actual image is not available
 * @returns Placeholder image URL
 */
export function getPlaceholderImageUrl(): string {
  return '/placeholder.svg';
}
