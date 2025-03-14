import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Machine {
    id: number;
    year: number;
    group: string;
    brand: string;
    name: number;
    serial_number: string;
    services: Service[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
    schedulingDate: string;
    start: string;
    end: string | null;
    expected_time: string;
    machine_id: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Contact {
    id: number;
    name: string;
    email?: string;
    phone: string;
    category: string;
    machines: Machine[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Component {
    id: number;
    name: string;
    description: string;
    brand: string;
    quantity: number;
    price: number;
    machines: Machine[];
    [key: string]: unknown; // This allows for additional properties...
}