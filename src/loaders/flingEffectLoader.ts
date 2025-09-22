import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapFlingEffect, FlingEffectModel } from '../mappers/flingEffect.js';

/**
 * Creates a DataLoader for batching and caching FlingEffect requests
 */
export function createFlingEffectLoader(client: PokeApiClient) {
    return new DataLoader<string, FlingEffectModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/item-fling-effect/${encodeURIComponent(id)}/`);
                    return mapFlingEffect(data);
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
