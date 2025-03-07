import config from '@/config';
// import type { User } from 'types';
import { gravatarUrl } from './url';

export const getCloudinaryImage = (file: string) => {
    if (file) {
        return `//${config.CDN_PREFIX}/c_crop,g_custom/${file}`;
    }

    return getPlaceholderImage(file);
};

export const getUserImage = (image: string, email: string, size = 40) => {
    if (image) {
        return getCloudinaryImage(image);
    }

    return gravatarUrl(email, {
        size
    });
};

export const getPlaceholderImage = (fileName: string) => {
    return `https://placehold.co/400x400?text=${fileName}`;
};
