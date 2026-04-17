
export type UserRole = 'TENANT' | 'LANDLORD' | 'AGENT' | 'ADMIN' | 'SUPPORT' | 'TRANSPORTER';
export type Page = 
  | 'MARKETPLACE' 
  | 'DASHBOARD' 
  | 'ABOUT' 
  | 'CONTACT' 
  | 'MY_BOOKINGS' 
  | 'SETTINGS' 
  | 'MANAGEMENT_HOMES' 
  | 'TENANTS' 
  | 'AGENTS' 
  | 'LANDLORDS' 
  | 'REPORTS' 
  | 'CAMPAIGNS'
  | 'PAYMENTS'
  | 'SUPPORT'
  | 'TRANSPORTERS'
  | 'WISHLIST'
  | 'MESSAGES'
  | 'LEASES'
  | 'COMMUNICATIONS'
  | 'SUBSCRIPTIONS'
  | 'ROLES_PERMISSIONS'
  | 'CUSTOM_FIELDS'
  | 'USER_MANAGEMENT'
  | 'DELIVERY_REQUESTS'
  | 'MAP';

export const ROLE_PAGES: Record<UserRole, Page[]> = {
  TENANT: ['MARKETPLACE', 'MY_BOOKINGS', 'WISHLIST', 'MESSAGES'],
  LANDLORD: ['DASHBOARD', 'MANAGEMENT_HOMES', 'LEASES'],
  AGENT: ['DASHBOARD', 'MANAGEMENT_HOMES'],
  ADMIN: [
    'MARKETPLACE', 'MY_BOOKINGS', 'WISHLIST', 
    'MESSAGES', 'DASHBOARD', 'MANAGEMENT_HOMES', 
    'LEASES', 'SUPPORT', 'MESSAGES', 'DELIVERY_REQUESTS', 'MAP'
  ],
  SUPPORT: ['SUPPORT', 'MESSAGES'],
  TRANSPORTER: ['DELIVERY_REQUESTS', 'MAP'],
};

export interface Lead {
  id: string;
  houseId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  houseId: string;
  tenantId: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  images?: string[];
}

export type AuthPage = 'LOGIN' | 'SIGNUP' | 'RESET_PASSWORD' | 'NONE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  joinedDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
  favorites?: string[]; // House IDs
  isSubscribed?: boolean;
  subscriptionPlanId?: string;
  subscriptionExpiry?: string;
}

export interface House {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'Apartment' | 'House' | 'Studio' | 'Villa';
  bedrooms: number;
  bathrooms: number;
  images: string[];
  isAvailable: boolean;
  amenities: string[];
  ownerId: string;
  agentId?: string;
  coordinates?: [number, number]; // [lat, lng]
  rating?: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  budget: number;
  targetAudience: string;
  startDate: string;
}

export interface Booking {
  id: string;
  houseId: string;
  tenantId: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  tenantId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  method: 'MPESA' | 'CARD' | 'BANK';
  type: 'RENT' | 'DEPOSIT' | 'COMMISSION';
  date: string;
  receiptUrl?: string;
}

export interface SupportIssue {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: 'MAINTENANCE' | 'PAYMENT' | 'ACCOUNT' | 'OTHER';
  createdAt: string;
  assignedTo?: string; // Admin/Support ID
}

export interface Transporter {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  basePrice: number;
  pricePerKm: number;
  rating: number;
  status: 'AVAILABLE' | 'BUSY';
  avatar: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Lease {
  id: string;
  houseId: string;
  tenantId: string;
  landlordId: string;
  status: 'DRAFT' | 'SIGNED' | 'EXPIRED' | 'RENEWED';
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  documentUrl: string;
  signedAt?: string;
}

export interface NearbyAmenity {
  id: string;
  name: string;
  type: 'SCHOOL' | 'HOSPITAL' | 'TRANSPORT' | 'SHOPPING';
  location: [number, number];
  rating: number;
  distance: string;
}

export interface Announcement {
  id: string;
  senderId: string;
  targetRoles: UserRole[];
  title: string;
  content: string;
  timestamp: string;
  priority: 'NORMAL' | 'URGENT';
}

export interface SearchFilters {
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
  type: string;
  bedrooms: number | '';
  amenities: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'MONTHLY' | 'YEARLY';
  role: UserRole;
  features: string[];
  description: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  amount: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface RoleDefinition {
  id: string;
  name: string;
  role: UserRole;
  permissions: string[]; // Permission IDs
}

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  entity: 'HOUSE' | 'USER' | 'BOOKING';
  options?: string[]; // For select type
  defaultValue?: any;
}

export interface CustomValue {
  id: string;
  fieldId: string;
  entityId: string;
  value: any;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
}

export type ChatMessage = Message;