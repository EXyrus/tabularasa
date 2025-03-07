export interface FetchPayload<
    Data extends object = object,
    Params extends object = object,
    UrlParams = undefined
> {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    options?: {
        data?: Data;
        params?: Params;
    };
    urlParams?: UrlParams;
    withPage?: boolean;
    loginType?: 'Social' | 'Auto' | 'SmartLock' | 'Manual';
    meta?: object;
}
