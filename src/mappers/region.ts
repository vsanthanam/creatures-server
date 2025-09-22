import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI region response
const PokeApiRegionSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    names: z.array(z.object({
        name: z.string().optional(),
        language: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
    })).optional(),
    locations: z.array(z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    })).optional(),
});

// Domain model for Region
export interface RegionModel {
    id?: string;
    name?: string;
    url?: string;
    names?: Array<{
        name?: string;
        language?: {
            id?: string;
            name?: string;
            url?: string;
        };
    }>;
    locations?: Array<{
        id?: string;
        name?: string;
        url?: string;
    }>;
}

// Domain model for Name
export interface NameModel {
    name?: string;
    language?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI region data to our domain model with runtime validation
 */
export function mapRegion(input: unknown): RegionModel | null {
    try {
        const parsed = PokeApiRegionSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since region detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/region/${parsed.id}/` : undefined,
            names: parsed.names?.map(nameEntry => ({
                name: nameEntry.name,
                language: nameEntry.language ? {
                    id: nameEntry.language.url ? parseId(nameEntry.language.url) : undefined,
                    name: nameEntry.language.name,
                    url: nameEntry.language.url,
                } : undefined,
            })),
            locations: parsed.locations?.map(location => ({
                id: location.url ? parseId(location.url) : undefined,
                name: location.name,
                url: location.url,
            })),
        };
    } catch (error) {
        console.error('Failed to map region:', error);
        return null;
    }
}

// Zod schema for PokeAPI region list response
const PokeApiRegionListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url: z.string(),
    })),
});

export type PokeApiRegionListResponse = z.infer<typeof PokeApiRegionListSchema>;

/**
 * Maps and validates PokeAPI region list response
 */
export function mapRegionList(input: unknown): PokeApiRegionListResponse | null {
    try {
        return PokeApiRegionListSchema.parse(input);
    } catch (error) {
        console.error('Failed to map region list:', error);
        return null;
    }
}
