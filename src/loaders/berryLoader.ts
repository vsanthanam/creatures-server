import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapBerry, BerryModel } from '../mappers/berry.js';

/**
 * Creates a DataLoader for batching and caching Berry requests
 */
export function createBerryLoader(client: PokeApiClient) {
    return new DataLoader<string, BerryModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/berry/${encodeURIComponent(id)}/`);
                    return mapBerry(data);
                })
            );
            return results;
        },
        { 
            cache: true,
            maxBatchSize: 50 // Reasonable limit for parallel requests
        }
    );
}
