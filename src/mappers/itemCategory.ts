import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI item category response
const PokeApiItemCategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    items: z.array(z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    })).optional(),
});

// Domain model for ItemCategory
export interface ItemCategoryModel {
    id?: string;
    name?: string;
    url?: string;
    items?: Array<{
        id?: string;
        name?: string;
        url?: string;
    }>;
}

/**
 * Maps raw PokeAPI item category data to our domain model with runtime validation
 */
export function mapItemCategory(input: unknown): ItemCategoryModel | null {
    try {
        const parsed = PokeApiItemCategorySchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since item category detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/item-category/${parsed.id}/` : undefined,
            items: parsed.items?.map(item => ({
                id: item.url ? parseId(item.url) : undefined,
                name: item.name,
                url: item.url,
            })),
        };
    } catch (error) {
        console.error('Failed to map item category:', error);
        return null;
    }
}

// Zod schema for PokeAPI item list response
const PokeApiItemListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url: z.string(),
    })),
});

export type PokeApiItemListResponse = z.infer<typeof PokeApiItemListSchema>;

/**
 * Maps and validates PokeAPI item list response
 */
export function mapItemList(input: unknown): PokeApiItemListResponse | null {
    try {
        return PokeApiItemListSchema.parse(input);
    } catch (error) {
        console.error('Failed to map item list:', error);
        return null;
    }
}
