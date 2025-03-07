const createObjectURLFromFile = async (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const objectURL = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => resolve(objectURL);
        image.onerror = err => {
            URL.revokeObjectURL(objectURL); // Cleanup
            reject(err);
        };
        image.src = objectURL;
    });

const dataURItoFile = (dataURI: string, filename: string): File => {
    // Split the data URI to get the data and MIME type
    const [mimeType, base64data] = dataURI.split(',');

    // Convert base64 to binary data
    const binaryString = atob(base64data);
    const byteNumbers: number[] = new Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        byteNumbers[i] = binaryString.charCodeAt(i);
    }
    const data = new Uint8Array(byteNumbers);

    // Create a Blob and then a File
    const blob = new Blob([data], { type: mimeType });

    return new File([blob], filename);
};

export const getFileUrl = async (
    selectedImageUrl: string,
    filename: string
): Promise<string> => {
    if (selectedImageUrl.startsWith('http')) {
        return selectedImageUrl;
    }

    if (selectedImageUrl.startsWith('data:')) {
        const file = dataURItoFile(selectedImageUrl, filename);

        return await createObjectURLFromFile(file);
    }

    throw new Error(
        'Invalid selectedImageUrl format. Provide a URL or data URI.'
    );
};
