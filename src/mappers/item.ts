import { z } from 'zod';
import { parseResourceId } from '../utils/resource.js';

// Zod schema for PokeAPI item response
const PokeApiItemSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    cost: z.number().optional(),
    fling_power: z.number().optional().nullable(),
    category: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    }).optional().nullable(),
    fling_effect: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    }).optional().nullable(),
    attributes: z.array(z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    })).optional(),
    effect_entries: z.array(z.object({
        effect: z.string().optional(),
        short_effect: z.string().optional(),
        language: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
    })).optional(),
    // Add other item fields as needed in the future
});

// Domain model for Item (focusing on Item interface fields)
export interface ItemModel {
    id?: string;
    name?: string;
    url?: string;
    cost?: number;
    flingPower?: number;
    category?: {
        id?: string;
        name?: string;
        url?: string;
    };
    flingEffect?: {
        id?: string;
        name?: string;
        url?: string;
    };
    attributes?: Array<{
        id?: string;
        name?: string;
        url?: string;
    }>;
    effects?: Array<{
        effect?: string;
        shortEffect?: string;
        language?: {
            id?: string;
            name?: string;
            url?: string;
        };
    }>;
}

/**
 * Maps raw PokeAPI item data to our domain model with runtime validation
 */
export function mapItem(input: unknown): ItemModel | null {
    try {
        const parsed = PokeApiItemSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since item detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/item/${parsed.id}/` : undefined,
            cost: parsed.cost,
            flingPower: parsed.fling_power ?? undefined,
            category: parsed.category ? {
                id: parsed.category.url ? parseResourceId(parsed.category.url) : undefined,
                name: parsed.category.name,
                url: parsed.category.url,
            } : undefined,
            flingEffect: parsed.fling_effect ? {
                id: parsed.fling_effect.url ? parseResourceId(parsed.fling_effect.url) : undefined,
                name: parsed.fling_effect.name,
                url: parsed.fling_effect.url,
            } : undefined,
            attributes: parsed.attributes?.map(attr => ({
                id: attr.url ? parseResourceId(attr.url) : undefined,
                name: attr.name,
                url: attr.url,
            })),
            effects: parsed.effect_entries?.map(effectEntry => ({
                effect: effectEntry.effect,
                shortEffect: effectEntry.short_effect,
                language: effectEntry.language ? {
                    id: effectEntry.language.url ? parseResourceId(effectEntry.language.url) : undefined,
                    name: effectEntry.language.name,
                    url: effectEntry.language.url,
                } : undefined,
            })),
        };
    } catch (error) {
        console.error('Failed to map item:', error);
        return null;
    }
}
