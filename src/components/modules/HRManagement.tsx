import React, { useState } from 'react';
import { 
  Users, UserPlus, Calendar, Award, 
  Clock, CheckCircle, AlertCircle, Star,
  Mail, Phone, MapPin, Briefcase,
  TrendingUp, FileText, Settings
} from 'lucide-react';
import { useScrollReset } from '../../hooks/useScrollReset';

export function HRManagement() {
  useScrollReset();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('hrActiveTab') || 'directory';
  });

  React.useEffect(() => {
    const savedTab = localStorage.getItem('hrActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
      localStorage.removeItem('hrActiveTab');
    }
  }, []);

  // Load custom employees from localStorage and merge with default staff
  const defaultStaff = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      position: 'Program Manager',
      department: 'Education',
      email: 'rajesh.kumar@ngoindia.org',
      phone: '+91 9876543210',
      location: 'Bengaluru, India',
      joinDate: '2022-03-15',
      status: 'Active',
      performance: 4.8,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      position: 'Finance Officer',
      department: 'Finance',
      email: 'priya.sharma@ngoindia.org',
      phone: '+91 9876543211',
      location: 'Mumbai, India',
      joinDate: '2021-07-20',
      status: 'Active',
      performance: 4.7,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Anita Patel',
      position: 'Field Coordinator',
      department: 'Field Operations',
      email: 'anita.patel@ngoindia.org',
      phone: '+91 9876543212',
      location: 'Ahmedabad, India',
      joinDate: '2023-03-20',
      status: 'Active',
      performance: 4.6,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Amit Singh',
      position: 'Communications Manager',
      department: 'Communications',
      email: 'amit.singh@ngoindia.org',
      phone: '+91 9876543213',
      location: 'Delhi, India',
      joinDate: '2022-08-05',
      status: 'Active',
      performance: 4.5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // Get custom employees from localStorage and merge with default staff
  const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]');
  const staff = [...defaultStaff, ...customEmployees];

  const leaveRequests = [
    {
      id: '1',
      employee: 'Rajesh Kumar',
      type: 'Annual Leave',
      startDate: '2025-02-15',
      endDate: '2025-02-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: '2025-01-10'
    },
    {
      id: '2',
      employee: 'Anita Patel',
      type: 'Sick Leave',
      startDate: '2025-01-18',
      endDate: '2025-01-19',
      days: 2,
      reason: 'Medical treatment',
      status: 'Approved',
      appliedDate: '2025-01-15'
    },
    {
      id: '3',
      employee: 'Amit Singh',
      type: 'Personal Leave',
      startDate: '2025-02-01',
      endDate: '2025-02-01',
      days: 1,
      reason: 'Personal work',
      status: 'Approved',
      appliedDate: '2025-01-12'
    }
  ];

  const performanceReviews = [
    {
      id: '1',
      employee: 'Rajesh Kumar',
      period: 'Q4 2024',
      score: 4.8,
      status: 'Completed',
      reviewDate: '2024-12-15',
      strengths: ['Project Management', 'Community Outreach', 'Team Leadership'],
      improvements: ['Technical Skills', 'Time Management']
    },
    {
      id: '2',
      employee: 'Priya Sharma',
      period: 'Q4 2024',
      score: 4.7,
      status: 'Completed',
      reviewDate: '2024-12-18',
      strengths: ['Financial Analysis', 'Budget Management', 'Compliance'],
      improvements: ['Leadership', 'Communication']
    },
    {
      id: '3',
      employee: 'Anita Patel',
      period: 'Q4 2024',
      score: 4.6,
      status: 'Completed',
      reviewDate: '2024-12-20',
      strengths: ['Community Relations', 'Field Operations', 'Problem Solving'],
      improvements: ['Documentation', 'Reporting']
    },
    {
      id: '4',
      employee: 'Amit Singh',
      period: 'Q4 2024',
      score: 4.5,
      status: 'Pending',
      reviewDate: '2025-01-20',
      strengths: ['Digital Marketing', 'Content Creation', 'Social Media'],
      improvements: ['Leadership', 'Strategic Planning']
    }
  ];

  const stats = [
    {
      label: 'Total Staff',
      value: staff.length.toString(),
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Active Employees',
      value: staff.filter(s => s.status === 'Active').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Avg. Performance',
      value: (staff.reduce((sum, s) => sum + s.performance, 0) / staff.length).toFixed(1),
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      label: 'Pending Reviews',
      value: performanceReviews.filter(r => r.status === 'Pending').length.toString(),
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDirectoryTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{employee.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{employee.position}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                {employee.department}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {employee.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {employee.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Joined: {employee.joinDate}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{employee.performance}/5</span>
              </div>
              <button 
                onClick={() => window.location.href = `/staff-profile?id=${employee.id}`}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaveTab = () => (
    <div className="space-y-4">
      {leaveRequests.map((request) => (
        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">Leave Type</p>
                  <p className="font-medium">{request.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{request.startDate} - {request.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days</p>
                  <p className="font-medium">{request.days} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applied</p>
                  <p className="font-medium">{request.appliedDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reason</p>
                <p className="font-medium">{request.reason}</p>
              </div>
            </div>
            {request.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert(`Leave request APPROVED for ${request.employee}\n\nType: ${request.type}\nDuration: ${request.startDate} to ${request.endDate}\nDays: ${request.days}\nReason: ${request.reason}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button 
                  onClick={() => alert(`Leave request REJECTED for ${request.employee}\n\nType: ${request.type}\nDuration: ${request.startDate} to ${request.endDate}\nReason: ${request.reason}\n\nPlease provide feedback to the employee.`)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-4">
      {performanceReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{review.employee}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                  {review.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Review Period</p>
                  <p className="font-medium">{review.period}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{review.score}/5</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Review Date</p>
                  <p className="font-medium">{review.reviewDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-1">
                    {review.strengths.map((strength, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Areas for Improvement</p>
                  <div className="flex flex-wrap gap-1">
                    {review.improvements.map((improvement, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {improvement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.location.href = `/performance-review-details?id=${review.id}`}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Details
              </button>
              {review.status === 'Pending' && (
                <button 
                  onClick={() => alert(`Complete Performance Review\n\nEmployee: ${review.employee}\nPeriod: ${review.period}\n\nThis would open a form to:\n- Add final comments\n- Set performance goals\n- Schedule follow-up meeting\n- Submit final review`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Complete Review
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Management</h1>
            <p className="text-gray-600">Manage staff, performance, and organizational development</p>
          </div>
          <button 
            onClick={() => window.location.href = '/add-employee'}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'directory', label: 'Staff Directory', icon: Users },
              { id: 'leave', label: 'Leave Management', icon: Calendar },
              { id: 'performance', label: 'Performance Reviews', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'directory' && renderDirectoryTab()}
          {activeTab === 'leave' && renderLeaveTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
        </div>
      </div>
    </div>
  );
}