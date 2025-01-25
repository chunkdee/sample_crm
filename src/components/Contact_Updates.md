# Contact, Company, and Quote Component Updates

## Steps to Move Contact-Related Components

1. **Create a New Folder:**
   Create a new folder called `Contact` within the `src/contact` directory.

2. **Move Contact-Related Components:**
   Move the following files into the `Contact` folder:
   - ContactAdd.tsx
   - ContactList.tsx
   - ContactList_Updates.md
   - Contacts.tsx
   - ContactView.tsx

3. **Create an Index File:**
   Create an `index.ts` file in the `Contact` folder to export all Contact-related components.

4. **Update References:**
   Update the references in the project where these components are called. For example, update the import statements in files like `Dashboard.tsx`, `Customers.tsx`, etc.

## Example Updates

### Create `index.ts` File

Create a file named `index.ts` in the `Contact` folder with the following content:

```typescript
export { default as ContactAdd } from './ContactAdd';
export { default as ContactList } from './ContactList';
export { default as Contacts } from './Contacts';
export { default as ContactView } from './ContactView';
```

### Update Import Statements

#### Before:
```typescript
import ContactList from '../components/ContactList';
import ContactView from '../components/ContactView';
```

#### After:
```typescript
import { ContactList, ContactView } from '../contact/Contact';
```

### Update Component Usage

#### Before:
```typescript
<ContactList />
<ContactView />
```

#### After:
```typescript
<ContactList />
<ContactView />
```

## Steps to Move Company-Related Components

1. **Create a New Folder:**
   Create a new folder called `Company` within the `src/contact` directory.

2. **Move Company-Related Components:**
   Move the following files into the `Company` folder:
   - CompanyAdd.tsx
   - CompanyList.tsx
   - CompanyView.tsx
   - CompanyList_Updates.md

3. **Create an Index File:**
   Create an `index.ts` file in the `Company` folder to export all Company-related components.

4. **Update References:**
   Update the references in the project where these components are called. For example, update the import statements in files like `Dashboard.tsx`, `Customers.tsx`, etc.

## Example Updates

### Create `index.ts` File

Create a file named `index.ts` in the `Company` folder with the following content:

```typescript
export { default as CompanyAdd } from './CompanyAdd';
export { default as CompanyList } from './CompanyList';
export { default as CompanyView } from './CompanyView';
```

### Update Import Statements

#### Before:
```typescript
import CompanyList from '../components/CompanyList';
import CompanyView from '../components/CompanyView';
```

#### After:
```typescript
import { CompanyList, CompanyView } from '../contact/Company';
```

### Update Component Usage

#### Before:
```typescript
<CompanyList />
<CompanyView />
```

#### After:
```typescript
<CompanyList />
<CompanyView />
```

## Steps to Move Quote-Related Components

1. **Create a New Folder:**
   Create a new folder called `Quote` within the `src/contact` directory.

2. **Move Quote-Related Components:**
   Move the following files into the `Quote` folder:
   - CreateQuote.tsx
   - EditQuote.tsx
   - Quote.tsx
   - QuoteList.tsx

3. **Create an Index File:**
   Create an `index.ts` file in the `Quote` folder to export all Quote-related components.

4. **Update References:**
   Update the references in the project where these components are called. For example, update the import statements in files like `Dashboard.tsx`, `Customers.tsx`, etc.

## Example Updates

### Create `index.ts` File

Create a file named `index.ts` in the `Quote` folder with the following content:

```typescript
export { default as CreateQuote } from './CreateQuote';
export { default as EditQuote } from './EditQuote';
export { default as Quote } from './Quote';
export { default as QuoteList } from './QuoteList';
```

### Update Import Statements

#### Before:
```typescript
import QuoteList from '../components/QuoteList';
import Quote from '../components/Quote';
```

#### After:
```typescript
import { QuoteList, Quote } from '../contact/Quote';
```

### Update Component Usage

#### Before:
```typescript
<QuoteList />
<Quote />
```

#### After:
```typescript
<QuoteList />
<Quote />
```

## Summary

These changes will move all Contact-related components into a new folder called `Contact` within `src/contact`, create an `index.ts` file to export all Contact-related components, and update the references in the project where these components are called. Similarly, all Company-related components will be moved into a new folder called `Company` within `src/contact`, create an `index.ts` file to export all Company-related components, and update the references in the project where these components are called. Additionally, all Quote-related components will be moved into a new folder called `Quote` within `src/contact`, create an `index.ts` file to export all Quote-related components, and update the references in the project where these components are called.