import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapItemAttribute, ItemAttributeModel } from '../mappers/itemAttribute.js';

/**
 * Creates a DataLoader for batching and caching ItemAttribute requests
 */
export function createItemAttributeLoader(client: PokeApiClient) {
    return new DataLoader<string, ItemAttributeModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/item-attribute/${encodeURIComponent(id)}/`);
                    return mapItemAttribute(data);
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
