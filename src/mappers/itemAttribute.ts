import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI item attribute response
const PokeApiItemAttributeSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    descriptions: z.array(z.object({
        description: z.string().optional(),
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

// Domain model for ItemAttribute
export interface ItemAttributeModel {
    id?: string;
    name?: string;
    url?: string;
    descriptions?: Array<{
        description?: string;
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

// Domain model for Description
export interface DescriptionModel {
    description?: string;
    language?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI item attribute data to our domain model with runtime validation
 */
export function mapItemAttribute(input: unknown): ItemAttributeModel | null {
    try {
        const parsed = PokeApiItemAttributeSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since item attribute detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/item-attribute/${parsed.id}/` : undefined,
            descriptions: parsed.descriptions?.map(desc => ({
                description: desc.description,
                language: desc.language ? {
                    id: desc.language.url ? parseId(desc.language.url) : undefined,
                    name: desc.language.name,
                    url: desc.language.url,
                } : undefined,
            })),
            items: parsed.items?.map(item => ({
                id: item.url ? parseId(item.url) : undefined,
                name: item.name,
                url: item.url,
            })),
        };
    } catch (error) {
        console.error('Failed to map item attribute:', error);
        return null;
    }
}
