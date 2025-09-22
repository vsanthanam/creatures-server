import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapLanguage, LanguageModel } from '../mappers/language.js';

/**
 * Creates a DataLoader for batching and caching Language requests
 */
export function createLanguageLoader(client: PokeApiClient) {
    return new DataLoader<string, LanguageModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/language/${encodeURIComponent(id)}/`);
                    return mapLanguage(data);
                })
            );
            return results;
        },
        { 
            cache: true,
            maxBatchSize: 50
        }
    );
}
