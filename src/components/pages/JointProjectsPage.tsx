import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Target, TrendingUp, ArrowLeft, Plus, Building, Handshake, Globe, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface JointProject {
  id: string;
  title: string;
  description: string;
  leadOrganization: string;
  partnerOrganizations: string[];
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: number;
  currentFunding: number;
  beneficiaries: number;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  image: string;
  objectives: string[];
  requiredSkills: string[];
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
}

const mockJointProjects: JointProject[] = [
  {
    id: '1',
    title: 'Rural Digital Literacy Initiative',
    description: 'A collaborative effort to bring digital literacy to 50 villages across 3 states, combining resources from multiple NGOs to maximize impact.',
    leadOrganization: 'NGO INDIA',
    partnerOrganizations: ['Tech for Good Foundation', 'Rural Development Trust', 'Education First NGO'],
    category: 'education',
    location: 'Rajasthan, Madhya Pradesh, Uttar Pradesh',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    budget: 2500000,
    currentFunding: 1800000,
    beneficiaries: 15000,
    status: 'active',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    objectives: [
      'Establish 50 digital learning centers',
      'Train 500 local instructors',
      'Provide digital literacy to 15,000 individuals',
      'Create sustainable local employment'
    ],
    requiredSkills: ['Digital Training', 'Project Management', 'Community Outreach', 'Technical Support'],
    contactPerson: {
      name: 'Priya Sharma',
      email: 'priya@ngoindia.org',
      phone: '+91 9876543210'
    }
  },
  {
    id: '2',
    title: 'Clean Water & Sanitation Alliance',
    description: 'Multi-NGO collaboration to provide clean water access and sanitation facilities to underserved communities.',
    leadOrganization: 'Water for All Foundation',
    partnerOrganizations: ['NGO INDIA', 'Clean India Mission', 'Health First NGO'],
    category: 'water',
    location: 'Bihar, Jharkhand, Odisha',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    budget: 3200000,
    currentFunding: 2400000,
    beneficiaries: 25000,
    status: 'active',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    objectives: [
      'Install 100 water purification systems',
      'Build 200 sanitation facilities',
      'Train 300 community health workers',
      'Establish maintenance protocols'
    ],
    requiredSkills: ['Water Engineering', 'Community Health', 'Project Coordination', 'Maintenance Training'],
    contactPerson: {
      name: 'Rajesh Kumar',
      email: 'rajesh@waterforall.org',
      phone: '+91 9876543211'
    }
  },
  {
    id: '3',
    title: 'Women Entrepreneurship Network',
    description: 'Joint initiative to empower women through skill development, microfinance, and market linkage programs.',
    leadOrganization: 'Women Empowerment Trust',
    partnerOrganizations: ['NGO INDIA', 'Skill Development Foundation', 'Microfinance Alliance'],
    category: 'empowerment',
    location: 'Karnataka, Tamil Nadu, Andhra Pradesh',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    budget: 1800000,
    currentFunding: 1800000,
    beneficiaries: 5000,
    status: 'completed',
    image: 'https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    objectives: [
      'Train 5,000 women in various skills',
      'Facilitate 2,000 microloans',
      'Establish 50 women-led enterprises',
      'Create market linkage network'
    ],
    requiredSkills: ['Business Training', 'Financial Literacy', 'Marketing', 'Mentorship'],
    contactPerson: {
      name: 'Sunita Devi',
      email: 'sunita@womenempowerment.org',
      phone: '+91 9876543212'
    }
  }
];

export function JointProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [projects, setProjects] = useState<JointProject[]>(mockJointProjects);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'water', name: 'Water & Sanitation' },
    { id: 'empowerment', name: 'Women Empowerment' },
    { id: 'environment', name: 'Environment' },
    { id: 'livelihood', name: 'Livelihood' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'planning', name: 'Planning' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'on-hold', name: 'On Hold' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.leadOrganization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-orange-500';
      case 'planning': return 'bg-blue-500';
      case 'on-hold': return 'bg-gray-500';
      default: return 'bg-orange-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return TrendingUp;
      case 'planning': return Clock;
      case 'on-hold': return AlertCircle;
      default: return Clock;
    }
  };

  const getProgressPercentage = (current: number, total: number) => {
    return Math.min((current / total) * 100, 100);
  };

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiaries, 0);
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
              <h1 className="text-xl font-bold text-gray-900">Joint Project Coordination</h1>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Joint Project Coordination</h1>
          <p className="text-xl text-gray-600 mb-8">
            Collaborate with partner organizations to maximize impact through coordinated initiatives. 
            Join forces, share resources, and create lasting change together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/joint-projects/create'}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Propose Joint Project
            </button>
            <button
              onClick={() => window.location.href = '/joint-projects/partners'}
              className="border border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 justify-center"
            >
              <Handshake className="w-5 h-5" />
              Find Partners
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{activeProjects}</div>
            <div className="text-gray-600">Active Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalBeneficiaries.toLocaleString()}</div>
            <div className="text-gray-600">Beneficiaries</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{(totalBudget / 10000000).toFixed(1)}Cr</div>
            <div className="text-gray-600">Total Budget</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search joint projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const StatusIcon = getStatusIcon(project.status);
            const fundingPercentage = getProgressPercentage(project.currentFunding, project.budget);
            
            return (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Lead Organization */}
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Lead: {project.leadOrganization}</span>
                  </div>
                  
                  {/* Partner Organizations */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Handshake className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Partners:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.partnerOrganizations.slice(0, 2).map((partner, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {partner}
                        </span>
                      ))}
                      {project.partnerOrganizations.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{project.partnerOrganizations.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.startDate).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span>₹{(project.budget / 100000).toFixed(1)}L budget</span>
                    </div>
                  </div>
                  
                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Funding Progress</span>
                      <span>{fundingPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${fundingPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = `/joint-projects/${project.id}`}
                      className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.location.href = `/joint-projects/${project.id}/join`}
                      className="border border-orange-500 text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                    >
                      Join Project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a new joint project.</p>
            <button
              onClick={() => window.location.href = '/joint-projects/create'}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Create New Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}