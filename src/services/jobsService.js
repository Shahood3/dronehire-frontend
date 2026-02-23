/**
 * Jobs API Service
 * Handles all job-related API communications for DroneHire
 */

// API_BASE_URL already includes /api from .env (e.g., http://localhost:8080/api)
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Get auth headers with JWT token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

/**
 * Jobs API Service
 */
const jobsService = {
  /**
   * Create a new job posting
   * @param {Object} jobData - Job details
   * @returns {Promise<Object>} Created job
   */
  createJob: async (jobData) => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: jobData.title,
        description: jobData.description,
        category: jobData.category,
        location: jobData.location,
        location_type: jobData.locationType,
        budget: parseFloat(jobData.budget),
        budget_type: jobData.budgetType,
        duration: jobData.duration ? parseInt(jobData.duration) : null,
        duration_unit: jobData.durationUnit,
        start_date: jobData.startDate,
        deadline: jobData.deadline || null,
        requirements: jobData.requirements || null,
        drone_type: jobData.droneType || [],
        experience_level: jobData.experienceLevel,
        license_required: jobData.licenseRequired || false,
        insurance_required: jobData.insuranceRequired || false,
        equipment_provided: jobData.equipmentProvided || false,
        additional_notes: jobData.additionalNotes || null
      })
    });
    
    return handleResponse(response);
  },

  /**
   * Get all open jobs with optional filters
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Jobs list with pagination
   */
  getAllJobs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.location) queryParams.append('location', params.location);
    if (params.minBudget) queryParams.append('min_budget', params.minBudget);
    if (params.maxBudget) queryParams.append('max_budget', params.maxBudget);
    if (params.experienceLevel) queryParams.append('experience_level', params.experienceLevel);
    if (params.sortBy) queryParams.append('sort_by', params.sortBy);
    if (params.sortOrder) queryParams.append('sort_order', params.sortOrder);
    if (params.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/jobs${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    return handleResponse(response);
  },

  /**
   * Get jobs posted by the current client
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Client's jobs with pagination
   */
  getMyJobs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/jobs/my-jobs${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },

  /**
   * Get a single job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Job details
   */
  getJob: async (jobId) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    return handleResponse(response);
  },

  /**
   * Update a job posting
   * @param {string} jobId - Job ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated job
   */
  updateJob: async (jobId, updateData) => {
    // Convert camelCase to snake_case for backend
    const formattedData = {};
    
    const fieldMappings = {
      title: 'title',
      description: 'description',
      category: 'category',
      location: 'location',
      locationType: 'location_type',
      budget: 'budget',
      budgetType: 'budget_type',
      duration: 'duration',
      durationUnit: 'duration_unit',
      startDate: 'start_date',
      deadline: 'deadline',
      requirements: 'requirements',
      droneType: 'drone_type',
      experienceLevel: 'experience_level',
      licenseRequired: 'license_required',
      insuranceRequired: 'insurance_required',
      equipmentProvided: 'equipment_provided',
      additionalNotes: 'additional_notes',
      status: 'status'
    };
    
    Object.keys(updateData).forEach(key => {
      const backendKey = fieldMappings[key] || key;
      formattedData[backendKey] = updateData[key];
    });
    
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formattedData)
    });
    
    return handleResponse(response);
  },

  /**
   * Delete a job posting
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteJob: async (jobId) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },

  /**
   * Apply to a job (for pilots)
   * @param {string} jobId - Job ID
   * @param {Object} applicationData - Application details
   * @returns {Promise<Object>} Application confirmation
   */
  applyToJob: async (jobId, applicationData = {}) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        cover_letter: applicationData.coverLetter || null,
        proposed_budget: applicationData.proposedBudget ? parseFloat(applicationData.proposedBudget) : null,
        proposed_timeline: applicationData.proposedTimeline || null
      })
    });
    
    return handleResponse(response);
  },

  /**
   * Update application status (for clients)
   * @param {string} jobId - Job ID
   * @param {string} applicationId - Application ID
   * @param {string} status - New status (pending, shortlisted, accepted, rejected)
   * @returns {Promise<Object>} Update confirmation
   */
  updateApplicationStatus: async (jobId, applicationId, status) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/applications/${applicationId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    return handleResponse(response);
  },

  /**
   * Get all job categories with counts
   * @returns {Promise<Object>} Categories list
   */
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs/categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    return handleResponse(response);
  },

  /**
   * Get job statistics for current client
   * @returns {Promise<Object>} Statistics
   */
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

export default jobsService;

// Named exports for convenience
export const {
  createJob,
  getAllJobs,
  getMyJobs,
  getJob,
  updateJob,
  deleteJob,
  applyToJob,
  updateApplicationStatus,
  getCategories,
  getStats
} = jobsService;