const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    const response = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.access) {
      this.setToken(response.access);
    }
    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (response.access) {
      this.setToken(response.access);
    }
    return response;
  }

  async getProfile() {
    return this.request('/auth/profile/');
  }

  async updateProfile(data) {
    return this.request('/auth/profile/update/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // NGO endpoints
  async getNGOs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ngos/?${queryString}`);
  }

  async getNGO(id) {
    return this.request(`/ngos/${id}/`);
  }

  async createNGO(data) {
    return this.request('/ngos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Project endpoints
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/projects/?${queryString}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}/`);
  }

  async createProject(data) {
    return this.request('/projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async joinProject(projectId, role = 'Volunteer') {
    return this.request(`/projects/${projectId}/join/`, {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  }

  // Task endpoints
  async getTasks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/tasks/?${queryString}`);
  }

  async getMyTasks() {
    return this.request('/tasks/my-tasks/');
  }

  async updateTaskStatus(taskId, status) {
    return this.request(`/tasks/${taskId}/status/`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Donation endpoints
  async getDonations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations/?${queryString}`);
  }

  async processDonation(data) {
    return this.request('/donations/process/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyDonations() {
    return this.request('/donations/my-donations/');
  }
}

export default new ApiService();