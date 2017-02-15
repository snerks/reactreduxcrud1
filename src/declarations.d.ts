declare module 'react-router-dom';

// interface Window {
//     fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
// }
// declare var fetch: typeof window.fetch;

interface Window {
    fetch(url: any, init?: any): Promise<any>;
}

declare var fetch: typeof window.fetch;