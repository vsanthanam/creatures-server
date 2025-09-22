import { Resolvers } from './generated/graphql';
import { PokeApiClient } from './datasources/pokeApiClient.js';
import { createBerryLoader } from './loaders/berryLoader.js';
import { createBerryFirmnessLoader } from './loaders/berryFirmnessLoader.js';
import { createBerryFlavorLoader } from './loaders/berryFlavorLoader.js';
import { createItemLoader } from './loaders/itemLoader.js';
import { createItemCategoryLoader } from './loaders/itemCategoryLoader.js';
import { createItemAttributeLoader } from './loaders/itemAttributeLoader.js';
import { createLanguageLoader } from './loaders/languageLoader.js';
import { createFlingEffectLoader } from './loaders/flingEffectLoader.js';
import { createNodeResolver } from './utils/createNodeResolver.js';
import { mapBerryList } from './mappers/berry.js';
import { mapItemList } from './mappers/itemCategory.js';
import { parseResourceId, encodeOffsetCursor, decodeOffsetCursor } from './utils/resource.js';

// Initialize shared instances
const pokeApiClient = new PokeApiClient();
const berryLoader = createBerryLoader(pokeApiClient);
const berryFirmnessLoader = createBerryFirmnessLoader(pokeApiClient);
const berryFlavorLoader = createBerryFlavorLoader(pokeApiClient);
const itemLoader = createItemLoader(pokeApiClient);
const itemCategoryLoader = createItemCategoryLoader(pokeApiClient);
const itemAttributeLoader = createItemAttributeLoader(pokeApiClient);
const languageLoader = createLanguageLoader(pokeApiClient);
const flingEffectLoader = createFlingEffectLoader(pokeApiClient);

