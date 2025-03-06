
export interface FetchResponseError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
    status?: number;
}
