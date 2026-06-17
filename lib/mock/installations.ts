import type { InstallationStatus } from '@/types/database'

export interface MockInstallation {
  restaurant_id: string
  module_id: string
  module_name: string
  status: InstallationStatus
}

export const MOCK_INSTALLATIONS: MockInstallation[] = []

const GENERATED_STATUSES: InstallationStatus[] = [
  'package_generated',
  'implementation_started',
  'installed',
  'validated',
]

export function isMockFirstModule(restaurantId: string, currentModuleId?: string): boolean {
  return !MOCK_INSTALLATIONS.some(
    i =>
      i.restaurant_id === restaurantId &&
      GENERATED_STATUSES.includes(i.status) &&
      i.module_id !== currentModuleId
  )
}

export function getMockInstalledModules(restaurantId: string) {
  return MOCK_INSTALLATIONS
    .filter(i => i.restaurant_id === restaurantId && GENERATED_STATUSES.includes(i.status))
    .map(i => ({ name: i.module_name, version: '1' }))
}