export const resolvers: Resolvers = {
    Query: {
        berry: async (_parent, { id }) => {
            return berryLoader.load(String(id)) as any;
        },
        berries: async (_parent, { first, after, last, before }) => {
            try {
                let offset = 0;

                if (after) {
                    offset = decodeOffsetCursor(after) + (first ?? 20);
                } else if (before) {
                    const beforeOffset = decodeOffsetCursor(before);
                    const count = last ?? first ?? 20;
                    offset = Math.max(0, beforeOffset - count);
                }

                const limit = first ?? last ?? 20;

                const data = await pokeApiClient.getList<any>('/berry/', {
                    limit,
                    offset
                });

                if (!data) {
                    return null;
                }

                const validatedData = mapBerryList(data);
                if (!validatedData) {
                    return null;
                }

                const edges = validatedData.results.map((r, idx) => {
                    const id = parseResourceId(r.url);
                    const absoluteIndex = offset + idx;
                    return {
                        node: { 
                            id: id || r.url,
                            name: r.name,
                            url: r.url,
                        },
                        cursor: encodeOffsetCursor(absoluteIndex),
                    };
                });

                const startOffset = offset;
                const endOffset = offset + edges.length - 1;

                return {
                    edges,
                    pageInfo: {
                        hasNextPage: Boolean(validatedData.next),
                        hasPreviousPage: Boolean(validatedData.previous),
                        startCursor: edges.length ? encodeOffsetCursor(startOffset) : null,
                        endCursor: edges.length ? encodeOffsetCursor(endOffset) : null,
                    },
                    totalCount: validatedData.count,
                };
            } catch (err) {
                console.error(err);
                return null;
            }
        },
        item: async (_parent, { id }) => {
            return itemLoader.load(String(id)) as any;
        },
        items: async (_parent, { first, after, last, before }) => {
            try {
                let offset = 0;

                if (after) {
                    offset = decodeOffsetCursor(after) + (first ?? 20);
                } else if (before) {
                    const beforeOffset = decodeOffsetCursor(before);
                    const count = last ?? first ?? 20;
                    offset = Math.max(0, beforeOffset - count);
                }

                const limit = first ?? last ?? 20;

                const data = await pokeApiClient.getList<any>('/item/', {
                    limit,
                    offset
                });

                if (!data) {
                    return null;
                }

                const validatedData = mapItemList(data);
                if (!validatedData) {
                    return null;
                }

                const edges = validatedData.results.map((r, idx) => {
                    const id = parseResourceId(r.url);
                    const absoluteIndex = offset + idx;
                    return {
                        node: { 
                            id: id, // Let GraphQL handle null IDs via error bubbling
                            name: r.name,
                            url: r.url,
                        },
                        cursor: encodeOffsetCursor(absoluteIndex),
                    };
                });

                const startOffset = offset;
                const endOffset = offset + edges.length - 1;

                return {
                    edges,
                    pageInfo: {
                        hasNextPage: Boolean(validatedData.next),
                        hasPreviousPage: Boolean(validatedData.previous),
                        startCursor: edges.length ? encodeOffsetCursor(startOffset) : null,
                        endCursor: edges.length ? encodeOffsetCursor(endOffset) : null,
                    },
                    totalCount: validatedData.count,
                };
            } catch (err) {
                console.error(err);
                return null;
            }
        }
    },
    BerriesEdge: {
        node: createNodeResolver((id) => berryLoader.load(id))
    },
    Berry: {
        firmness: async (parent) => {
            const firmnessData = (parent as any)?.firmness;
            if (!firmnessData?.id) {
                return null;
            }
            return berryFirmnessLoader.load(String(firmnessData.id)) as any;
        },
        flavors: async (parent) => {
            // The flavors are already in the parent data from the berry mapper
            const flavors = (parent as any)?.flavors;
            if (!flavors || !Array.isArray(flavors)) {
                return [];
            }
            return flavors as any;
        },
        cost: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return null;
            }
            const item = await itemLoader.load(String(itemData.id));
            return item?.cost ?? null;
        },
        flingPower: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return null;
            }
            const item = await itemLoader.load(String(itemData.id));
            return item?.flingPower ?? null;
        },
        category: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return null;
            }
            const item = await itemLoader.load(String(itemData.id));
            if (!item?.category?.id) {
                return null;
            }
            return itemCategoryLoader.load(String(item.category.id)) as any;
        },
        flingEffect: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return null;
            }
            const item = await itemLoader.load(String(itemData.id));
            if (!item?.flingEffect?.id) {
                return null;
            }
            return flingEffectLoader.load(String(item.flingEffect.id)) as any;
        },
        attributes: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return [];
            }
            const item = await itemLoader.load(String(itemData.id));
            const attributes = item?.attributes;
            if (!attributes || !Array.isArray(attributes)) {
                return [];
            }
            
            // Extract IDs and load full attribute data using the attribute loader
            const attributeIds = attributes
                .map((attr: any) => attr.id)
                .filter((id: any) => id != null);
            
            if (attributeIds.length === 0) {
                return [];
            }
            
            const loadedAttributes = await itemAttributeLoader.loadMany(attributeIds);
            return loadedAttributes.filter(attr => attr != null) as any;
        },
        effects: async (parent) => {
            const itemData = (parent as any)?.item;
            if (!itemData?.id) {
                return [];
            }
            const item = await itemLoader.load(String(itemData.id));
            const effects = item?.effects;
            if (!effects || !Array.isArray(effects)) {
                return [];
            }
            return effects as any;
        }
    },
    BerryFirmness: {
        berries: async (parent) => {
            // The parent contains the berries array from the API response
            const berries = (parent as any)?.berries;
            if (!berries || !Array.isArray(berries)) {
                return [];
            }
            
            // Extract IDs and load full berry data using the berry loader
            const berryIds = berries
                .map((berry: any) => berry.id)
                .filter((id: any) => id != null);
            
            if (berryIds.length === 0) {
                return [];
            }
            
            const loadedBerries = await berryLoader.loadMany(berryIds);
            return loadedBerries.filter(berry => berry != null) as any;
        }
    },
    BerryFlavorPresence: {
        flavor: async (parent) => {
            const flavorData = (parent as any)?.flavor;
            if (!flavorData?.id) {
                return null;
            }
            return berryFlavorLoader.load(String(flavorData.id)) as any;
        }
    },
    ItemsEdge: {
        node: createNodeResolver((id) => itemLoader.load(id))
    },
    ItemCategory: {
        items: async (parent) => {
            // The parent contains the items array from the API response
            const items = (parent as any)?.items;
            if (!items || !Array.isArray(items)) {
                return [];
            }
            
            // Extract IDs and load full item data using the item loader
            const itemIds = items
                .map((item: any) => item.id)
                .filter((id: any) => id != null);
            
            if (itemIds.length === 0) {
                return [];
            }
            
            const loadedItems = await itemLoader.loadMany(itemIds);
            return loadedItems.filter(item => item != null) as any;
        }
    },
    GenericItem: {
        category: async (parent) => {
            const categoryData = (parent as any)?.category;
            if (!categoryData?.id) {
                return null;
            }
            return itemCategoryLoader.load(String(categoryData.id)) as any;
        },
        flingEffect: async (parent) => {
            const flingEffectData = (parent as any)?.flingEffect;
            if (!flingEffectData?.id) {
                return null;
            }
            return flingEffectLoader.load(String(flingEffectData.id)) as any;
        },
        attributes: async (parent) => {
            const attributes = (parent as any)?.attributes;
            if (!attributes || !Array.isArray(attributes)) {
                return [];
            }
            
            // Extract IDs and load full attribute data using the attribute loader
            const attributeIds = attributes
                .map((attr: any) => attr.id)
                .filter((id: any) => id != null);
            
            if (attributeIds.length === 0) {
                return [];
            }
            
            const loadedAttributes = await itemAttributeLoader.loadMany(attributeIds);
            return loadedAttributes.filter(attr => attr != null) as any;
        },
        effects: async (parent) => {
            const effects = (parent as any)?.effects;
            if (!effects || !Array.isArray(effects)) {
                return [];
            }
            return effects as any;
        }
    },
    Item: {
        __resolveType: (obj: any) => {
            // Check if this item is a berry by looking for berry-specific fields
            // or by checking if the item name ends with "-berry"
            const name = obj.name || '';
            if (name.endsWith('-berry')) {
                return 'Berry';
            }
            // Default to GenericItem for all other items
            return 'GenericItem';
        }
    },
    Language: {
        names: async (parent) => {
            // Names are already in the parent data from the language mapper
            const names = (parent as any)?.names;
            if (!names || !Array.isArray(names)) {
                return [];
            }
            return names as any;
        }
    },
    LanguageName: {
        language: async (parent) => {
            const languageData = (parent as any)?.language;
            if (!languageData?.id) {
                return null;
            }
            return languageLoader.load(String(languageData.id)) as any;
        }
    },
    Effect: {
        language: async (parent) => {
            const languageData = (parent as any)?.language;
            if (!languageData?.id) {
                return null;
            }
            return languageLoader.load(String(languageData.id)) as any;
        }
    },
    FlingEffect: {
        effects: async (parent) => {
            // Effects are already in the parent data from the fling effect mapper
            const effects = (parent as any)?.effects;
            if (!effects || !Array.isArray(effects)) {
                return [];
            }
            return effects as any;
        },
        items: async (parent) => {
            // The parent contains the items array from the API response
            const items = (parent as any)?.items;
            if (!items || !Array.isArray(items)) {
                return [];
            }
            
            // Extract IDs and load full item data using the item loader
            const itemIds = items
                .map((item: any) => item.id)
                .filter((id: any) => id != null);
            
            if (itemIds.length === 0) {
                return [];
            }
            
            const loadedItems = await itemLoader.loadMany(itemIds);
            return loadedItems.filter(item => item != null) as any;
        }
    },
    ItemAttribute: {
        descriptions: async (parent) => {
            // Descriptions are already in the parent data from the attribute mapper
            const descriptions = (parent as any)?.descriptions;
            if (!descriptions || !Array.isArray(descriptions)) {
                return [];
            }
            return descriptions as any;
        },
        items: async (parent) => {
            // The parent contains the items array from the API response
            const items = (parent as any)?.items;
            if (!items || !Array.isArray(items)) {
                return [];
            }
            
            // Extract IDs and load full item data using the item loader
            const itemIds = items
                .map((item: any) => item.id)
                .filter((id: any) => id != null);
            
            if (itemIds.length === 0) {
                return [];
            }
            
            const loadedItems = await itemLoader.loadMany(itemIds);
            return loadedItems.filter(item => item != null) as any;
        }
    },
    Description: {
        language: async (parent) => {
            const languageData = (parent as any)?.language;
            if (!languageData?.id) {
                return null;
            }
            return languageLoader.load(String(languageData.id)) as any;
        }
    },
    VerboseEffect: {
        language: async (parent) => {
            const languageData = (parent as any)?.language;
            if (!languageData?.id) {
                return null;
            }
            return languageLoader.load(String(languageData.id)) as any;
        }
    }
}
