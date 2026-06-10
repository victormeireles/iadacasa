import type { SessionUser } from '@/types/users'

export const MOCK_USER: SessionUser = {
  id: 'mock-user-001',
  email: 'demo@iadacasa.com.br',
  name: 'Saulo Lima',
  role: 'client',
  restaurantId: 'mock-restaurant-001',
}

export const MOCK_ADMIN_USER: SessionUser = {
  id: 'mock-admin-001',
  email: 'admin@iadacasa.com.br',
  name: 'Admin IA da Casa',
  role: 'admin',
}

export const MOCK_RESTAURANT = {
  id: 'mock-restaurant-001',
  owner_user_id: 'mock-user-001',
  name: 'Stela Burger',
  segment: 'hamburgueria' as const,
  city: 'São Paulo',
  state: 'SP',
  number_of_units: 2,
  operation_type: 'presencial e delivery',
  technical_level: 'baixo' as const,
  current_systems: 'PDV externo e planilhas',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
