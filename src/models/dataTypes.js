// Mock data model for Complaint
export const Complaint = {
  id: '',
  userId: '',
  photoUrl: '',
  latitude: 0,
  longitude: 0,
  status: 'Pending', // Pending, Assigned, Resolved
  adminComments: '',
  collectorId: '',
  timestamp: null,
  confidenceRate: 0,
};

// Mock data model for User
export const User = {
  id: '',
  name: '',
  email: '',
  role: 'Citizen', // Citizen, Garbage Collector, Admin
  phone: '',
  location: null,
};
