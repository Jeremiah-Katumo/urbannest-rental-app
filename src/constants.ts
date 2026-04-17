
import { House, User, Transporter, SupportIssue, Payment, Lease, Announcement, SubscriptionPlan, Permission, RoleDefinition, CustomField, Campaign, Message, Conversation, Lead, MaintenanceRequest } from './types';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    senderId: 'u4',
    targetRoles: ['TENANT', 'LANDLORD', 'AGENT', 'TRANSPORTER'],
    title: 'System Maintenance',
    content: 'The platform will be down for maintenance on Sunday from 2 AM to 4 AM UTC.',
    timestamp: '2024-04-10T10:00:00Z',
    priority: 'URGENT'
  },
  {
    id: 'a2',
    senderId: 'u3',
    targetRoles: ['TENANT'],
    title: 'New Garbage Collection Schedule',
    content: 'Please note that garbage collection will now happen on Tuesdays and Fridays.',
    timestamp: '2024-04-09T14:00:00Z',
    priority: 'NORMAL'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'TENANT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    joinedDate: '2023-10-01',
    status: 'ACTIVE',
    favorites: ['h1']
  },
  {
    id: 'u2',
    name: 'Marcus Real Estate',
    email: 'marcus@agents.com',
    role: 'AGENT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    joinedDate: '2023-05-15',
    status: 'ACTIVE'
  },
  {
    id: 'u3',
    name: 'David Landlord',
    email: 'david@investments.com',
    role: 'LANDLORD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    joinedDate: '2022-01-20',
    status: 'ACTIVE'
  },
  {
    id: 'u4',
    name: 'System Admin',
    email: 'admin@urbannest.com',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    joinedDate: '2021-01-01',
    status: 'ACTIVE'
  },
  {
    id: 'u5',
    name: 'Support Team',
    email: 'support@urbannest.com',
    role: 'SUPPORT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support',
    joinedDate: '2023-01-01',
    status: 'ACTIVE'
  },
  {
    id: 'u6',
    name: 'John Transporter',
    email: 'john@transporters.com',
    role: 'TRANSPORTER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnT',
    joinedDate: '2023-02-10',
    status: 'ACTIVE',
    phone: '+254700112233'
  }
];

export const MOCK_HOUSES: House[] = [
  {
    id: 'h1',
    title: 'Modern Sunset Loft',
    description: 'A beautiful open-concept loft in the heart of the city with floor-to-ceiling windows.',
    price: 1200,
    location: 'Downtown District',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    amenities: ['Gym', 'Pool', 'Wifi', 'Kitchen'],
    ownerId: 'u3',
    coordinates: [-1.286389, 36.817223],
    rating: 4.8
  },
  {
    id: 'h2',
    title: 'Family Evergreen Estate',
    description: 'Spacious 4-bedroom house with a large backyard and modern kitchen, perfect for families.',
    price: 2800,
    location: 'Suburban Hills',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    amenities: ['Backyard', 'Garage', 'Pet-friendly', 'Dishwasher'],
    ownerId: 'u3',
    agentId: 'u2',
    coordinates: [-1.303, 36.79],
    rating: 4.5
  },
  {
    id: 'h3',
    title: 'Minimalist Studio 5',
    description: 'Perfect for young professionals or students. High-speed internet included.',
    price: 850,
    location: 'University Quarter',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1536376074432-af7158d05ee0?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    amenities: ['Wifi', 'Laundry', 'Furnished'],
    ownerId: 'u3',
    coordinates: [-1.27, 36.81],
    rating: 4.2
  }
];

export const MOCK_TRANSPORTERS: Transporter[] = [
  { id: 't1', name: 'Swift Movers', email: 'swift@movers.com', phone: '+254712345678', vehicleType: 'Lorry', basePrice: 50, pricePerKm: 2, rating: 4.7, status: 'AVAILABLE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Swift' },
  { id: 't2', name: 'Safe Transit', email: 'safe@transit.com', phone: '+254722334455', vehicleType: 'Van', basePrice: 30, pricePerKm: 1.5, rating: 4.9, status: 'AVAILABLE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Safe' }
];

export const MOCK_ISSUES: SupportIssue[] = [
  { id: 'i1', userId: 'u1', subject: 'Leaking Faucet', description: 'The kitchen faucet is leaking constantly.', status: 'OPEN', priority: 'MEDIUM', category: 'MAINTENANCE', createdAt: '2024-03-10T10:00:00Z' }
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', bookingId: 'b1', tenantId: 'u1', amount: 1200, status: 'COMPLETED', method: 'MPESA', type: 'RENT', date: '2024-03-01T08:00:00Z' },
  { id: 'p2', bookingId: 'b1', tenantId: 'u1', amount: 1200, status: 'COMPLETED', method: 'CARD', type: 'DEPOSIT', date: '2024-02-15T10:00:00Z' },
  { id: 'p3', bookingId: 'b2', tenantId: 'u1', amount: 150, status: 'COMPLETED', method: 'MPESA', type: 'COMMISSION', date: '2024-03-05T12:00:00Z' }
];

