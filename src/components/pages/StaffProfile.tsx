import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Clock } from 'lucide-react';

export default function StaffProfile() {
  // Get staff ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const staffId = urlParams.get('id');

  // Mock staff data - in real app this would come from API
  const defaultStaffData = {
    '1': {
      name: 'Rajesh Kumar',
      position: 'Program Manager',
      department: 'Education',
      email: 'rajesh.kumar@ngoindia.org',
      phone: '+91 9876543210',
      location: 'Bengaluru, India',
      joinDate: '2022-03-15',
      employeeId: 'EMP001',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Experienced program manager with 8+ years in NGO sector, specializing in education initiatives and community development.',
      skills: ['Project Management', 'Community Outreach', 'Grant Writing', 'Team Leadership'],
      recentActivity: [
        { date: '2024-01-15', activity: 'Completed Q4 Education Program Review' },
        { date: '2024-01-10', activity: 'Submitted Annual Impact Report' },
        { date: '2024-01-05', activity: 'Conducted Staff Training Session' }
      ]
    },
    '2': {
      name: 'Priya Sharma',
      position: 'Finance Officer',
      department: 'Finance',
      email: 'priya.sharma@ngoindia.org',
      phone: '+91 9876543211',
      location: 'Mumbai, India',
      joinDate: '2021-07-20',
      employeeId: 'EMP002',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      bio: 'Certified finance professional managing organizational budgets and ensuring compliance with financial regulations.',
      skills: ['Financial Analysis', 'Budget Management', 'Compliance', 'Audit Coordination'],
      recentActivity: [
        { date: '2024-01-14', activity: 'Processed Monthly Payroll' },
        { date: '2024-01-12', activity: 'Updated Financial Dashboard' },
        { date: '2024-01-08', activity: 'Completed Donor Fund Allocation' }
      ]
    },
    '3': {
      name: 'Anita Patel',
      position: 'Field Coordinator',
      department: 'Field Operations',
      email: 'anita.patel@ngoindia.org',
      phone: '+91 9876543212',
      location: 'Ahmedabad, India',
      joinDate: '2023-03-20',
      employeeId: 'EMP003',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Dedicated field coordinator with expertise in community engagement and grassroots program implementation.',
      skills: ['Community Relations', 'Field Operations', 'Program Implementation', 'Local Partnerships'],
      recentActivity: [
        { date: '2024-01-16', activity: 'Completed Community Needs Assessment' },
        { date: '2024-01-11', activity: 'Organized Village Health Camp' },
        { date: '2024-01-06', activity: 'Trained Local Volunteers' }
      ]
    },
    '4': {
      name: 'Amit Singh',
      position: 'Communications Manager',
      department: 'Communications',
      email: 'amit.singh@ngoindia.org',
      phone: '+91 9876543213',
      location: 'Delhi, India',
      joinDate: '2022-08-05',
      employeeId: 'EMP004',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Creative communications professional focused on storytelling and digital outreach to amplify NGO impact.',
      skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Public Relations'],
      recentActivity: [
        { date: '2024-01-17', activity: 'Launched New Campaign Video' },
        { date: '2024-01-13', activity: 'Published Impact Newsletter' },
        { date: '2024-01-09', activity: 'Coordinated Media Interview' }
      ]
    }
  };

  // Get custom employees from localStorage
  const customEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]');
  
  // Create combined staff data object
  const staffData = { ...defaultStaffData };
  customEmployees.forEach((employee: any) => {
    staffData[employee.id] = {
      ...employee,
      employeeId: `EMP${employee.id.slice(-3)}`,
      bio: `${employee.position} at ${employee.department} department, dedicated to making a positive impact through NGO work.`,
      skills: ['Team Collaboration', 'Communication', 'Problem Solving', 'Adaptability'],
      recentActivity: [
        { date: new Date().toISOString().split('T')[0], activity: 'Recently joined the team' },
        { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], activity: 'Completed onboarding process' },
        { date: new Date(Date.now() - 172800000).toISOString().split('T')[0], activity: 'Started orientation program' }
      ]
    };
  });
  
  const staff = staffData[staffId as keyof typeof staffData];

  if (!staff) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Member Not Found</h1>
          <button 
            onClick={() => {
              localStorage.setItem('activeModule', 'hr');
              window.location.href = '/';
            }}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to HR Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => {
            localStorage.setItem('activeModule', 'hr');
            window.location.href = '/';
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to HR Management
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Staff Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex items-start gap-6 -mt-16">
            <img 
              src={staff.avatar} 
              alt={staff.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1 mt-16">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{staff.name}</h2>
                  <p className="text-lg text-gray-600">{staff.position}</p>
                  <p className="text-sm text-gray-500">{staff.department} Department</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {staff.status}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{staff.bio}</p>
              <div className="flex flex-wrap gap-2">
                {staff.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{staff.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{staff.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{staff.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="font-medium">{staff.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="font-medium">{staff.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Tenure</p>
                <p className="font-medium">
                  {Math.floor((new Date().getTime() - new Date(staff.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {staff.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.activity}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}