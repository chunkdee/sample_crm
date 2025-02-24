import { createClient } from '@supabase/supabase-js';
import { AuthProvider, HttpError } from 'ra-core';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAuthProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw new HttpError(
                    'Authentication failed',
                    401,
                    { message: error.message }
                );
            }

            if (data?.user) {
                // Get user's role and permissions
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role, permissions')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching profile:', profileError);
                }

                // Store user data and permissions
                localStorage.setItem('user', JSON.stringify({
                    id: data.user.id,
                    email: data.user.email,
                    role: profile?.role || 'user',
                }));

                if (profile?.permissions) {
                    localStorage.setItem('permissions', JSON.stringify(profile.permissions));
                }

                return Promise.resolve();
            }

            return Promise.reject();
        } catch (error: any) {
            return Promise.reject(
                new HttpError(
                    'Authentication failed',
                    401,
                    { message: error.message }
                )
            );
        }
    },

    logout: async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }

            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            return Promise.resolve();
        } catch (error: any) {
            return Promise.reject(error);
        }
    },

    checkError: () => Promise.resolve(),

    checkAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session ? Promise.resolve() : Promise.reject();
    },

    getIdentity: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return Promise.reject('No user found');
        }

        // Get additional user profile data
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        return Promise.resolve({
            id: user.id,
            fullName: profile?.full_name || user.email,
            avatar: profile?.avatar_url,
            email: user.email,
        });
    },

    getPermissions: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return Promise.reject('No user found');
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('permissions')
            .eq('id', user.id)
            .single();

        return Promise.resolve(profile?.permissions || []);
    },

    // Implement canAccess from your existing authProvider
    async canAccess({ resource, action }) {
        const subject = resource.toLowerCase();
        const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
        if (!permissions) return false;

        const ability = createAbilityFromPermissions(permissions);
        return Promise.resolve(ability?.can(action, subject) ?? false);
    },
};