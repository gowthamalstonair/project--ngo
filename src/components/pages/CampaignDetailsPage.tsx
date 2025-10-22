import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Share2, Heart, Target, TrendingUp, MessageSquare, CheckCircle, DollarSign } from 'lucide-react';

interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface CampaignDetailsPageProps {
  id: string;
}

export function CampaignDetailsPage({ id }: CampaignDetailsPageProps) {
  const [donationAmount, setDonationAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [message, setMessage] = useState('');

  // Mock campaign data - in real app, fetch by ID
  const campaign = {
    id: '1',
    title: 'Education for 1000 Children',
    description: 'This campaign aims to provide quality education and essential school supplies to 1000 underprivileged children in rural areas across India. Your donation will help us purchase textbooks, notebooks, uniforms, and other educational materials that these children desperately need.',
    fullStory: `In the remote villages of rural India, thousands of children are deprived of basic education due to lack of resources. Many families cannot afford school supplies, uniforms, or even basic textbooks. This campaign is our effort to bridge this gap and ensure that every child gets access to quality education.

    Our team has identified 50 schools across 10 states where children are in urgent need of educational support. With your help, we can provide:
    
    • Textbooks and notebooks for all subjects
    • School uniforms and shoes
    • Educational toys and learning materials
    • Digital learning tablets for advanced students
    • Scholarships for exceptional students
    
    Every rupee you donate goes directly towards purchasing these materials. We maintain complete transparency and will provide regular updates on how your money is being used.`,
    goal: 100000,
    raised: 85000,
    donors: 156,
    daysLeft: 5,
    category: 'education',
    image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg',
    status: 'urgent',
    organizer: 'NGO INDIA Education Team',
    startDate: '2024-12-01',
    endDate: '2025-01-15'
  };

  const updates: CampaignUpdate[] = [
    {
      id: '1',
      date: '2025-01-10',
      title: 'Books Distributed to First 5 Schools',
      description: 'We successfully distributed textbooks and notebooks to 250 children across 5 schools in Maharashtra. The children were thrilled to receive their new books!',
      image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg'
    },
    {
      id: '2',
      date: '2025-01-05',
      title: 'Uniforms Ready for Distribution',
      description: 'All 500 school uniforms have been tailored and are ready for distribution. Next week, we will visit the schools in Karnataka and Tamil Nadu.',
    },
    {
      id: '3',
      date: '2024-12-28',
      title: 'Campaign Milestone: 75% Funded!',
      description: 'Thanks to your generous support, we have reached 75% of our funding goal. This means we can now proceed with purchasing materials for 750 children.',
    }
  ];

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const handleDonate = () => {
    // In real app, process donation
    alert(`Thank you for your donation of ₹${donationAmount}!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Campaign link copied to clipboard!');
    }
  };

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
              onClick={() => window.location.href = '/campaigns'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Campaigns
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{campaign.description}</p>
                
                <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{campaign.donors} supporters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>By {campaign.organizer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Story */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {campaign.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Updates</h2>
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-4 border-orange-500 pl-6 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-500">{update.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{update.description}</p>
                    {update.image && (
                      <img 
                        src={update.image} 
                        alt={update.title}
                        className="mt-4 rounded-lg w-full max-w-md h-48 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Donation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">₹{campaign.raised.toLocaleString()}</div>
                    <div className="text-gray-600">raised of ₹{campaign.goal.toLocaleString()} goal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(progressPercentage)}%</div>
                    <div className="text-gray-600 text-sm">completed</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{campaign.donors}</div>
                    <div className="text-sm text-gray-600">Donors</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{campaign.daysLeft}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Support This Campaign</h3>
                
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.toString())}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors font-medium ${
                          donationAmount === amount.toString()
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
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter custom amount"
                    min="10"
                  />
                </div>

                {/* Recurring Donation */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Make this a monthly donation
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message of Support (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Leave a message of encouragement..."
                  />
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonate}
                  disabled={!donationAmount || Number(donationAmount) < 10}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {donationAmount ? `Donate ₹${donationAmount}` : 'Enter Amount to Donate'}
                </button>

                {/* Trust Indicators */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Tax deductible under 80G</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>100% transparent fund usage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}