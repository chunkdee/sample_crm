// generateSampleData.ts

import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import {
  User,
  Company,
  Contact,
  Opportunity,
  Lead,
  Activity,
  Note,
  Task,
  Report,
} from './types/crmTypes'; // Adjust the import path as needed

// Helper function to generate a random date within the last year
function getRandomDate(): Date {
  const now = new Date();
  const past = new Date(now);
  past.setFullYear(now.getFullYear() - 1);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

// Generate sample users
function generateUsers(count: number): User[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: faker.helpers.arrayElement(['Admin', 'Sales', 'Support', 'Manager']),
    isActive: faker.datatype.boolean(),
    profileImage: faker.image.avatar(),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample companies
function generateCompanies(count: number): Company[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: faker.company.name(),
    industry: faker.company.buzzNoun(),
    website: faker.internet.url(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    logo: faker.image.urlLoremFlickr({ category: 'business' }),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample contacts
function generateContacts(count: number, companies: Company[]): Contact[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profileImage: faker.image.avatar(),
    companyId: String(faker.helpers.arrayElement(companies).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample opportunities
function generateOpportunities(count: number, companies: Company[], contacts: Contact[]): Opportunity[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: faker.company.buzzPhrase(),
    amount: parseFloat(faker.finance.amount()),
    stage: faker.helpers.arrayElement(['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']),
    closeDate: getRandomDate(),
    companyId: String(faker.helpers.arrayElement(companies).id),
    contactId: String(faker.helpers.arrayElement(contacts).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample leads
function generateLeads(count: number, users: User[]): Lead[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    profileImage: faker.image.avatar(),
    status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Lost']),
    source: faker.helpers.arrayElement(['Web', 'Referral', 'Advertisement']),
    assignedToId: String(faker.helpers.arrayElement(users).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample activities
function generateActivities(count: number, users: User[], contacts: Contact[], companies: Company[], opportunities: Opportunity[], leads: Lead[]): Activity[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    type: faker.helpers.arrayElement(['Call', 'Email', 'Meeting', 'Task']),
    description: faker.lorem.sentence(),
    dueDate: getRandomDate(),
    completed: faker.datatype.boolean(),
    userId: String(faker.helpers.arrayElement(users).id),
    contactId: String(faker.helpers.arrayElement(contacts).id),
    companyId: String(faker.helpers.arrayElement(companies).id),
    opportunityId: String(faker.helpers.arrayElement(opportunities).id),
    leadId: String(faker.helpers.arrayElement(leads).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample notes
function generateNotes(count: number, users: User[], contacts: Contact[], companies: Company[], opportunities: Opportunity[], leads: Lead[]): Note[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    content: faker.lorem.paragraph(),
    userId: String(faker.helpers.arrayElement(users).id),
    contactId: String(faker.helpers.arrayElement(contacts).id),
    companyId: String(faker.helpers.arrayElement(companies).id),
    opportunityId: String(faker.helpers.arrayElement(opportunities).id),
    leadId: String(faker.helpers.arrayElement(leads).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample tasks
function generateTasks(count: number, users: User[], contacts: Contact[], companies: Company[], opportunities: Opportunity[], leads: Lead[]): Task[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    dueDate: getRandomDate(),
    completed: faker.datatype.boolean(),
    userId: String(faker.helpers.arrayElement(users).id),
    contactId: String(faker.helpers.arrayElement(contacts).id),
    companyId: String(faker.helpers.arrayElement(companies).id),
    opportunityId: String(faker.helpers.arrayElement(opportunities).id),
    leadId: String(faker.helpers.arrayElement(leads).id),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Generate sample reports
function generateReports(count: number, users: User[]): Report[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: faker.lorem.words(),
    type: faker.helpers.arrayElement(['Sales', 'Support', 'Marketing']),
    generatedBy: String(faker.helpers.arrayElement(users).id),
    generatedOn: getRandomDate(),
    content: faker.lorem.paragraphs(),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
}

// Main function to generate all sample data
function generateSampleData(userCount: number, companyCount: number, contactCount: number, opportunityCount: number, leadCount: number, activityCount: number, noteCount: number, taskCount: number, reportCount: number) {
  const users = generateUsers(userCount);
  const companies = generateCompanies(companyCount);
  const contacts = generateContacts(contactCount, companies);
  const opportunities = generateOpportunities(opportunityCount, companies, contacts);
  const leads = generateLeads(leadCount, users);
  const activities = generateActivities(activityCount, users, contacts, companies, opportunities, leads);
  const notes = generateNotes(noteCount, users, contacts, companies, opportunities, leads);
  const tasks = generateTasks(taskCount, users, contacts, companies, opportunities, leads);
  const reports = generateReports(reportCount, users);

  // Connect related entities using flatMap
  users.forEach(user => {
    user.contacts = contacts.filter(contact => contact.companyId && companies.some(company => company.id === contact.companyId));
    user.companies = companies.filter(company => contacts.some(contact => contact.companyId === company.id));
    user.opportunities = opportunities.filter(opportunity => opportunity.companyId && companies.some(company => company.id === opportunity.companyId));
    user.leads = leads.filter(lead => lead.assignedToId === user.id);
    user.activities = activities.filter(activity => activity.userId === user.id);
    user.notes = notes.filter(note => note.userId === user.id);
    user.tasks = tasks.filter(task => task.userId === user.id);
  });

  companies.forEach(company => {
    company.contacts = contacts.filter(contact => contact.companyId === company.id);
    company.opportunities = opportunities.filter(opportunity => opportunity.companyId === company.id);
    company.activities = activities.filter(activity => activity.companyId === company.id);
    company.notes = notes.filter(note => note.companyId === company.id);
    company.tasks = tasks.filter(task => task.companyId === company.id);
  });

  contacts.forEach(contact => {
    contact.company = companies.find(company => company.id === contact.companyId);
    contact.opportunities = opportunities.filter(opportunity => opportunity.contactId === contact.id);
    contact.activities = activities.filter(activity => activity.contactId === contact.id);
    contact.notes = notes.filter(note => note.contactId === contact.id);
    contact.tasks = tasks.filter(task => task.contactId === contact.id);
  });

  opportunities.forEach(opportunity => {
    opportunity.company = companies.find(company => company.id === opportunity.companyId);
    opportunity.contact = contacts.find(contact => contact.id === opportunity.contactId);
    opportunity.activities = activities.filter(activity => activity.opportunityId === opportunity.id);
    opportunity.notes = notes.filter(note => note.opportunityId === opportunity.id);
    opportunity.tasks = tasks.filter(task => task.opportunityId === opportunity.id);
  });

  leads.forEach(lead => {
    lead.assignedTo = users.find(user => user.id === lead.assignedToId);
    lead.activities = activities.filter(activity => activity.leadId === lead.id);
    lead.notes = notes.filter(note => note.leadId === lead.id);
    lead.tasks = tasks.filter(task => task.leadId === lead.id);
  });

  activities.forEach(activity => {
    activity.user = users.find(user => user.id === activity.userId);
    activity.contact = contacts.find(contact => contact.id === activity.contactId);
    activity.company = companies.find(company => company.id === activity.companyId);
    activity.opportunity = opportunities.find(opportunity => opportunity.id === activity.opportunityId);
    activity.lead = leads.find(lead => lead.id === activity.leadId);
  });

  notes.forEach(note => {
    note.user = users.find(user => user.id === note.userId);
    note.contact = contacts.find(contact => contact.id === note.contactId);
    note.company = companies.find(company => company.id === note.companyId);
    note.opportunity = opportunities.find(opportunity => opportunity.id === note.opportunityId);
    note.lead = leads.find(lead => lead.id === note.leadId);
  });

  tasks.forEach(task => {
    task.user = users.find(user => user.id === task.userId);
    task.contact = contacts.find(contact => contact.id === task.contactId);
    task.company = companies.find(company => company.id === task.companyId);
    task.opportunity = opportunities.find(opportunity => opportunity.id === task.opportunityId);
    task.lead = leads.find(lead => lead.id === task.leadId);
  });

  reports.forEach(report => {
    report.generatedBy = String(users.find(user => user.id === report.generatedBy) || '');
  });


  // Write the generated data to a JSON file
  const data = {
    users,
    companies,
    contacts,
    opportunities,
    leads,
    activities,
    notes,
    tasks,
    reports,
  };

  return data;
}

// Generate sample data and save to db.json
//export default generateSampleData
 const sampleData = generateSampleData(5, 5, 5, 10, 5, 20, 10, 20, 5);

 export default sampleData;