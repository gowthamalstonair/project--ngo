import React, { useState } from 'react';
import { ArrowLeft, Calendar, CreditCard, Pause, Play, Edit, Trash2, DollarSign, Users, TrendingUp, Heart } from 'lucide-react';

interface RecurringDonation {
  id: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  campaign: string;
  startDate: string;
  nextPayment: string;
  status: 'active' | 'paused' | 'cancelled';
  totalDonated: number;
  paymentMethod: string;
}

export function RecurringDonationsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'setup'>('active');
  const [newDonation, setNewDonation] = useState({
    amount: '',
    frequency: 'monthly' as 'monthly' | 'yearly',
    campaign: 'general',
    paymentMethod: 'card'
  });

  const recurringDonations: RecurringDonation[] = [
    {
      id: '1',
      amount: 1000,
      frequency: 'monthly',
      campaign: 'Education for 1000 Children',
      startDate: '2024-10-15',
      nextPayment: '2025-02-15',
      status: 'active',
      totalDonated: 4000,
      paymentMethod: 'Credit Card ending in 4532'
    },
    {
      id: '2',
      amount: 5000,
      frequency: 'yearly',
      campaign: 'General Fund',
      startDate: '2024-01-01',
      nextPayment: '2025-01-01',
      status: 'active',
      totalDonated: 5000,
      paymentMethod: 'UPI - Google Pay'
    },
    {
      id: '3',
      amount: 500,
      frequency: 'monthly',
      campaign: 'Clean Water Project',
      startDate: '2024-08-01',
      nextPayment: '2025-02-01',
      status: 'paused',
      totalDonated: 3000,
      paymentMethod: 'Net Banking - SBI'
    }
  ];

  const campaigns = [
    { id: 'general', name: 'General Fund' },
    { id: 'education', name: 'Education for 1000 Children' },
    { id: 'water', name: 'Clean Water Project' },
    { id: 'healthcare', name: 'Emergency Medical Equipment' },
    { id: 'food', name: 'Food Relief Program' }
  ];

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'paused' | 'cancelled') => {
    // In real app, update via API
    alert(`Donation ${newStatus === 'active' ? 'resumed' : newStatus === 'paused' ? 'paused' : 'cancelled'} successfully!`);
  };

  const handleSetupRecurring = () => {
    if (!newDonation.amount || Number(newDonation.amount) < 100) {
      alert('Please enter a valid amount (minimum ₹100)');
      return;
    }
    
    // In real app, process setup via API
    alert(`Recurring donation of ₹${newDonation.amount} ${newDonation.frequency} set up successfully!`);
    setNewDonation({ amount: '', frequency: 'monthly', campaign: 'general', paymentMethod: 'card' });
  };

  const totalMonthlyDonations = recurringDonations
    .filter(d => d.status === 'active')
    .reduce((sum, d) => sum + (d.frequency === 'monthly' ? d.amount : d.amount / 12), 0);

  const totalLifetimeDonations = recurringDonations.reduce((sum, d) => sum + d.totalDonated, 0);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recurring Donations</h1>
          <p className="text-xl text-gray-600">Manage your monthly and yearly donations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{totalMonthlyDonations.toLocaleString()}</div>
            <div className="text-gray-600">Monthly Impact</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{totalLifetimeDonations.toLocaleString()}</div>
            <div className="text-gray-600">Total Donated</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{recurringDonations.filter(d => d.status === 'active').length}</div>
            <div className="text-gray-600">Active Donations</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Recurring Donations
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'setup'
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Set Up New Donation
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'active' && (
              <div className="space-y-6">
                {recurringDonations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">💝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No recurring donations yet</h3>
                    <p className="text-gray-600 mb-6">Set up a recurring donation to make a lasting impact</p>
                    <button
                      onClick={() => setActiveTab('setup')}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Set Up Recurring Donation
                    </button>
                  </div>
                ) : (
                  recurringDonations.map((donation) => (
                    <div key={donation.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{donation.campaign}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(donation.status)}`}>
                              {getStatusIcon(donation.status)}
                              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Amount:</span>
                              <div className="text-lg font-bold text-orange-600">₹{donation.amount.toLocaleString()}</div>
                              <div className="text-xs">{donation.frequency}</div>
                            </div>
                            <div>
                              <span className="font-medium">Next Payment:</span>
                              <div>{new Date(donation.nextPayment).toLocaleDateString('en-IN')}</div>
                            </div>
                            <div>
                              <span className="font-medium">Total Donated:</span>
                              <div className="font-semibold">₹{donation.totalDonated.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="font-medium">Payment Method:</span>
                              <div>{donation.paymentMethod}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {donation.status === 'active' && (
                            <button
                              onClick={() => handleStatusChange(donation.id, 'paused')}
                              className="flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                            >
                              <Pause className="w-4 h-4" />
                              Pause
                            </button>
                          )}
                          {donation.status === 'paused' && (
                            <button
                              onClick={() => handleStatusChange(donation.id, 'active')}
                              className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Resume
                            </button>
                          )}
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleStatusChange(donation.id, 'cancelled')}
                            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'setup' && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Up Recurring Donation</h2>
                  <p className="text-gray-600">Make a lasting impact with regular contributions</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setNewDonation(prev => ({ ...prev, amount: amount.toString() }))}
                          className={`py-3 px-4 rounded-lg border-2 transition-colors font-medium ${
                            newDonation.amount === amount.toString()
                              ? 'border-orange-500 bg-orange-50 text-orange-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={newDonation.amount}
                      onChange={(e) => setNewDonation(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter custom amount"
                      min="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Frequency
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setNewDonation(prev => ({ ...prev, frequency: 'monthly' }))}
                        className={`p-4 rounded-lg border-2 transition-colors text-center ${
                          newDonation.frequency === 'monthly'
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">Monthly</span>
                        <div className="text-sm text-gray-600">Every month</div>
                      </button>
                      <button
                        onClick={() => setNewDonation(prev => ({ ...prev, frequency: 'yearly' }))}
                        className={`p-4 rounded-lg border-2 transition-colors text-center ${
                          newDonation.frequency === 'yearly'
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">Yearly</span>
                        <div className="text-sm text-gray-600">Every year</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Campaign
                    </label>
                    <select
                      value={newDonation.campaign}
                      onChange={(e) => setNewDonation(prev => ({ ...prev, campaign: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {campaigns.map(campaign => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                        { id: 'upi', name: 'UPI', icon: CreditCard },
                        { id: 'netbanking', name: 'Net Banking', icon: CreditCard }
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setNewDonation(prev => ({ ...prev, paymentMethod: method.id }))}
                            className={`p-4 rounded-lg border-2 transition-colors text-center ${
                              newDonation.paymentMethod === method.id
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-medium text-sm">{method.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Impact Preview */}
                  {newDonation.amount && Number(newDonation.amount) >= 100 && (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            ₹{(Number(newDonation.amount) * (newDonation.frequency === 'monthly' ? 12 : 1)).toLocaleString()}
                          </div>
                          <div className="text-gray-700">Annual contribution</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {Math.floor(Number(newDonation.amount) / 50)}
                          </div>
                          <div className="text-gray-700">Children helped {newDonation.frequency}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSetupRecurring}
                    disabled={!newDonation.amount || Number(newDonation.amount) < 100}
                    className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {newDonation.amount ? `Set Up ₹${newDonation.amount} ${newDonation.frequency} donation` : 'Enter amount to continue'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}