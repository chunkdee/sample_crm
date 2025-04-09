import { createClient } from '@supabase/supabase-js';
import sampleData from '../datagenerator/generateSampleData2';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000';
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
if (!serviceRoleKey) {
  throw new Error('VITE_SUPABASE_SERVICE_ROLE_KEY is required but not found in environment variables');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
    db: { schema: 'octocrm' }
});

const supabase1 = createClient(supabaseUrl, supabaseAnon);



async function seedDatabase() {

  const { data: todos, error } = await supabase.from('my_table').select('*')
  try {
    const createTables = async () => {
      // Users table (Supabase Auth Users)

      
      // await supabase.rpc('create_table_if_not_exists', {
      //   tbl_name: 'users',
      //  schema_definition: `
      //     id UUID PRIMARY KEY,
      //     email TEXT UNIQUE,
      //     phone TEXT,
      //     confirmed_at TIMESTAMPTZ,
      //     email_confirmed_at TIMESTAMPTZ,
      //     phone_confirmed_at TIMESTAMPTZ,
      //     last_sign_in_at TIMESTAMPTZ,
      //     role TEXT,
      //     aud TEXT,
      //     created_at TIMESTAMPTZ,
      //     updated_at TIMESTAMPTZ
      //   `
      // });

      // Profiles table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.profiles',
       schema_definition: `
          id UUID PRIMARY KEY REFERENCES auth.users(id),
          first_name TEXT,
          last_name TEXT,
          role TEXT CHECK (role IN ('Admin', 'Sales', 'Support', 'Manager')),
          is_active BOOLEAN DEFAULT true,
          profile_image TEXT,
          permissions JSONB DEFAULT '[]',
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Companies table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.companies',
       schema_definition: `
          id UUID PRIMARY KEY,
          name TEXT,
          industry TEXT,
          website TEXT,
          phone TEXT,
          address TEXT,
          city TEXT,
          state TEXT,
          postal_code TEXT,
          country TEXT,
          logo TEXT,
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Contacts table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.contacts',
       schema_definition: `
          id UUID PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          position TEXT,
          profile_image TEXT,
          company_id UUID REFERENCES companies(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Opportunities table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.opportunities',
       schema_definition: `
          id UUID PRIMARY KEY,
          name TEXT,
          amount DECIMAL,
          stage TEXT,
          probability INTEGER,
          description TEXT,
          close_date TIMESTAMPTZ,
          company_id UUID REFERENCES companies(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Leads table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.leads',
       schema_definition: `
          id UUID PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          company TEXT,
          profile_image TEXT,
          status TEXT CHECK (status IN ('New', 'Contacted', 'Qualified', 'Lost')),
          source TEXT CHECK (source IN ('Web', 'Referral', 'Advertisement')),
          assigned_to_id UUID REFERENCES profiles(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Activities table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.activities',
       schema_definition: `
          id UUID PRIMARY KEY,
          type TEXT CHECK (type IN ('Call', 'Email', 'Meeting', 'Task')),
          description TEXT,
          due_date TIMESTAMPTZ,
          completed BOOLEAN DEFAULT false,
          profile_id UUID REFERENCES profiles(id),
          contact_id UUID REFERENCES contacts(id),
          company_id UUID REFERENCES companies(id),
          opportunity_id UUID REFERENCES opportunities(id),
          lead_id UUID REFERENCES leads(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Notes table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.notes',
       schema_definition: `
          id UUID PRIMARY KEY,
          content TEXT,
          profile_id UUID REFERENCES profiles(id),
          contact_id UUID REFERENCES contacts(id),
          company_id UUID REFERENCES companies(id),
          opportunity_id UUID REFERENCES opportunities(id),
          lead_id UUID REFERENCES leads(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Tasks table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.tasks',
       schema_definition: `
          id UUID PRIMARY KEY,
          title TEXT,
          description TEXT,
          due_date TIMESTAMPTZ,
          completed BOOLEAN DEFAULT false,
          priority TEXT,
          profile_id UUID REFERENCES profiles(id),
          contact_id UUID REFERENCES contacts(id),
          company_id UUID REFERENCES companies(id),
          opportunity_id UUID REFERENCES opportunities(id),
          lead_id UUID REFERENCES leads(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Reports table
      await supabase.rpc('create_table_if_not_exists', {
        tbl_name: 'octocrm.reports',
       schema_definition: `
          id UUID PRIMARY KEY,
          name TEXT,
          type TEXT CHECK (type IN ('Sales', 'Support', 'Marketing')),
          generated_by_profile_id UUID REFERENCES profiles(id),
          generated_on TIMESTAMPTZ,
          content TEXT,
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });
    };

    await createTables();
    console.log('Tables created successfully!');

    // Insert sample data with service role permissions
    const { users, profiles, companies, contacts, opportunities, leads, activities, notes, tasks, reports } = sampleData;

    console.log('Starting data insertion...');

    // Insert data in correct order (respecting foreign keys)
    const insertions = [
    
      { table: 'octocrm.profiles', data: profiles },
      { table: 'octocrm.companies', data: companies },
      { table: 'octocrm.contacts', data: contacts },
      { table: 'octocrm.opportunities', data: opportunities },
      { table: 'octocrm.leads', data: leads },
      { table: 'octocrm.activities', data: activities },
      { table: 'octocrm.notes', data: notes },
      { table: 'octocrm.tasks', data: tasks },
      { table: 'octocrm.reports', data: reports }
    ];

    for (const { table, data } of insertions) {
      console.log(`Inserting ${table}...`);
      const { error } = await supabase.from(table).insert(data);
      if (error) {
        throw new Error(`Error inserting ${table}: ${error.message}`);
      }
      console.log(`${table} inserted successfully!`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

export default seedDatabase;