export const MOCK_LEASES: Lease[] = [
  { id: 'l1', houseId: 'h1', tenantId: 'u1', landlordId: 'u3', status: 'SIGNED', startDate: '2024-01-01', endDate: '2024-12-31', rentAmount: 1200, depositAmount: 1200, documentUrl: '#', signedAt: '2023-12-28T15:00:00Z' }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'c1', name: 'Summer Hot Deals', description: 'Promoting waterfront properties', status: 'ACTIVE', budget: 5000, targetAudience: 'Families', startDate: '2024-06-01' },
  { id: 'c2', name: 'Student Studios', description: 'Low cost housing for university students', status: 'PAUSED', budget: 1200, targetAudience: 'Students', startDate: '2024-08-15' }
]

export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sp1',
    name: 'Landlord Pro',
    price: 49,
    interval: 'MONTHLY',
    role: 'LANDLORD',
    description: 'Perfect for property owners managing multiple units.',
    features: ['Unlimited Property Listings', 'Automated Invoicing', 'Tenant Screening Tools', 'Financial Reports', 'Priority Support']
  },
  {
    id: 'sp2',
    name: 'Agent Elite',
    price: 29,
    interval: 'MONTHLY',
    role: 'AGENT',
    description: 'Grow your agency with advanced marketing and lead management.',
    features: ['Featured Listings', 'Lead Analytics', 'Campaign Manager', 'Client CRM', 'Digital Lease Signing']
  },
  {
    id: 'sp3',
    name: 'Logistics Partner',
    price: 19,
    interval: 'MONTHLY',
    role: 'TRANSPORTER',
    description: 'Get more moving jobs and manage your fleet efficiently.',
    features: ['Job Marketplace Access', 'Fleet Management UI', 'Earnings Dashboard', 'Customer Reviews', 'Route Optimization']
  }
];

export const MOCK_PERMISSIONS: Permission[] = [
  { id: 'p1', name: 'View Dashboard', description: 'Access to the main dashboard overview', module: 'DASHBOARD' },
  { id: 'p2', name: 'Manage Properties', description: 'Create, edit, and delete property listings', module: 'PROPERTIES' },
  { id: 'p3', name: 'View Tenants', description: 'Access to tenant records and details', module: 'TENANTS' },
  { id: 'p4', name: 'Manage Payments', description: 'Process and view payment history', module: 'PAYMENTS' },
  { id: 'p5', name: 'System Settings', description: 'Access to platform-wide configuration', module: 'SETTINGS' }
];

export const MOCK_ROLES: RoleDefinition[] = [
  { id: 'r1', name: 'Super Admin', role: 'ADMIN', permissions: ['p1', 'p2', 'p3', 'p4', 'p5'] },
  { id: 'r2', name: 'Property Manager', role: 'LANDLORD', permissions: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'r3', name: 'Leasing Agent', role: 'AGENT', permissions: ['p1', 'p2', 'p3'] }
];

export const MOCK_CUSTOM_FIELDS: CustomField[] = [
  { id: 'cf1', name: 'pet_policy', label: 'Pet Policy Details', type: 'text', entity: 'HOUSE', defaultValue: 'No pets allowed' },
  { id: 'cf2', name: 'maintenance_frequency', label: 'Maintenance Frequency', type: 'select', entity: 'HOUSE', options: ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually'], defaultValue: 'Quarterly' },
  { id: 'cf3', name: 'emergency_contact', label: 'Emergency Contact Name', type: 'text', entity: 'USER', defaultValue: '' }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'msg1', senderId: 'u1', receiverId: 'u3', content: 'Hi, I have a question about the house.', timestamp: '2024-04-10T10:00:00Z', isRead: false },
  { id: 'msg2', senderId: 'u3', receiverId: 'u1', content: 'Sure, what would you like to know?', timestamp: '2024-04-10T10:05:00Z', isRead: false }
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantIds: ['u1', 'u3'],
    messages: MOCK_MESSAGES,
  }
];

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', houseId: 'h1', name: 'Alice Smith', email: 'alice@example.com', phone: '123456', message: 'Interested in viewing.', status: 'NEW', createdAt: '2024-04-11T10:00:00Z' },
  { id: 'l2', houseId: 'h2', name: 'Bob Brown', email: 'bob@example.com', phone: '654321', message: 'Is the price negotiable?', status: 'QUALIFIED', createdAt: '2024-04-10T15:00:00Z' }
]

export const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  { id: 'm1', houseId: 'h1', tenantId: 'u1', title: 'Leaking Sink', description: 'The kitchen sink is leaking.', priority: 'MEDIUM', status: 'OPEN', createdAt: '2024-04-09T08:00:00Z' }
]