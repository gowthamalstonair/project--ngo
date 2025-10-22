import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, MapPin, Target, TrendingUp, Building, Handshake, Globe, CheckCircle, Clock, AlertCircle, Mail, Phone, Download, Share2 } from 'lucide-react';

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
  timeline: {
    phase: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'completed' | 'active' | 'upcoming';
  }[];
  resources: {
    type: string;
    description: string;
    provider: string;
  }[];
}

const mockProject: JointProject = {
  id: '1',
  title: 'Rural Digital Literacy Initiative',
  description: 'A comprehensive collaborative effort to bring digital literacy to 50 villages across 3 states, combining resources from multiple NGOs to maximize impact. This initiative aims to bridge the digital divide in rural India by establishing learning centers, training local instructors, and providing sustainable digital education programs.',
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
  image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
  objectives: [
    'Establish 50 digital learning centers across rural areas',
    'Train 500 local instructors in digital literacy',
    'Provide digital literacy training to 15,000 individuals',
    'Create sustainable local employment opportunities',
    'Develop localized digital content in regional languages'
  ],
  requiredSkills: ['Digital Training', 'Project Management', 'Community Outreach', 'Technical Support', 'Content Development'],
  contactPerson: {
    name: 'Priya Sharma',
    email: 'priya@ngoindia.org',
    phone: '+91 9876543210'
  },
  timeline: [
    {
      phase: 'Project Planning & Setup',
      description: 'Site selection, partner coordination, and infrastructure setup',
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      status: 'completed'
    },
    {
      phase: 'Instructor Training Program',
      description: 'Training local instructors and establishing learning centers',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      status: 'active'
    },
    {
      phase: 'Community Outreach & Enrollment',
      description: 'Community engagement and participant enrollment',
      startDate: '2024-08-01',
      endDate: '2024-09-30',
      status: 'upcoming'
    },
    {
      phase: 'Digital Literacy Training',
      description: 'Conducting digital literacy programs for beneficiaries',
      startDate: '2024-10-01',
      endDate: '2024-12-15',
      status: 'upcoming'
    },
    {
      phase: 'Impact Assessment & Sustainability',
      description: 'Evaluating impact and ensuring program sustainability',
      startDate: '2024-12-16',
      endDate: '2024-12-31',
      status: 'upcoming'
    }
  ],
  resources: [
    {
      type: 'Infrastructure',
      description: '50 Digital Learning Centers with computers and internet',
      provider: 'Tech for Good Foundation'
    },
    {
      type: 'Training Materials',
      description: 'Curriculum development and training resources',
      provider: 'Education First NGO'
    },
    {
      type: 'Community Mobilization',
      description: 'Local community engagement and outreach',
      provider: 'Rural Development Trust'
    },
    {
      type: 'Project Management',
      description: 'Overall coordination and monitoring',
      provider: 'NGO INDIA'
    }
  ]
};

export function JointProjectDetailsPage({ id }: { id: string }) {
  const [project] = useState<JointProject>(mockProject);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-orange-500';
      case 'planning': return 'bg-blue-500';
      case 'on-hold': return 'bg-gray-500';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-orange-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return TrendingUp;
      case 'planning': return Clock;
      case 'on-hold': return AlertCircle;
      case 'upcoming': return Clock;
      default: return Clock;
    }
  };

  const fundingPercentage = Math.min((project.currentFunding / project.budget) * 100, 100);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'partners', name: 'Partners' },
    { id: 'resources', name: 'Resources' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
            </div>
            <button
              onClick={() => window.location.href = '/joint-projects'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                    {React.createElement(getStatusIcon(project.status), { className: "w-4 h-4" })}
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-lg opacity-90">Led by {project.leadOrganization}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{(project.budget / 100000).toFixed(1)}L</div>
            <div className="text-gray-600">Total Budget</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{fundingPercentage.toFixed(0)}%</div>
            <div className="text-gray-600">Funded</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{project.beneficiaries.toLocaleString()}</div>
            <div className="text-gray-600">Beneficiaries</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Handshake className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{project.partnerOrganizations.length + 1}</div>
            <div className="text-gray-600">Organizations</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 justify-center">
            <Handshake className="w-5 h-5" />
            Join This Project
          </button>
          <button className="border border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 justify-center">
            <Target className="w-5 h-5" />
            Support Project
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
            <Share2 className="w-5 h-5" />
            Share Project
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Description</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Objectives</h4>
                    <ul className="space-y-2">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{project.beneficiaries.toLocaleString()} beneficiaries</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">{project.contactPerson.name}</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${project.contactPerson.email}`} className="text-orange-600 hover:underline">
                            {project.contactPerson.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${project.contactPerson.phone}`} className="text-orange-600 hover:underline">
                            {project.contactPerson.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Funding Progress</h4>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>₹{project.currentFunding.toLocaleString()} raised</span>
                      <span>₹{project.budget.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${fundingPercentage}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-orange-600">{fundingPercentage.toFixed(0)}%</span>
                      <span className="text-gray-500 text-sm ml-1">completed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h3>
                <div className="space-y-6">
                  {project.timeline.map((phase, index) => {
                    const StatusIcon = getStatusIcon(phase.status);
                    return (
                      <div key={index} className="flex gap-4">
                        <div className={`p-2 rounded-full ${getStatusColor(phase.status)} flex-shrink-0`}>
                          <StatusIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{phase.phase}</h4>
                          <p className="text-gray-600 mb-2">{phase.description}</p>
                          <div className="text-sm text-gray-500">
                            {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Partners Tab */}
            {activeTab === 'partners' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Partner Organizations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Organization */}
                  <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Building className="w-6 h-6 text-orange-600" />
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs font-medium">LEAD</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.leadOrganization}</h4>
                    <p className="text-gray-600">Project coordination, overall management, and impact monitoring</p>
                  </div>

                  {/* Partner Organizations */}
                  {project.partnerOrganizations.map((partner, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Handshake className="w-6 h-6 text-blue-600" />
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">PARTNER</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{partner}</h4>
                      <p className="text-gray-600">Contributing specialized expertise and resources</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.resources.map((resource, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{resource.type}</h4>
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-600">{resource.provider}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}