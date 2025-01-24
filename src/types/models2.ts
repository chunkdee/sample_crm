import { RaRecord } from 'ra-core';

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

export interface Company extends RaRecord {
  name: string;
  industry: string;
  size: CompanySize;
  revenue: number;
  location: string;
  logo: string;
  contactIds: number[];
  dealIds: number[];
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

export interface Deal extends RaRecord {
  name: string;
  value: number;
  status: DealStatus;
  stage: DealStage;
  expectedCloseDate: Date;
  companyId: number;
  contactId: number;
  probability: number;
  notes: number[];
}

export interface Sale extends RaRecord {
  dealId: number;
  amount: number;
  date: Date;
  status: SaleStatus;
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'Cash' | 'Check';
  contactId: number;
}