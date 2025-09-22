import { z } from 'zod';
import { parseResourceId as parseId } from '../utils/resource.js';

// Zod schema for PokeAPI language response
const PokeApiLanguageSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    official: z.boolean().optional(),
    iso639: z.string().optional(),
    iso3166: z.string().optional(),
    names: z.array(z.object({
        name: z.string().optional(),
        language: z.object({
            name: z.string().optional(),
            url: z.string().optional(),
        }).optional(),
    })).optional(),
});

// Domain model for Language
export interface LanguageModel {
    id?: string;
    name?: string;
    url?: string;
    official?: boolean;
    iso639?: string;
    iso3166?: string;
    names?: Array<{
        name?: string;
        language?: {
            id?: string;
            name?: string;
            url?: string;
        };
    }>;
}

// Domain model for LanguageName
export interface LanguageNameModel {
    name?: string;
    language?: {
        id?: string;
        name?: string;
        url?: string;
    };
}

/**
 * Maps raw PokeAPI language data to our domain model with runtime validation
 */
export function mapLanguage(input: unknown): LanguageModel | null {
    try {
        const parsed = PokeApiLanguageSchema.parse(input);
        return {
            id: parsed.id ? String(parsed.id) : undefined,
            name: parsed.name,
            // Generate URL since language detail endpoint doesn't provide it
            url: parsed.id ? `https://pokeapi.co/api/v2/language/${parsed.id}/` : undefined,
            official: parsed.official,
            iso639: parsed.iso639,
            iso3166: parsed.iso3166,
            names: parsed.names?.map(nameEntry => ({
                name: nameEntry.name,
                language: nameEntry.language ? {
                    id: nameEntry.language.url ? parseId(nameEntry.language.url) : undefined,
                    name: nameEntry.language.name,
                    url: nameEntry.language.url,
                } : undefined,
            })),
        };
    } catch (error) {
        console.error('Failed to map language:', error);
        return null;
    }
}
