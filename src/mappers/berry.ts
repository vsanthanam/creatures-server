import { z } from 'zod';

// Zod schema for PokeAPI berry response
const PokeApiBerrySchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    // Note: berry detail endpoint doesn't include a root-level url field
    growth_time: z.number().optional(),
    natural_gift_power: z.number().optional(),
    size: z.number().optional(),
    smoothness: z.number().optional(),
    soil_dryness: z.number().optional(),
    firmness: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    }).optional(),
    flavors: z.array(z.object({
        flavor: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
        potency: z.number().optional(),
    })).optional(),
    item: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    }).optional(),
});

// Domain model for Berry
export interface BerryModel {
    id?: string;
    name?: string;
    url?: string;
    growthTime?: number;
    naturalGiftPower?: number;
    size?: number;
    smoothness?: number;
    soilDryness?: number;
    firmness?: {
        id?: string;
        name?: string;
        url?: string;
    };
    flavors?: Array<{
        flavor?: {
            id?: string;
            name?: string;
            url?: string;
        };
        potency?: number;
    }>;
    item?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI berry data to our domain model with runtime validation
 * Returns partial data - GraphQL will handle null bubbling for required fields
 */
export function mapBerry(input: unknown): BerryModel | null {
    try {
        const parsed = PokeApiBerrySchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since berry detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/berry/${parsed.id}/` : undefined,
            growthTime: parsed.growth_time,
            naturalGiftPower: parsed.natural_gift_power,
            size: parsed.size,
            smoothness: parsed.smoothness,
            soilDryness: parsed.soil_dryness,
            firmness: parsed.firmness ? {
                id: parsed.firmness.url ? parseResourceId(parsed.firmness.url) : undefined,
                name: parsed.firmness.name,
                url: parsed.firmness.url,
            } : undefined,
            flavors: parsed.flavors?.map(flavorEntry => ({
                flavor: flavorEntry.flavor ? {
                    id: flavorEntry.flavor.url ? parseResourceId(flavorEntry.flavor.url) : undefined,
                    name: flavorEntry.flavor.name,
                    url: flavorEntry.flavor.url,
                } : undefined,
                potency: flavorEntry.potency,
            })),
            item: parsed.item ? {
                id: parsed.item.url ? parseResourceId(parsed.item.url) : undefined,
                name: parsed.item.name,
                url: parsed.item.url,
            } : undefined,
        };
    } catch (error) {
        console.error('Failed to map berry:', error);
        return null;
    }
}

function parseResourceId(url: string): string | undefined {
    const match = url.match(/\/([a-z-]+)\/(\d+)\/?$/);
    return match ? match[2] : undefined;
}

// Zod schema for PokeAPI list response
const PokeApiListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url: z.string(),
    })),
});

export type PokeApiListResponse = z.infer<typeof PokeApiListSchema>;

/**
 * Maps and validates PokeAPI list response
 */
export function mapBerryList(input: unknown): PokeApiListResponse | null {
    try {
        return PokeApiListSchema.parse(input);
    } catch (error) {
        console.error('Failed to map berry list:', error);
        return null;
    }
}
