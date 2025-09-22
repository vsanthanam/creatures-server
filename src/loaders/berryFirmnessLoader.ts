import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapBerryFirmness, BerryFirmnessModel } from '../mappers/berryFirmness.js';

/**
 * Creates a DataLoader for batching and caching BerryFirmness requests
 */
export function createBerryFirmnessLoader(client: PokeApiClient) {
    return new DataLoader<string, BerryFirmnessModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/berry-firmness/${encodeURIComponent(id)}/`);
                    return mapBerryFirmness(data);
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
