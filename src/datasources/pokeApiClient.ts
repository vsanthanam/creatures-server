export type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export class PokeApiClient {
    constructor(
        private baseUrl: string = 'https://pokeapi.co/api/v2',
        private fetcher: Fetcher = fetch
    ) {}

    async get<T>(path: string): Promise<T | null> {
        try {
            const url = `${this.baseUrl}${path}`;
            const response = await this.fetcher(url);
            if (!response.ok) {
                return null;
            }
            return response.json() as Promise<T>;
        } catch (error) {
            console.error('PokeApiClient error:', error);
            return null;
        }
    }

    async getList<T>(path: string, params?: Record<string, string | number>): Promise<T | null> {
        try {
            const url = new URL(`${this.baseUrl}${path}`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    url.searchParams.set(key, String(value));
                });
            }
            const response = await this.fetcher(url.toString());
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json() as Promise<T>;
        } catch (error) {
            console.error('PokeApiClient list error:', error);
            return null;
        }
    }
}
