import config from '@/config';

export const getImageUrl = (path: string): string => {
  if (!path) return '/placeholder.svg';
  
  // If path is already a full URL, return it
  if (path.startsWith('http')) {
    return path;
  }
  
  // Otherwise, construct URL with the appropriate prefix
  return `${path}`;
};

export const getAvatarPlaceholder = (name: string): string => {
  if (!name) return '/placeholder.svg';
  
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128&bold=true&length=2&font-size=0.33`;
};

export const uploadImage = async (file: File, preset: string): Promise<string> => {
  // Mock implementation
  console.log('Would upload file:', file.name, 'with preset:', preset);
  return URL.createObjectURL(file);
};
