import { PokeApiClient } from './dist/src/datasources/pokeApiClient.js';
import { createItemLoader } from './dist/src/loaders/itemLoader.js';

async function test() {
    console.log('Testing item loading...');
    
    const client = new PokeApiClient();
    const itemLoader = createItemLoader(client);
    
    try {
        console.log('Testing direct API call...');
        const directResult = await client.get('/item/1/');
        console.log('Direct API result:', JSON.stringify(directResult, null, 2));
        
        console.log('\nTesting item loader...');
        const loaderResult = await itemLoader.load('1');
        console.log('Loader result:', JSON.stringify(loaderResult, null, 2));
        
    } catch (error) {
        console.error('Error:', error);
    }
}

test().then(() => process.exit(0)).catch(console.error);
