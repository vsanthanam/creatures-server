import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI berry flavor response
const PokeApiBerryFlavorSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    berries: z.array(z.object({
        berry: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
        potency: z.number().optional(),
    })).optional(),
});

// Domain model for BerryFlavor
export interface BerryFlavorModel {
    id?: string;
    name?: string;
    url?: string;
    berries?: Array<{
        berry?: {
            id?: string;
            name?: string;
            url?: string;
        };
        potency?: number;
    }>;
}

// Domain model for BerryFlavorPresence (used in Berry.flavors)
export interface BerryFlavorPresenceModel {
    potency?: number;
    flavor?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI berry flavor data to our domain model with runtime validation
 */
export function mapBerryFlavor(input: unknown): BerryFlavorModel | null {
    try {
        const parsed = PokeApiBerryFlavorSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since berry flavor detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/berry-flavor/${parsed.id}/` : undefined,
            berries: parsed.berries?.map(berryEntry => ({
                berry: berryEntry.berry ? {
                    id: berryEntry.berry.url ? parseId(berryEntry.berry.url) : undefined,
                    name: berryEntry.berry.name,
                    url: berryEntry.berry.url,
                } : undefined,
                potency: berryEntry.potency,
            })),
        };
    } catch (error) {
        console.error('Failed to map berry flavor:', error);
        return null;
    }
}

/**
 * Maps a flavor presence entry from Berry API response
 */
export function mapBerryFlavorPresence(flavorEntry: unknown): BerryFlavorPresenceModel | null {
    try {
        const flavorSchema = z.object({
            flavor: z.object({
                name: z.string().optional(),
                url: z.string().optional(),
            }).optional(),
            potency: z.number().optional(),
        });
        
        const parsed = flavorSchema.parse(flavorEntry);
        return {
            potency: parsed.potency,
            flavor: parsed.flavor ? {
                id: parsed.flavor.url ? parseId(parsed.flavor.url) : undefined,
                name: parsed.flavor.name,
                url: parsed.flavor.url,
            } : undefined,
        };
    } catch (error) {
        console.error('Failed to map berry flavor presence:', error);
        return null;
    }
}
