// Static JSON data sebagai mock database
const mockShipments = [
  {
    id: 'SHP-001',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    route: 'I-80 Corridor',
    vehicleType: '18-Wheeler Truck',
    status: 'assigned',
    assignedTransporter: 'Swift Transport Inc.'
  },
  {
    id: 'SHP-002',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    route: 'I-55 South',
    vehicleType: 'Box Truck',
    status: 'not_assigned',
    assignedTransporter: null
  },
  {
    id: 'SHP-003',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    route: 'I-75 North',
    vehicleType: 'Refrigerated Truck',
    status: 'assigned',
    assignedTransporter: 'Fresh Logistics Co.'
  },
  {
    id: 'SHP-004',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    route: 'I-5 South',
    vehicleType: 'Flatbed Truck',
    status: 'not_assigned',
    assignedTransporter: null
  },
  {
    id: 'SHP-005',
    origin: 'Dallas, TX',
    destination: 'Denver, CO',
    route: 'I-70 West',
    vehicleType: 'Cargo Van',
    status: 'not_assigned',
    assignedTransporter: null
  },
  {
    id: 'SHP-006',
    origin: 'Boston, MA',
    destination: 'Washington, DC',
    route: 'I-95 Corridor',
    vehicleType: 'Box Truck',
    status: 'assigned',
    assignedTransporter: 'Highway Haulers LLC'
  }
]

const mockTransporters = [
  { id: 1, name: 'Swift Transport Inc.' },
  { id: 2, name: 'Fresh Logistics Co.' },
  { id: 3, name: 'Highway Haulers LLC' },
  { id: 4, name: 'Coastal Freight Solutions' },
  { id: 5, name: 'Midwest Cargo Express' },
  { id: 6, name: 'Southern Trucking Co.' },
  { id: 7, name: 'Western Freight Services' }
]

// Simulasi delay API (seperti network latency)
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory data (untuk simulasi update)
let shipments = [...mockShipments]
let transporters = [...mockTransporters]

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
    
    // Form validation - Bonus D
    if (!transporterName || transporterName.trim() === '') {
      throw new Error('❌ Please select a transporter')
    }
    
    const index = shipments.findIndex(s => s.id === shipmentId)
    if (index === -1) throw new Error('Shipment not found')
    
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
  }
}