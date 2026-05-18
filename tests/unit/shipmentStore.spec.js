import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipmentStore } from '../../src/stores/shipmentStore'

describe('Shipment Store - Assign Transporter Function', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should validate empty transporter and show error', async () => {
    const store = useShipmentStore()
    
    await expect(store.assignTransporter('SHP-001', ''))
      .rejects.toThrow()
    
    expect(store.notification.type).toBe('error')
    expect(store.notification.message).toContain('Please select')
  })

  it('should successfully assign transporter', async () => {
    const store = useShipmentStore()
    store.shipments = [{ id: 'SHP-001', status: 'not_assigned', assignedTransporter: null }]
    
    // Mock the API call
    vi.mock('../services/mockApi', () => ({
      mockApi: {
        assignTransporter: vi.fn().mockResolvedValue({
          success: true,
          message: 'Successfully assigned',
          shipment: { id: 'SHP-001', status: 'assigned', assignedTransporter: 'Test Transporter' }
        })
      }
    }))
  })
})