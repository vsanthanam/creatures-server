import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapBerryFlavor, BerryFlavorModel } from '../mappers/berryFlavor.js';

/**
 * Creates a DataLoader for batching and caching BerryFlavor requests
 */
export function createBerryFlavorLoader(client: PokeApiClient) {
    return new DataLoader<string, BerryFlavorModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/berry-flavor/${encodeURIComponent(id)}/`);
                    return mapBerryFlavor(data);
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
