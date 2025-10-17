import React, { useState } from 'react';
import { 
  Heart, User, Mail, Phone, MapPin, BookOpen, 
  Users, Droplets, Shield, Eye, Award, TrendingUp,
  CheckCircle, X, Star, Quote
} from 'lucide-react';

interface DonationPageProps {
  onClose: () => void;
}

export function DonationPage({ onClose }: DonationPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    amount: '',
    category: 'education'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!formData.amount.trim()) newErrors.amount = 'Amount is required';
    else if (Number(formData.amount) < 100) newErrors.amount = 'Minimum ₹100';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onClose();
  };

  const impactCards = [
    { amount: 500, icon: BookOpen, title: 'Education Support', desc: 'Provides school supplies for 2 children for a month', color: 'bg-blue-500' },
    { amount: 1000, icon: Users, title: 'Community Care', desc: 'Supports healthcare for 5 families', color: 'bg-green-500' },
    { amount: 5000, icon: Droplets, title: 'Clean Water', desc: 'Ensures clean water access for 20 people', color: 'bg-teal-500' }
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'Thanks to your support, my daughter can now attend school regularly.', image: '👩' },
    { name: 'Rajesh Kumar', text: 'The healthcare program saved my family during a critical time.', image: '👨' },
    { name: 'Meera Patel', text: 'Clean water in our village has transformed our daily lives completely.', image: '👵' }
  ];

  const trustFeatures = [
    { icon: Eye, title: 'Transparency', desc: 'Track every rupee' },
    { icon: Award, title: 'Tax Benefits', desc: '80G certified' },
    { icon: TrendingUp, title: 'Direct Impact', desc: 'No middlemen' },
    { icon: Heart, title: 'Lasting Change', desc: 'Sustainable solutions' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 rounded-t-2xl flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Donate Now</h1>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Lives Today</h2>
          <p className="text-xl mb-6 opacity-90">Your generosity creates lasting change in communities across India</p>
          <button 
            onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Donate Now
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Cards */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Impact</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {impactCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                         onClick={() => handleInputChange('amount', card.amount.toString())}>
                      <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">₹{card.amount}</h4>
                      <h5 className="font-medium text-gray-800 mb-2">{card.title}</h5>
                      <p className="text-sm text-gray-600">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Stories of Hope */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Stories of Hope</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <Quote className="w-8 h-8 text-orange-500 mb-4" />
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Trust Us */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Trust Us</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trustFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="text-center p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-teal-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-1">
            <div id="donation-form" className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Make Your Donation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />Mobile *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.mobile ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[500, 1000, 5000].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleInputChange('amount', amount.toString())}
                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData.amount === amount.toString()
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
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.amount ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="Enter amount"
                    min="100"
                  />
                  {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex gap-2">
                    {['education', 'healthcare', 'environment'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleInputChange('category', cat)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.category === cat
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isProcessing ? 'Processing...' : 'Continue to Payment'}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}