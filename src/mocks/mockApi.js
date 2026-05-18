// Menggunakan static JSON sebagai mock database
import mockData from '../mocks/shipments.json'

// Simulasi delay API
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory database (simulasi update data)
let shipments = [...mockData.shipments]
let transporters = [...mockData.transporters]

export const mockApi = {
  // Get all shipments
  async getShipments() {
    await delay()
    return [...shipments]
  },

  // Get single shipment by ID
  async getShipmentById(id) {
    await delay()
    const shipment = shipments.find(s => s.id === id)
    if (!shipment) throw new Error('Shipment not found')
    return { ...shipment }
  },

  // Assign transporter to shipment
  async assignTransporter(shipmentId, transporterName) {
    await delay(300)
    
    // Validasi
    if (!transporterName || transporterName.trim() === '') {
      throw new Error('Transporter name cannot be empty')
    }
    
    const index = shipments.findIndex(s => s.id === shipmentId)
    if (index === -1) throw new Error('Shipment not found')
    
    // Cek apakah transporter ada
    const transporterExists = transporters.find(t => t.name === transporterName)
    if (!transporterExists) throw new Error('Invalid transporter')
    
    // Update data
    shipments[index] = {
      ...shipments[index],
      assignedTransporter: transporterName,
      status: 'assigned'
    }
    
    return {
      success: true,
      message: `✅ Successfully assigned ${transporterName} to ${shipmentId}`,
      shipment: { ...shipments[index] }
    }
  },

  // Get all transporters
  async getTransporters() {
    await delay()
    return [...transporters]
  },

  // Reset to original data (optional)
  async resetData() {
    await delay()
    shipments = [...mockData.shipments]
    return { success: true }
  }
}