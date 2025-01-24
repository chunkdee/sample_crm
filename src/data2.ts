import { faker } from '@faker-js/faker';

enum QuoteStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Expired = 'Expired'
}

const generateCompanies = (count: number) => Array.from({ length: count }, (_, index) => ({
  id: index + 1,
  name: faker.company.name(),
  industry: faker.company.buzzPhrase(),
  size: faker.helpers.arrayElement(['Small', 'Medium', 'Large', 'Enterprise']),
  revenue: faker.number.int({ min: 100000, max: 10000000 }),
  location: faker.location.city(),
  logo: faker.image.urlLoremFlickr({ category: 'business' }),
  contactIds: [] as number[], // Will be populated after contacts are generated
  dealIds: [] as number[], // Will be populated after deals are generated
}));

const generateContacts = (count: number, companies: any[]) => Array.from({ length: count }, (_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  position: faker.person.jobTitle(),
  avatar: faker.image.avatar(),
  companyId: faker.helpers.arrayElement(companies).id,
  notes: [],
}));

const generateDeals = (count: number, companies: any[], contacts: any[]) => Array.from({ length: count }, (_, index) => ({
  id: index + 1,
  name: faker.commerce.productName(),
  value: faker.number.int({ min: 5000, max: 500000 }),
  status: faker.helpers.arrayElement(['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']),
  stage: faker.helpers.arrayElement(['Initial Contact', 'Meeting', 'Proposal', 'Contract', 'Closed']),
  expectedCloseDate: faker.date.future(),
  companyId: faker.helpers.arrayElement(companies).id,
  contactId: faker.helpers.arrayElement(contacts).id,
  probability: faker.number.int({ min: 0, max: 100 }),
  notes: [],
}));

const generateSales = (count: number, deals: any[], contacts: any[]) => Array.from({ length: count }, (_, index) => ({
  id: index + 1,
  dealId: faker.helpers.arrayElement(deals).id,
  amount: faker.number.int({ min: 1000, max: 100000 }),
  date: faker.date.past(),
  status: faker.helpers.arrayElement(['Pending', 'Completed', 'Cancelled']),
  paymentMethod: faker.helpers.arrayElement(['Credit Card', 'Wire Transfer', 'Cash', 'Check']),
  contactId: faker.helpers.arrayElement(contacts).id,
}));

const generateQuotes = (count: number, contacts: any[], companies: any[]) => Array.from({ length: count }, (_, index) => {
  const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, (_, itemIndex) => {
    const quantity = faker.number.int({ min: 1, max: 10 });
    const unitPrice = faker.number.float({ min: 100, max: 1000 });
    return {
      id: itemIndex + 1,
      description: faker.commerce.productDescription(),
      quantity,
      unitPrice,
      total: quantity * unitPrice
    };
  });

  const contact = faker.helpers.arrayElement(contacts);
  return {
    id: index + 1,
    number: `QT-${String(index + 1).padStart(5, '0')}`,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    amount: items.reduce((sum, item) => sum + item.total, 0),
    validUntil: faker.date.future(),
    status: faker.helpers.arrayElement(Object.values(QuoteStatus)),
    contactId: contact.id,
    companyId: contact.companyId,
    items,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
});

// Generate data
const companies = generateCompanies(30);
const contacts = generateContacts(30, companies);
const deals = generateDeals(30, companies, contacts);
const sales = generateSales(30, deals, contacts);
const quotes = generateQuotes(30, contacts, companies);

// Update relationships
companies.forEach(company => {
  company.contactIds = contacts
    .filter(contact => contact.companyId === company.id)
    .map(contact => contact.id);
  company.dealIds = deals
    .filter(deal => deal.companyId === company.id)
    .map(deal => deal.id);
});



export const sampleData = {
  companies,
  contacts,
  deals,
  sales,
  customers: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      orders: 5,
      contacts: [1, 2], // Related contact IDs
      notes: [1], // Related note IDs
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1-555-0124",
      orders: 3,
      contacts: [3],
      notes: [2, 3],
    }
  ],
  products: [
    {
      id: 1,
      name: "Product A",
      price: 99.99,
      stock: 100,
      sales: 50,
      category: "Electronics",
      customerId: 1, // Related customer ID
    },
    {
      id: 2,
      name: "Product B",
      price: 149.99,
      stock: 75,
      sales: 25,
      category: "Electronics",
      customerId: 2,
    }
  ],

  notes: [
    {
      id: 1,
      content: "Follow up on order #123",
      status: { value: "pending", label: "Pending", color: "orange" },
      customerId: 1,
      contactId: 1,
    },
    {
      id: 2,
      content: "Schedule meeting next week",
      status: { value: "completed", label: "Completed", color: "green" },
      customerId: 2,
      contactId: 2,
    },
    {
      id: 3,
      content: "Send price quote",
      status: { value: "inProgress", label: "In Progress", color: "blue" },
      customerId: 2,
      contactId: 3,
    },
    {
      id: 4,
      content: "Review contract terms",
      status: { value: "pending", label: "Pending", color: "orange" },
      customerId: 1,
      contactId: 1,
    }
  ],

  users: [
    {
      id: 1,
      email: "admin@octosoft.com",
      password: "password",
      first_name: "Admin",
      last_name: "User",
      administrator: true,
      avatar: "https://example.com/avatars/admin.jpg",
    },
    {
      id: 2,
      email: "user@octosoft.com",
      password: "password",
      first_name: "User",
      last_name: "Representative",
      administrator: false,
      avatar: "https://example.com/avatars/sales.jpg",
    }
  ],
  quotes,
};
export default sampleData;