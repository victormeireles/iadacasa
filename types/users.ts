import type { Profile, Restaurant, UserRole } from './database'

export interface AuthUser {
  id: string
  email: string
  profile: Profile | null
}

export interface SessionUser {
  id: string
  email: string
  name: string
  role: UserRole
  restaurantId?: string
}

export interface UserWithRestaurant {
  profile: Profile
  restaurant: Restaurant | null
}
