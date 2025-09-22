import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapRegion, RegionModel } from '../mappers/region.js';

/**
 * Creates a DataLoader for batching and caching Region requests
 */
export function createRegionLoader(client: PokeApiClient) {
    return new DataLoader<string, RegionModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/region/${encodeURIComponent(id)}/`);
                    return mapRegion(data);
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
