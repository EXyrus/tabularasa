import type { ButtonProps } from 'antd';
import { Image } from 'antd';
import type { ReactNode } from 'react';
import download from 'assets/img/download.svg';
import { getCloudinaryImage } from 'helpers/image';
import UploadWidget from './UploadWidget';

type Props = {
    value?: string;
    onImageChange: (info: cloudinary.ResultInfoSuccess) => void;
    ButtonProps?: ButtonProps;
    editText?: string;
    uploadText?: string;
    children?: React.ReactNode;
    imageSx?: string;
    placeholder: ReactNode | string;
    uploadPreset: string;
    croppingAspectRatio?: number;
    maxFileSize?: number;
};

const ImageUpload = ({
    value,
    onImageChange,
    editText = 'Edit',
    uploadText = 'Upload',
    children,
    uploadPreset,
    croppingAspectRatio = 1.0,
    maxFileSize,

    ...props
}: Props) => {
    const imageSrc = value ? getCloudinaryImage(value) : download;

    return (
        <div className='center-align mb-5'>
            <Image
                style={{
                    width: 100,
                    height: 100
                }}
                preview={Boolean(value)}
                src={imageSrc as string}
                className='align-center m-1'
            />
            <UploadWidget
                file={value}
                onChange={onImageChange}
                clientAllowedFormats={['jpeg', 'jpg', 'png', 'svg']}
                croppingAspectRatio={croppingAspectRatio}
                minImageWidth={500}
                minImageHeight={500}
                croppingShowDimensions
                uploadPreset={uploadPreset}
                text={value ? editText : uploadText}
                maxFileSize={maxFileSize}
                ButtonProps={{
                    type: 'text',
                    size: 'small',
                    color: 'default',
                    ...props.ButtonProps
                }}
            />
            {children}
        </div>
    );
};

export default ImageUpload;
