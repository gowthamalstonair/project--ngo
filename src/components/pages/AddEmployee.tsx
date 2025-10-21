import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Briefcase, Building, ArrowLeft, Save
} from 'lucide-react';

export function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    location: '',
    startDate: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Get existing employees from localStorage
      const existingEmployees = JSON.parse(localStorage.getItem('customEmployees') || '[]');
      
      // Create new employee object
      const newEmployee = {
        id: Date.now().toString(),
        name: formData.name,
        position: formData.position,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        joinDate: formData.startDate,
        status: 'Active',
        performance: 4.0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=f97316&color=fff&size=150`
      };
      
      // Add new employee to the list
      const updatedEmployees = [...existingEmployees, newEmployee];
      localStorage.setItem('customEmployees', JSON.stringify(updatedEmployees));
      
      alert(`Employee Added Successfully!\n\nName: ${formData.name}\nPosition: ${formData.position}\nDepartment: ${formData.department}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nStart Date: ${formData.startDate}`);
      
      // Redirect to HR Management
      localStorage.setItem('activeModule', 'hr');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
            </div>
            <button
              onClick={() => {
                localStorage.setItem('activeModule', 'hr');
                window.location.href = '/';
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to HR Management
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {/* Form Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Employee</h1>
              <p className="text-gray-600">Fill in the details to add a new team member</p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                  } focus:ring-2 focus:border-transparent`}
                  placeholder="Enter employee's full name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Position and Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Position *
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.position ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="e.g., Program Manager"
                  />
                  {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.department ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                  >
                    <option value="">Select Department</option>
                    <option value="Executive">Executive</option>
                    <option value="Program Management">Program Management</option>
                    <option value="Field Operations">Field Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Communications">Communications</option>
                    <option value="Administration">Administration</option>
                  </select>
                  {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="employee@ngoindia.org"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Location and Start Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.location ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="e.g., New Delhi, Mumbai"
                  />
                  {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.startDate ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center pt-6">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 text-lg"
                >
                  <Save className="w-5 h-5" />
                  Add Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}