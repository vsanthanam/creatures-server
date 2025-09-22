import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI berry firmness response
const PokeApiBerryFirmnessSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    berries: z.array(z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    })).optional(),
});

// Domain model for BerryFirmness
export interface BerryFirmnessModel {
    id?: string;
    name?: string;
    url?: string;
    berries?: Array<{
        id?: string;
        name?: string;
        url?: string;
    }>;
}

/**
 * Maps raw PokeAPI berry firmness data to our domain model with runtime validation
 * Returns partial data - GraphQL will handle null bubbling for required fields
 */
export function mapBerryFirmness(input: unknown): BerryFirmnessModel | null {
    try {
        const parsed = PokeApiBerryFirmnessSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since berry firmness detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/berry-firmness/${parsed.id}/` : undefined,
            berries: parsed.berries?.map(berry => ({
                id: berry.url ? parseId(berry.url) : undefined,
                name: berry.name,
                url: berry.url,
            })),
        };
    } catch (error) {
        console.error('Failed to map berry firmness:', error);
        return null;
    }
}

