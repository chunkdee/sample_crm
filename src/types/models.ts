// src/types/models.ts

import { Identifier, RaRecord } from 'ra-core';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
}

export interface Order {
  id: number;
  customerId: number;
  items: number[];
  total: number;
}

export interface TableColumns<RaRecordType = any> {
  title: string;
  dataIndex?: keyof RaRecordType;
  key: string;
  render?: (text: string, record: RaRecordType) => React.ReactNode;
}


export type SignUpData = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

export type SalesFormData = {
    avatar: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    administrator: boolean;
    disabled: boolean;
};

export type Task = {
  contact_id: Identifier;
  type: string;
  text: string;
  due_date: string;
  done_date?: string | null;
  sales_id?: Identifier;
} & Pick<RaRecord, 'id'>;


export interface NoteStatus {
  value: string;
  label: string;
  color: string;
}

export interface RAFile {
  src: string;
  title: string;
  path?: string;
  rawFile: File;
  type?: string;
}


export enum CompanySize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Enterprise = 'Enterprise'
}

export enum DealStatus {
  New = 'New',
  Qualified = 'Qualified',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  ClosedWon = 'Closed Won',
  ClosedLost = 'Closed Lost'
}

export enum DealStage {
  InitialContact = 'Initial Contact',
  Meeting = 'Meeting',
  Proposal = 'Proposal',
  Contract = 'Contract',
  Closed = 'Closed'
}

export enum SaleStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum QuoteStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Expired = 'Expired'
}

export interface Company extends RaRecord {
  name: string;
  industry: string;
  size: CompanySize;
  revenue: number;
  location: string;
  logo: string;
  contactIds: number[];
}

export interface Contact extends RaRecord {
  name: string;
  email: string;
  phone: string;
  position: string;
  avatar: string;
  companyId: number;
  notes: number[];
}

export type DealNote = {
  deal_id: Identifier;
  text: string;
  date: string;
  sales_id: Identifier;
  // This is defined for compatibility with `ContactNote`
  status?: undefined;
} & Pick<RaRecord, 'id'>;


export type ContactNote = {
  contactId: Identifier;
  content: string;
  date: string;
} & Pick<RaRecord, 'id'>;

export interface Deal extends RaRecord {
  name: string;
  value: number;
  status: DealStatus;
  stage: DealStage;
  expectedCloseDate: Date;
  companyId: number;
  contactId: number;
  probability: number;
}

export interface Sale extends RaRecord {
  dealId: number;
  amount: number;
  date: Date;
  status: SaleStatus;
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'Cash' | 'Check';
  contactId: number;
}

export interface Quote extends RaRecord {
  number: string;
  title: string;
  description: string;
  amount: number;
  validUntil: Date;
  status: QuoteStatus;
  contactId: number;
  companyId: number;
  saleId?: number;
  items: QuoteItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PermissionRule {
  action: string | string[]
  subject: string | string[]
  /** an array of fields to which user has (or not) access */
  fields?: string[]
  /** an object of conditions which restricts the rule scope */
  conditions?: any
  /** indicates whether rule allows or forbids something */
  inverted?: boolean
  /** message which explains why rule is forbidden */
  reason?: string
}