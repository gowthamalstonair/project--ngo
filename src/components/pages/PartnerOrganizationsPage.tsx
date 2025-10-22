import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Plus, Building, MapPin, Users, Globe, Mail, Phone, Handshake, Target, CheckCircle } from 'lucide-react';

interface PartnerOrganization {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  focusAreas: string[];
  establishedYear: number;
  teamSize: string;
  website: string;
  email: string;
  phone: string;
  activeProjects: number;
  completedProjects: number;
  beneficiariesReached: number;
  partnershipStatus: 'active' | 'potential' | 'past';
  expertise: string[];
}

const mockPartners: PartnerOrganization[] = [
  {
    id: '1',
    name: 'Tech for Good Foundation',
    description: 'Leveraging technology to solve social problems and bridge the digital divide in rural communities.',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Bangalore, Karnataka',
    focusAreas: ['Digital Literacy', 'Technology Training', 'Infrastructure Development'],
    establishedYear: 2018,
    teamSize: '25-50',
    website: 'www.techforgood.org',
    email: 'contact@techforgood.org',
    phone: '+91 9876543210',
    activeProjects: 5,
    completedProjects: 12,
    beneficiariesReached: 25000,
    partnershipStatus: 'active',
    expertise: ['Software Development', 'Digital Training', 'IT Infrastructure', 'Data Analytics']
  },
  {
    id: '2',
    name: 'Rural Development Trust',
    description: 'Empowering rural communities through sustainable development programs and capacity building initiatives.',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Hyderabad, Telangana',
    focusAreas: ['Rural Development', 'Agriculture', 'Water Management'],
    establishedYear: 2015,
    teamSize: '50-100',
    website: 'www.ruraldevelopmenttrust.org',
    email: 'info@ruraldevelopmenttrust.org',
    phone: '+91 9876543211',
    activeProjects: 8,
    completedProjects: 20,
    beneficiariesReached: 45000,
    partnershipStatus: 'active',
    expertise: ['Community Mobilization', 'Agricultural Training', 'Water Conservation', 'Microfinance']
  },
  {
    id: '3',
    name: 'Education First NGO',
    description: 'Dedicated to providing quality education and learning opportunities for underprivileged children.',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Delhi, NCR',
    focusAreas: ['Education', 'Child Development', 'Teacher Training'],
    establishedYear: 2012,
    teamSize: '100+',
    website: 'www.educationfirst.org',
    email: 'hello@educationfirst.org',
    phone: '+91 9876543212',
    activeProjects: 15,
    completedProjects: 35,
    beneficiariesReached: 80000,
    partnershipStatus: 'active',
    expertise: ['Curriculum Development', 'Teacher Training', 'Educational Technology', 'Child Psychology']
  },
  {
    id: '4',
    name: 'Water for All Foundation',
    description: 'Ensuring access to clean water and sanitation facilities for underserved communities across India.',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Mumbai, Maharashtra',
    focusAreas: ['Water & Sanitation', 'Public Health', 'Infrastructure'],
    establishedYear: 2010,
    teamSize: '75-100',
    website: 'www.waterforall.org',
    email: 'contact@waterforall.org',
    phone: '+91 9876543213',
    activeProjects: 6,
    completedProjects: 28,
    beneficiariesReached: 120000,
    partnershipStatus: 'active',
    expertise: ['Water Engineering', 'Sanitation Systems', 'Community Health', 'Project Management']
  },
  {
    id: '5',
    name: 'Green Earth Initiative',
    description: 'Environmental conservation and sustainable development through community-based programs.',
    logo: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Pune, Maharashtra',
    focusAreas: ['Environment', 'Sustainability', 'Climate Action'],
    establishedYear: 2016,
    teamSize: '25-50',
    website: 'www.greenearth.org',
    email: 'info@greenearth.org',
    phone: '+91 9876543214',
    activeProjects: 4,
    completedProjects: 8,
    beneficiariesReached: 15000,
    partnershipStatus: 'potential',
    expertise: ['Environmental Science', 'Renewable Energy', 'Waste Management', 'Climate Research']
  }
];

