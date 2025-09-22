/**
 * Parses a resource ID from a PokeAPI URL
 * @param url - The PokeAPI resource URL
 * @returns The resource ID or null if parsing fails
 */
export function parseResourceId(url: string): string | null {
    const match = url.match(/\/([a-z-]+)\/(\d+)\/?$/);
    return match ? match[2] : null;
}

/**
 * Converts snake_case keys to camelCase
 */
export function toCamelCase(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = value;
    }
    return result;
}

/**
 * Encodes an offset-based cursor for pagination
 */
export function encodeOffsetCursor(offset: number): string {
    return Buffer.from(JSON.stringify({ kind: "OFFSET", offset })).toString("base64");
}

/**
 * Decodes an offset-based cursor for pagination
 */
export function decodeOffsetCursor(cursor: string): number {
    try {
        const parsed = JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
        if (parsed.kind !== "OFFSET") {
            throw new Error("Invalid cursor kind");
        }
        return parsed.offset;
    } catch (error) {
        throw new Error("Invalid cursor");
    }
}
