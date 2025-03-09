import config from '@/config';

export default function extractSubdomain(url: string): string {
  // Localhost or IP address check
  if (
    url === 'localhost' ||
    url.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
  ) {
    return '';
  }

  // Extract hostname from full URL if needed
  if (url.startsWith('http')) {
    try {
      url = new URL(url).hostname;
    } catch (e) {
      console.error('Invalid URL format:', url);
      return '';
    }
  }

  // Split domain parts
  const parts = url.split('.');

  // Check if we have a subdomain
  if (parts.length <= 2) {
    return ''; // No subdomain
  }

  // Handle www explicitly
  if (parts[0] === 'www') {
    return parts.length > 3 ? parts[1] : '';
  }

  // Get the base domain
  const baseDomainParts = config.API_HOST.split('.');
  const baseDomain = baseDomainParts.slice(-2).join('.');

  // If the URL doesn't end with our base domain, it's likely a development environment
  if (!url.endsWith(baseDomain)) {
    return parts[0];
  }

  // Otherwise, the first part is our subdomain
  return parts[0];
}
