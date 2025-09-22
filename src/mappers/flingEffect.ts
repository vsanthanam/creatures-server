import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI fling effect response
const PokeApiFlingEffectSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    effect_entries: z.array(z.object({
        effect: z.string().optional(),
        language: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
    })).optional(),
    items: z.array(z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    })).optional(),
});

// Domain model for FlingEffect
export interface FlingEffectModel {
    id?: string;
    name?: string;
    url?: string;
    effects?: Array<{
        effect?: string;
        language?: {
            id?: string;
            name?: string;
            url?: string;
        };
    }>;
    items?: Array<{
        id?: string;
        name?: string;
        url?: string;
    }>;
}

// Domain model for Effect
export interface EffectModel {
    effect?: string;
    language?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI fling effect data to our domain model with runtime validation
 */
export function mapFlingEffect(input: unknown): FlingEffectModel | null {
    try {
        const parsed = PokeApiFlingEffectSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since fling effect detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/item-fling-effect/${parsed.id}/` : undefined,
            effects: parsed.effect_entries?.map(effectEntry => ({
                effect: effectEntry.effect,
                language: effectEntry.language ? {
                    id: effectEntry.language.url ? parseId(effectEntry.language.url) : undefined,
                    name: effectEntry.language.name,
                    url: effectEntry.language.url,
                } : undefined,
            })),
            items: parsed.items?.map(item => ({
                id: item.url ? parseId(item.url) : undefined,
                name: item.name,
                url: item.url,
            })),
        };
    } catch (error) {
        console.error('Failed to map fling effect:', error);
        return null;
    }
}
