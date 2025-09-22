import DataLoader from 'dataloader';
import { PokeApiClient } from '../datasources/pokeApiClient.js';
import { mapItemCategory, ItemCategoryModel } from '../mappers/itemCategory.js';

/**
 * Creates a DataLoader for batching and caching ItemCategory requests
 */
export function createItemCategoryLoader(client: PokeApiClient) {
    return new DataLoader<string, ItemCategoryModel | null>(
        async (ids) => {
            const results = await Promise.all(
                ids.map(async (id) => {
                    const data = await client.get<any>(`/item-category/${encodeURIComponent(id)}/`);
                    return mapItemCategory(data);
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
