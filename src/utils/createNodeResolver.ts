/**
 * Creates a generic node resolver for edges that need to hydrate their node data
 * Returns the full data or null - GraphQL will handle null bubbling for required fields
 */
export function createNodeResolver<T>(
    loadById: (id: string) => Promise<T | null>
) {
    return async (parent: { node: { id?: string } }) => {
        const id = parent?.node?.id;
        if (!id) {
            // If no ID, return null and let GraphQL handle the error
            return null;
        }
        
        const fullData = await loadById(id);
        // Return the full data or null - no fallbacks needed
        return fullData as any;
    };
}
