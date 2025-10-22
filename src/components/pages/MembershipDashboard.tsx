import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Award, TrendingUp, Download, Bell, Settings, Users, Heart, Star, Mail, Phone } from 'lucide-react';

interface MemberProfile {
  name: string;
  email: string;
  phone: string;
  membershipTier: string;
  memberSince: string;
  membershipExpiry: string;
  totalContributions: number;
  volunteerHours: number;
  eventsAttended: number;
  avatar: string;
}

const mockMemberProfile: MemberProfile = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 9876543210',
  membershipTier: 'Active Member',
  memberSince: '2023-01-15',
  membershipExpiry: '2024-01-15',
  totalContributions: 25000,
  volunteerHours: 48,
  eventsAttended: 12,
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
};

const recentActivities = [
  {
    id: 1,
    type: 'donation',
    title: 'Donated to Education Campaign',
    amount: '₹2,000',
    date: '2024-01-10',
    icon: Heart
  },
  {
    id: 2,
    type: 'volunteer',
    title: 'Volunteered at Community Event',
    hours: '6 hours',
    date: '2024-01-08',
    icon: Users
  },
  {
    id: 3,
    type: 'event',
    title: 'Attended Member Meetup',
    location: 'Bangalore',
    date: '2024-01-05',
    icon: Calendar
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Monthly Member Meetup',
    date: '2024-01-25',
    time: '6:00 PM',
    location: 'Community Center, Bangalore',
    type: 'Networking'
  },
  {
    id: 2,
    title: 'Project Site Visit',
    date: '2024-02-02',
    time: '10:00 AM',
    location: 'Rural School, Karnataka',
    type: 'Field Visit'
  },
  {
    id: 3,
    title: 'Impact Presentation',
    date: '2024-02-15',
    time: '7:00 PM',
    location: 'Online Webinar',
    type: 'Webinar'
  }
];

export function MembershipDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activities', name: 'Activities', icon: TrendingUp },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'profile', name: 'Profile', icon: Settings }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Supporter Member': return 'bg-orange-100 text-orange-800';
      case 'Active Member': return 'bg-blue-100 text-blue-800';
      case 'Champion Member': return 'bg-purple-100 text-purple-800';
      case 'Patron Member': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const daysUntilExpiry = Math.ceil((new Date(mockMemberProfile.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
              <h1 className="text-xl font-bold text-gray-900">Member Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={mockMemberProfile.avatar}
              alt={mockMemberProfile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {mockMemberProfile.name}!</h1>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(mockMemberProfile.membershipTier)}`}>
                  {mockMemberProfile.membershipTier}
                </span>
                <span className="text-gray-600">Member since {new Date(mockMemberProfile.memberSince).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span className={`text-sm ${daysUntilExpiry <= 30 ? 'text-red-600' : 'text-gray-600'}`}>
                  Membership expires in {daysUntilExpiry} days
                </span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm">
                  Renew Membership
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{mockMemberProfile.totalContributions.toLocaleString()}</div>
            <div className="text-gray-600">Total Contributions</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockMemberProfile.volunteerHours}</div>
            <div className="text-gray-600">Volunteer Hours</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockMemberProfile.eventsAttended}</div>
            <div className="text-gray-600">Events Attended</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Gold</div>
            <div className="text-gray-600">Member Status</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Icon className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">
                              {activity.amount || activity.hours || activity.location} • {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Activity History</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg">
                        <div className="bg-orange-100 p-3 rounded-full">
                          <Icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                          <p className="text-gray-600">
                            {activity.amount || activity.hours || activity.location}
                          </p>
                          <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                        <button className="text-orange-600 hover:text-orange-700">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h4>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{event.location}</p>
                        </div>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {event.type}
                        </span>
                      </div>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                        Register
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h3>
                <div className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={mockMemberProfile.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={mockMemberProfile.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={mockMemberProfile.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Save Changes
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}