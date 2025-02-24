import { createClient } from '@supabase/supabase-js';
import sampleData from '../datagenerator/generateSampleData2';

const supabaseUrl = 'http://localhost:8000';
const supabaseKey = 'your-anon-key';

async function seedDatabase() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Create tables first
    const createTables = async () => {
      // Users table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'users',
        schema: `
          id UUID PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT UNIQUE,
          phone TEXT,
          role TEXT,
          is_active BOOLEAN,
          profile_image TEXT,
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Companies table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'companies',
        schema: `
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
        table_name: 'contacts',
        schema: `
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
        table_name: 'opportunities',
        schema: `
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

      // Opportunity_Contacts (junction table for many-to-many relationship)
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'opportunity_contacts',
        schema: `
          opportunity_id UUID REFERENCES opportunities(id),
          contact_id UUID REFERENCES contacts(id),
          PRIMARY KEY (opportunity_id, contact_id)
        `
      });

      // Leads table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'leads',
        schema: `
          id UUID PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          company TEXT,
          status TEXT,
          source TEXT,
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Activities table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'activities',
        schema: `
          id UUID PRIMARY KEY,
          type TEXT,
          subject TEXT,
          description TEXT,
          due_date TIMESTAMPTZ,
          status TEXT,
          opportunity_id UUID REFERENCES opportunities(id),
          contact_id UUID REFERENCES contacts(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Notes table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'notes',
        schema: `
          id UUID PRIMARY KEY,
          content TEXT,
          opportunity_id UUID REFERENCES opportunities(id),
          contact_id UUID REFERENCES contacts(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Tasks table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'tasks',
        schema: `
          id UUID PRIMARY KEY,
          title TEXT,
          description TEXT,
          due_date TIMESTAMPTZ,
          status TEXT,
          priority TEXT,
          opportunity_id UUID REFERENCES opportunities(id),
          contact_id UUID REFERENCES contacts(id),
          assigned_to UUID REFERENCES users(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });

      // Reports table
      await supabase.rpc('create_table_if_not_exists', {
        table_name: 'reports',
        schema: `
          id UUID PRIMARY KEY,
          name TEXT,
          type TEXT,
          parameters JSONB,
          created_by UUID REFERENCES users(id),
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
        `
      });
    };

    await createTables();

    // Insert sample data
    const { users, companies, contacts, opportunities, leads, activities, notes, tasks, reports } = sampleData;

    // Insert data in correct order (respecting foreign keys)
    await supabase.from('users').insert(users);
    await supabase.from('companies').insert(companies);
    await supabase.from('contacts').insert(contacts);
    await supabase.from('opportunities').insert(opportunities);

    // After inserting opportunities
    const opportunityContacts = opportunities.flatMap(opportunity => 
      opportunity.contacts?.map(contact => ({
        opportunity_id: opportunity.id,
        contact_id: contact.id
      })) || []
    );

    await supabase.from('opportunity_contacts').insert(opportunityContacts);

    await supabase.from('leads').insert(leads);
    await supabase.from('activities').insert(activities);
    await supabase.from('notes').insert(notes);
    await supabase.from('tasks').insert(tasks);
    await supabase.from('reports').insert(reports);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();