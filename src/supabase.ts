import { createClient } from '@supabase/supabase-js';
import { AuthProvider, HttpError } from 'ra-core';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

interface RegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
}

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
       // if (!permissions) return false;

        // const ability = createAbilityFromPermissions(permissions);
        // return Promise.resolve(ability?.can(action, subject) ?? false);
        return Promise.resolve(true); // Placeholder, replace with actual permission check
    },

    register: async ({ email, password, firstName, lastName, role = 'user' }: RegisterParams) => {
        try {
            // 1. Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        role: role
                    }
                }
            });

            if (authError) {
                throw new HttpError(
                    'Registration failed',
                    400,
                    { message: authError.message }
                );
            }

            if (!authData.user) {
                throw new HttpError(
                    'Registration failed',
                    400,
                    { message: 'User creation failed' }
                );
            }

            // 2. Create user profile with default permissions
            const defaultPermissions = [
                {
                    subject: 'profile',
                    actions: ['read', 'update'],
                    conditions: {
                        id: authData.user.id
                    }
                }
            ];

            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    first_name: firstName,
                    last_name: lastName,
                    role: role,
                    permissions: defaultPermissions,
                    is_active: true
                });

            if (profileError) {
                // Cleanup: delete auth user if profile creation fails
                await supabase.auth.admin.deleteUser(authData.user.id);
                throw new HttpError(
                    'Profile creation failed',
                    400,
                    { message: profileError.message }
                );
            }

            return Promise.resolve();
        } catch (error: any) {
            return Promise.reject(
                new HttpError(
                    'Registration failed',
                    400,
                    { message: error.message }
                )
            );
        }
    },
};