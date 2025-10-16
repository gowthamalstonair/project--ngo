import React, { useState } from 'react';
import { 
  Heart, CreditCard, Smartphone, Building, 
  User, Mail, DollarSign, MessageSquare,
  CheckCircle, ArrowLeft, Shield, Award,
  Home, Phone, MapPin, CreditCard as PanIcon,
  Users, Target, Package, Upload, FileText
} from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber';

export function DonatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    country: '',
    city: '',
    pincode: '',
    panCard: '',
    category: 'money',
    amount: '',
    things: '',
    thingsFiles: [] as File[],
    donorType: 'individual',
    // Family member details
    familyMemberName: '',
    familyMemberRelation: '',
    familyMemberContact: '',
    // Affiliated details
    affiliatedOrganization: '',
    affiliatedPosition: '',
    affiliatedContact: '',
    // Corporate details
    corporateName: '',
    corporateAddress: '',
    corporateContact: '',
    corporateGST: '',
    // Grant/Foundation details
    foundationName: '',
    foundationAddress: '',
    foundationContact: '',
    foundationRegistration: '',
    purpose: '',
    message: '',
    paymentMethod: 'card'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    if (!formData.panCard.trim()) {
      newErrors.panCard = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
      newErrors.panCard = 'Please enter a valid PAN number';
    }

    if (formData.category === 'money') {
      if (!formData.amount.trim()) {
        newErrors.amount = 'Donation amount is required';
      } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      } else if (Number(formData.amount) < 10) {
        newErrors.amount = 'Minimum donation amount is ₹10';
      }
    } else {
      if (!formData.things.trim()) {
        newErrors.things = 'Please describe what you want to donate';
      }
    }



    // Validate donor type specific fields
    if (formData.donorType === 'family') {
      if (!formData.familyMemberName.trim()) {
        newErrors.familyMemberName = 'Family member name is required';
      }
      if (!formData.familyMemberRelation.trim()) {
        newErrors.familyMemberRelation = 'Relation is required';
      }
    } else if (formData.donorType === 'affiliated') {
      if (!formData.affiliatedOrganization.trim()) {
        newErrors.affiliatedOrganization = 'Organization name is required';
      }
      if (!formData.affiliatedPosition.trim()) {
        newErrors.affiliatedPosition = 'Position is required';
      }
    } else if (formData.donorType === 'corporate') {
      if (!formData.corporateName.trim()) {
        newErrors.corporateName = 'Corporate name is required';
      }
      if (!formData.corporateAddress.trim()) {
        newErrors.corporateAddress = 'Corporate address is required';
      }
    } else if (formData.donorType === 'grant') {
      if (!formData.foundationName.trim()) {
        newErrors.foundationName = 'Foundation name is required';
      }
      if (!formData.foundationAddress.trim()) {
        newErrors.foundationAddress = 'Foundation address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, thingsFiles: [...prev.thingsFiles, ...fileArray] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      thingsFiles: prev.thingsFiles.filter((_, i) => i !== index)
    }));
  };

  const handleNext = async () => {
    if (validateForm()) {
      if (formData.category === 'things') {
        // Skip payment step for things donation
        setIsProcessing(true);
        try {
          // Generate receipt
          const receiptData = generateReceipt();
          
          // Send thank you email with receipt
          await sendThankYouEmail(receiptData);
          
          // Store receipt data for display
          setFormData(prev => ({ ...prev, receiptData }));
          
          setStep(3);
        } catch (error) {
          setErrors({ payment: 'Submission failed. Please try again.' });
        } finally {
          setIsProcessing(false);
        }
      } else {
        setStep(2);
      }
    }
  };

  const generateReceipt = () => {
    const receiptData = {
      receiptNo: `NGO-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      donor: formData.name,
      email: formData.email,
      panCard: formData.panCard,
      category: formData.category,
      amount: formData.category === 'money' ? formData.amount : 'N/A',
      things: formData.category === 'things' ? formData.things : 'N/A',
      donorType: formData.donorType,
      purpose: formData.purpose,
      organization: 'NGO INDIA'
    };
    return receiptData;
  };

  const sendThankYouEmail = async (receiptData: any) => {
    try {
      // Create comprehensive email content with receipt
      const emailContent = {
        to: formData.email,
        from: 'noreply@ngoindia.org',
        subject: 'Thank You for Your Generous Donation - NGO INDIA Receipt',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Your Donation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You for Your Donation!</h1>
                <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 16px;">NGO INDIA - Creating Lasting Change</p>
              </div>
              
              <!-- Main Content -->
              <div style="padding: 30px 20px; background: #ffffff;">
                <h2 style="color: #374151; margin-top: 0; font-size: 24px;">Dear ${receiptData.donor},</h2>
                <p style="color: #6b7280; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
                  We are deeply grateful for your generous donation to NGO INDIA. Your contribution will make a real difference in the lives of those we serve across India.
                </p>
                
                <!-- Receipt Section -->
                <div style="background: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #f97316;">
                  <h3 style="color: #374151; margin-top: 0; font-size: 20px; margin-bottom: 20px;">🧾 Official Donation Receipt</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Receipt Number:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.receiptNo}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.date}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Donor Name:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.donor}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Email:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.email}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">PAN Number:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.panCard}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Category:</td><td style="padding: 8px 0; color: #374151; font-weight: bold; text-transform: capitalize;">${receiptData.category}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Donor Type:</td><td style="padding: 8px 0; color: #374151; font-weight: bold; text-transform: capitalize;">${receiptData.donorType}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Purpose:</td><td style="padding: 8px 0; color: #374151; font-weight: bold;">${receiptData.purpose}</td></tr>
                    ${receiptData.category === 'money' ? 
                      `<tr style="border-top: 2px solid #e5e7eb;"><td style="padding: 15px 0 8px 0; color: #374151; font-weight: bold; font-size: 18px;">Donation Amount:</td><td style="padding: 15px 0 8px 0; color: #f97316; font-weight: bold; font-size: 20px;">₹${receiptData.amount}</td></tr>` : 
                      `<tr style="border-top: 2px solid #e5e7eb;"><td style="padding: 15px 0 8px 0; color: #374151; font-weight: bold;">Items Donated:</td><td style="padding: 15px 0 8px 0; color: #374151; font-weight: bold;">${receiptData.things}</td></tr>`
                    }
                  </table>
                </div>
                
                <!-- Tax Information -->
                <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <h4 style="color: #1e40af; margin-top: 0; font-size: 16px;">📋 Tax Deduction Information</h4>
                  <p style="color: #1e3a8a; line-height: 1.5; margin: 0; font-size: 14px;">
                    This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. 
                    Please retain this receipt for your tax filing records.
                  </p>
                </div>
                
                <!-- Impact Message -->
                <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                  <h4 style="color: #166534; margin-top: 0; font-size: 18px;">🌟 Your Impact</h4>
                  <p style="color: #15803d; line-height: 1.6; margin: 0; font-size: 15px;">
                    Your generous contribution helps us provide education, healthcare, and essential services to underserved communities across India. Together, we are creating lasting positive change!
                  </p>
                </div>
                
                <!-- Contact Information -->
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 14px;">
                    If you have any questions about your donation or need additional documentation, please contact us:
                  </p>
                  <p style="color: #374151; margin: 10px 0 0 0; font-size: 14px;">
                    📧 Email: info@ngoindia.org<br>
                    📞 Phone: +91 11 4567 8900<br>
                    📍 Address: New Delhi, India
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background: #374151; padding: 25px 20px; text-align: center;">
                <p style="color: #d1d5db; margin: 0; font-size: 14px; font-weight: 500;">Thank you for supporting NGO INDIA</p>
                <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 12px;">
                  © 2025 NGO INDIA. All rights reserved.<br>
                  This is an automated email. Please do not reply to this message.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        // Plain text version for email clients that don't support HTML
        text: `
          Dear ${receiptData.donor},
          
          Thank you for your generous donation to NGO INDIA!
          
          DONATION RECEIPT
          ================
          Receipt Number: ${receiptData.receiptNo}
          Date: ${receiptData.date}
          Donor: ${receiptData.donor}
          Email: ${receiptData.email}
          PAN: ${receiptData.panCard}
          Category: ${receiptData.category}
          Donor Type: ${receiptData.donorType}
          Purpose: ${receiptData.purpose}
          ${receiptData.category === 'money' ? 
            `Amount: ₹${receiptData.amount}` : 
            `Items Donated: ${receiptData.things}`
          }
          
          This donation is tax deductible under Section 80G of the Income Tax Act.
          
          Contact us: info@ngoindia.org | +91 11 4567 8900
          
          Thank you for supporting our mission!
          NGO INDIA Team
        `
      };
      
      // Log email details for debugging
      console.log('📧 Preparing to send thank you email...');
      console.log('To:', formData.email);
      console.log('Subject:', emailContent.subject);
      
      // In a real application, integrate with email service:
      // Examples:
      // - SendGrid: await sgMail.send(emailContent)
      // - Nodemailer: await transporter.sendMail(emailContent)
      // - AWS SES: await ses.sendEmail(emailContent)
      // - EmailJS: await emailjs.send('service_id', 'template_id', emailContent)
      
      // For now, simulate the email sending process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful email delivery
      console.log('✅ Email sent successfully!');
      
      // Show user confirmation
      alert(`Receipt sent to ${formData.email}. Please check your inbox.`);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      
      alert(`Donation successful! Email delivery failed. We'll send your receipt manually within 24 hours.`);
      return false;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate receipt
      const receiptData = generateReceipt();
      
      // Send thank you email with receipt
      await sendThankYouEmail(receiptData);
      
      // Store receipt data for display
      setFormData(prev => ({ ...prev, receiptData }));
      
      setStep(3);
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, MasterCard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported'
    }
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your generous donation {formData.category === 'money' ? `of ₹${formatNumber(Number(formData.amount))}` : 'of items'} has been received successfully.
            </p>
            
            {/* Receipt Section */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Receipt</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt No:</span>
                  <span className="font-medium">NGO-{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PAN:</span>
                  <span className="font-medium">{formData.panCard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor Type:</span>
                  <span className="font-medium capitalize">{formData.donorType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium">{formData.purpose}</span>
                </div>
                {formData.category === 'money' ? (
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Amount:</span>
                    <span>₹{formData.amount}</span>
                  </div>
                ) : (
                  <div className="border-t pt-2">
                    <span className="text-gray-600">Items Donated:</span>
                    <p className="font-medium mt-1">{formData.things}</p>
                    {formData.thingsFiles.length > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-600">Attached Files:</span>
                        <div className="mt-1">
                          {formData.thingsFiles.map((file, index) => (
                            <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
                              {file.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Impact</h2>
              <p className="text-gray-700">
                Your contribution will help us continue our mission of empowering communities and creating lasting change across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-800 font-medium">Receipt & thank you email sent</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-800 font-medium">Secure transaction</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-purple-800 font-medium">Tax deductible</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 justify-center"
              >
                <Home className="w-5 h-5" />
                Return Home
              </button>
              <button
                onClick={() => window.location.href = '/join'}
                className="border border-orange-500 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-start gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
              {/* Removed text logo, keep only image */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-16 text-sm text-gray-600">
              <span className={step >= 1 ? 'text-orange-600 font-medium' : ''}>Details</span>
              <span className={step >= 2 ? 'text-orange-600 font-medium' : ''}>Payment</span>
              <span className={step >= 3 ? 'text-orange-600 font-medium' : ''}>Complete</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {step === 1 && (
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Donation</h1>
                <p className="text-gray-600">Your contribution makes a real difference in communities across India</p>
              </div>

              {/* Impact Stats */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Your Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹{formatNumber(500)} can provide</p>
                    <p className="font-semibold text-gray-900">School supplies for {formatNumber(5)} children</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹{formatNumber(1000)} can provide</p>
                    <p className="font-semibold text-gray-900">Healthcare for {formatNumber(10)} families</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹{formatNumber(2500)} can provide</p>
                    <p className="font-semibold text-gray-900">Clean water access for 1 month</p>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Mobile No *
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.mobile ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
                  </div>
                </div>

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
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Enter your address"
                  />
                  {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.country ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter country"
                    />
                    {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.city ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.pincode ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <PanIcon className="w-4 h-4 inline mr-2" />
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    value={formData.panCard}
                    onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.panCard ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Enter PAN number (e.g., ABCDE1234F)"
                    maxLength={10}
                  />
                  {errors.panCard && <p className="text-red-600 text-sm mt-1">{errors.panCard}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Package className="w-4 h-4 inline mr-2" />
                    Category *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('category', 'money')}
                      className={`p-4 rounded-lg border-2 transition-colors text-center ${
                        formData.category === 'money'
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <DollarSign className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('category', 'things')}
                      className={`p-4 rounded-lg border-2 transition-colors text-center ${
                        formData.category === 'things'
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Package className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Things</span>
                    </button>
                  </div>
                </div>

                {formData.category === 'money' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Donation Amount *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleInputChange('amount', amount.toString())}
                          className={`py-3 px-4 rounded-lg border-2 transition-colors font-medium ${
                            formData.amount === amount.toString()
                              ? 'border-orange-500 bg-orange-50 text-orange-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          ₹{formatNumber(amount)}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.amount ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter custom amount"
                      min="10"
                    />
                    {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                  </div>
                )}

                {formData.category === 'things' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Package className="w-4 h-4 inline mr-2" />
                        Things to Donate *
                      </label>
                      <textarea
                        value={formData.things}
                        onChange={(e) => handleInputChange('things', e.target.value)}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.things ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                        placeholder="Describe the items you want to donate (e.g., clothes, books, food items, etc.)"
                      />
                      {errors.things && <p className="text-red-600 text-sm mt-1">{errors.things}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Attach Files/Images (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">Images, PDF, DOC files up to 10MB each</p>
                        </label>
                      </div>
                      
                      {formData.thingsFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                          <div className="space-y-2">
                            {formData.thingsFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                  <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Donor Type *
                  </label>
                  <select
                    value={formData.donorType}
                    onChange={(e) => handleInputChange('donorType', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  >
                    <option value="individual">Individual</option>
                    <option value="family">Family Member</option>
                    <option value="affiliated">Affiliated</option>
                    <option value="corporate">Corporate</option>
                    <option value="grant">Grant/Foundation</option>
                  </select>
                </div>

                {/* Family Member Details */}
                {formData.donorType === 'family' && (
                  <div className="bg-blue-50 p-6 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Member Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Family Member Name *</label>
                        <input
                          type="text"
                          value={formData.familyMemberName}
                          onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                            errors.familyMemberName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                          } focus:ring-2 focus:border-transparent`}
                          placeholder="Enter family member name"
                        />
                        {errors.familyMemberName && <p className="text-red-600 text-sm mt-1">{errors.familyMemberName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relation *</label>
                        <input
                          type="text"
                          value={formData.familyMemberRelation}
                          onChange={(e) => handleInputChange('familyMemberRelation', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                            errors.familyMemberRelation ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                          } focus:ring-2 focus:border-transparent`}
                          placeholder="e.g., Father, Mother, Spouse"
                        />
                        {errors.familyMemberRelation && <p className="text-red-600 text-sm mt-1">{errors.familyMemberRelation}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        value={formData.familyMemberContact}
                        onChange={(e) => handleInputChange('familyMemberContact', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                )}

                {/* Affiliated Details */}
                {formData.donorType === 'affiliated' && (
                  <div className="bg-green-50 p-6 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Affiliated Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                        <input
                          type="text"
                          value={formData.affiliatedOrganization}
                          onChange={(e) => handleInputChange('affiliatedOrganization', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                            errors.affiliatedOrganization ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                          } focus:ring-2 focus:border-transparent`}
                          placeholder="Enter organization name"
                        />
                        {errors.affiliatedOrganization && <p className="text-red-600 text-sm mt-1">{errors.affiliatedOrganization}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                        <input
                          type="text"
                          value={formData.affiliatedPosition}
                          onChange={(e) => handleInputChange('affiliatedPosition', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                            errors.affiliatedPosition ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                          } focus:ring-2 focus:border-transparent`}
                          placeholder="Enter your position"
                        />
                        {errors.affiliatedPosition && <p className="text-red-600 text-sm mt-1">{errors.affiliatedPosition}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        value={formData.affiliatedContact}
                        onChange={(e) => handleInputChange('affiliatedContact', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                )}

                {/* Corporate Details */}
                {formData.donorType === 'corporate' && (
                  <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Corporate Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Name *</label>
                      <input
                        type="text"
                        value={formData.corporateName}
                        onChange={(e) => handleInputChange('corporateName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.corporateName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                        placeholder="Enter corporate name"
                      />
                      {errors.corporateName && <p className="text-red-600 text-sm mt-1">{errors.corporateName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Address *</label>
                      <textarea
                        value={formData.corporateAddress}
                        onChange={(e) => handleInputChange('corporateAddress', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.corporateAddress ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                        placeholder="Enter corporate address"
                      />
                      {errors.corporateAddress && <p className="text-red-600 text-sm mt-1">{errors.corporateAddress}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input
                          type="tel"
                          value={formData.corporateContact}
                          onChange={(e) => handleInputChange('corporateContact', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Enter contact number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                        <input
                          type="text"
                          value={formData.corporateGST}
                          onChange={(e) => handleInputChange('corporateGST', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Enter GST number"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Grant/Foundation Details */}
                {formData.donorType === 'grant' && (
                  <div className="bg-yellow-50 p-6 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Grant/Foundation Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Foundation Name *</label>
                      <input
                        type="text"
                        value={formData.foundationName}
                        onChange={(e) => handleInputChange('foundationName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.foundationName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                        placeholder="Enter foundation name"
                      />
                      {errors.foundationName && <p className="text-red-600 text-sm mt-1">{errors.foundationName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Foundation Address *</label>
                      <textarea
                        value={formData.foundationAddress}
                        onChange={(e) => handleInputChange('foundationAddress', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.foundationAddress ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                        placeholder="Enter foundation address"
                      />
                      {errors.foundationAddress && <p className="text-red-600 text-sm mt-1">{errors.foundationAddress}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input
                          type="tel"
                          value={formData.foundationContact}
                          onChange={(e) => handleInputChange('foundationContact', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Enter contact number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                        <input
                          type="text"
                          value={formData.foundationRegistration}
                          onChange={(e) => handleInputChange('foundationRegistration', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Enter registration number"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter the purpose of your donation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Leave a message of support..."
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isProcessing && formData.category === 'things' ? 'Processing Donation...' : 
                   formData.category === 'money' ? 'Continue to Payment' : 'Submit Donation'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Details
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Payment Method</h1>
                <p className="text-gray-600">Secure and trusted payment options</p>
              </div>

              {/* Donation Summary */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donor:</span>
                    <span className="font-medium text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PAN Number:</span>
                    <span className="font-medium text-gray-900">{formData.panCard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900 capitalize">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donor Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{formData.donorType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purpose:</span>
                    <span className="font-medium text-gray-900">{formData.purpose}</span>
                  </div>
                  {formData.category === 'money' ? (
                    <div className="flex justify-between text-xl border-t border-gray-200 pt-3">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-orange-600">₹{formData.amount}</span>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-3">
                      <span className="text-gray-600">Items:</span>
                      <p className="text-gray-900 mt-1">{formData.things}</p>
                      {formData.thingsFiles.length > 0 && (
                        <div className="mt-2">
                          <span className="text-gray-600">Attached Files:</span>
                          <div className="mt-1">
                            {formData.thingsFiles.map((file, index) => (
                              <span key={index} className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
                                {file.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {formData.message && (
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-600">Message:</span>
                      <p className="text-gray-900 mt-1">{formData.message}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleInputChange('paymentMethod', method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                          formData.paymentMethod === method.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            formData.paymentMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              formData.paymentMethod === method.id ? 'text-orange-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Secure Payment</h4>
                    <p className="text-sm text-blue-800">
                      Your payment is secured with 256-bit SSL encryption. We don't store your payment information.
                    </p>
                  </div>
                </div>
              </div>

              {errors.payment && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-6">
                  {errors.payment}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? (formData.category === 'money' ? 'Processing Payment...' : 'Processing Donation...') : (formData.category === 'money' ? `Donate ₹${formData.amount}` : 'Submit Donation')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-8 h-8 rounded-lg" />
              {/* Removed text logo, keep only image */}
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 11 4567 8900
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@ngoindia.org
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                New Delhi, India
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 NGO INDIA. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}