export function PartnerOrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [partners] = useState<PartnerOrganization[]>(mockPartners);

  const focusAreas = [
    { id: 'all', name: 'All Focus Areas' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'water', name: 'Water & Sanitation' },
    { id: 'environment', name: 'Environment' },
    { id: 'technology', name: 'Technology' },
    { id: 'rural', name: 'Rural Development' }
  ];

  const statuses = [
    { id: 'all', name: 'All Partners' },
    { id: 'active', name: 'Active Partners' },
    { id: 'potential', name: 'Potential Partners' },
    { id: 'past', name: 'Past Partners' }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocusArea = selectedFocusArea === 'all' || 
                            partner.focusAreas.some(area => area.toLowerCase().includes(selectedFocusArea));
    const matchesStatus = selectedStatus === 'all' || partner.partnershipStatus === selectedStatus;
    return matchesSearch && matchesFocusArea && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'potential': return 'bg-blue-500';
      case 'past': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active Partner';
      case 'potential': return 'Potential Partner';
      case 'past': return 'Past Partner';
      default: return 'Unknown';
    }
  };

  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.partnershipStatus === 'active').length;
  const totalBeneficiaries = partners.reduce((sum, p) => sum + p.beneficiariesReached, 0);
  const totalProjects = partners.reduce((sum, p) => sum + p.activeProjects + p.completedProjects, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
              <h1 className="text-xl font-bold text-gray-900">Partner Organizations</h1>
            </div>
            <button
              onClick={() => window.location.href = '/joint-projects'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Joint Projects
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner Organizations</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and connect with organizations that share our mission. Together, we can create greater impact 
            through strategic partnerships and collaborative initiatives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/partner-application'}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Become a Partner
            </button>
            <button
              onClick={() => window.location.href = '/joint-projects/create'}
              className="border border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 justify-center"
            >
              <Handshake className="w-5 h-5" />
              Propose Collaboration
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalPartners}</div>
            <div className="text-gray-600">Total Partners</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{activePartners}</div>
            <div className="text-gray-600">Active Partners</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{(totalBeneficiaries / 1000).toFixed(0)}K+</div>
            <div className="text-gray-600">Lives Impacted</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
            <div className="text-gray-600">Total Projects</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search partner organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedFocusArea}
                onChange={(e) => setSelectedFocusArea(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {focusAreas.map(area => (
                  <option key={area.id} value={area.id}>
                    {area.name}
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

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(partner.partnershipStatus)}`}>
                        {getStatusText(partner.partnershipStatus)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{partner.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Est. {partner.establishedYear} • {partner.teamSize} team members
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{partner.description}</p>
                
                {/* Focus Areas */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Focus Areas:</div>
                  <div className="flex flex-wrap gap-1">
                    {partner.focusAreas.slice(0, 3).map((area, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        {area}
                      </span>
                    ))}
                    {partner.focusAreas.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{partner.focusAreas.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{partner.activeProjects}</div>
                    <div className="text-gray-600">Active Projects</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{partner.completedProjects}</div>
                    <div className="text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{(partner.beneficiariesReached / 1000).toFixed(0)}K+</div>
                    <div className="text-gray-600">Beneficiaries</div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                        {partner.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${partner.email}`} className="text-orange-600 hover:underline">
                        {partner.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.location.href = `/partners/${partner.id}`}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => window.location.href = `/partners/${partner.id}/collaborate`}
                    className="border border-orange-500 text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                  >
                    Collaborate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No partners found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or invite new organizations to join our network.</p>
            <button
              onClick={() => window.location.href = '/partner-application'}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Invite Partners
            </button>
          </div>
        )}
      </div>
    </div>
  );
}