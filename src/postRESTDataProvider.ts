import postgrestRestProvider from '@raphiniert/ra-data-postgrest';
import { supabase } from './supabase';

const apiUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

const httpClient = async (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { data: { session } } = await supabase.auth.getSession();
    
    options.headers.set('apikey', supabaseKey);
    options.headers.set('Authorization', `Bearer ${session?.access_token}`);
    
    return fetch(url, options);
};

const postRESTDataProvider = postgrestRestProvider(apiUrl, httpClient);

// Add custom methods if needed
const dataProvider = {
    ...postRESTDataProvider,
    // Example of a custom method:
    // getMany: (resource, params) => {
    //     // Custom implementation
    // }
};

export default dataProvider;