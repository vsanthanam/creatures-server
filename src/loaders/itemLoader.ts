import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapItem, ItemModel } from '../mappers/item.js';

/**
 * Creates a DataLoader for batching and caching Item requests
 */
export function createItemLoader(client: PokeApiClient) {
    return new DataLoader<string, ItemModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/item/${encodeURIComponent(id)}/`);
                    return mapItem(data);
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
