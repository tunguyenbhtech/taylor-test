declare module 'parse-link-header' {
    export interface LinkInfo {
        page: string;
        per_page: string;
        rel: string;
        url: string;
        [x: string]: string;
    }

    export default function(
        txt: string | null,
    ): {
        next?: LinkInfo;
        prev?: LinkInfo;
        last?: LinkInfo;
    };
}
