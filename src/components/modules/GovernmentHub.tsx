import React, { useState } from 'react';
import { 
  Shield, FileText, Send, BarChart3, FolderOpen, 
  Bell, HelpCircle, Award, Search, Filter, 
  CheckCircle, Clock, AlertCircle, Download,
  Upload, Eye, MessageSquare, Phone, Mail,
  Calendar, MapPin, IndianRupee, Users, Star
} from 'lucide-react';
import { useScrollReset } from '../../hooks/useScrollReset';

export function GovernmentHub() {
  useScrollReset();
  const [activeTab, setActiveTab] = useState('verification');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  // Mock data for government schemes
  const governmentSchemes = [
    {
      id: '1',
      title: 'PM CARES Fund Grant',
      department: 'Prime Minister\'s Office',
      category: 'Healthcare',
      amount: '₹50,00,000',
      deadline: '2025-03-15',
      status: 'Open',
      eligibility: 'Registered NGOs working in healthcare sector',
      description: 'Grant for NGOs working on healthcare initiatives and COVID-19 relief work.',
      documents: ['Registration Certificate', 'Audited Financial Statements', 'Project Proposal'],
      applicationFee: '₹500'
    },
    {
      id: '2',
      title: 'Swachh Bharat Mission Grant',
      department: 'Ministry of Housing and Urban Affairs',
      category: 'Sanitation',
      amount: '₹25,00,000',
      deadline: '2025-02-28',
      status: 'Open',
      eligibility: 'NGOs with 3+ years experience in sanitation projects',
      description: 'Funding for sanitation and cleanliness initiatives across rural and urban areas.',
      documents: ['NGO Registration', 'Previous Project Reports', 'Community Impact Assessment'],
      applicationFee: '₹300'
    },
    {
      id: '3',
      title: 'Digital India Initiative',
      department: 'Ministry of Electronics and IT',
      category: 'Technology',
      amount: '₹75,00,000',
      deadline: '2025-04-10',
      status: 'Open',
      eligibility: 'Tech-focused NGOs with digital literacy programs',
      description: 'Support for digital literacy and technology adoption programs in rural areas.',
      documents: ['Technical Proposal', 'Team Credentials', 'Implementation Timeline'],
      applicationFee: '₹750'
    }
  ];

  // Mock verification data
  const verificationStatus = {
    status: 'Verified',
    verifiedDate: '2024-12-01',
    certificateNumber: 'NGO-IND-2024-001234',
    validUntil: '2025-12-01',
    verifiedBy: 'Ministry of Home Affairs',
    documents: [
      { name: '12A Registration', status: 'Verified', date: '2024-12-01' },
      { name: '80G Certificate', status: 'Verified', date: '2024-12-01' },
      { name: 'FCRA Registration', status: 'Pending', date: '2024-12-15' },
      { name: 'PAN Card', status: 'Verified', date: '2024-12-01' }
    ]
  };

  // Mock application data
  const applications = [
    {
      id: 'APP001',
      scheme: 'PM CARES Fund Grant',
      submittedDate: '2024-12-10',
      status: 'Under Review',
      amount: '₹50,00,000',
      reviewStage: 'Technical Evaluation',
      nextAction: 'Awaiting technical committee review'
    },
    {
      id: 'APP002',
      scheme: 'Swachh Bharat Mission Grant',
      submittedDate: '2024-11-25',
      status: 'Approved',
      amount: '₹25,00,000',
      reviewStage: 'Completed',
      nextAction: 'Fund disbursement in progress'
    }
  ];

  // Mock reports data
  const reports = [
    {
      id: 'RPT001',
      project: 'Rural Healthcare Initiative',
      type: 'Monthly Progress Report',
      dueDate: '2025-01-31',
      status: 'Pending',
      lastSubmitted: '2024-12-31'
    },
    {
      id: 'RPT002',
      project: 'Clean Water Project',
      type: 'Financial Utilization Report',
      dueDate: '2025-01-15',
      status: 'Submitted',
      lastSubmitted: '2025-01-10'
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'Application Update',
      title: 'PM CARES Fund Application - Technical Review Completed',
      message: 'Your application has passed technical review and moved to final approval stage.',
      date: '2025-01-12',
      priority: 'High',
      read: false
    },
    {
      id: '2',
      type: 'Report Reminder',
      title: 'Monthly Report Due Soon',
      message: 'Your monthly progress report for Rural Healthcare Initiative is due in 3 days.',
      date: '2025-01-11',
      priority: 'Medium',
      read: false
    },
    {
      id: '3',
      type: 'New Scheme',
      title: 'New Grant Opportunity Available',
      message: 'Education Ministry has announced new grants for skill development programs.',
      date: '2025-01-10',
      priority: 'Low',
      read: true
    }
  ];

  // Mock certificates
  const certificates = [
    {
      id: 'CERT001',
      title: 'Excellence in Healthcare Services',
      issuedBy: 'Ministry of Health and Family Welfare',
      issuedDate: '2024-12-15',
      validUntil: '2025-12-15',
      category: 'Performance Recognition',
      description: 'Awarded for outstanding contribution to rural healthcare initiatives'
    },
    {
      id: 'CERT002',
      title: 'Digital Innovation Award',
      issuedBy: 'Ministry of Electronics and IT',
      issuedDate: '2024-11-20',
      validUntil: '2025-11-20',
      category: 'Innovation',
      description: 'Recognition for innovative use of technology in social programs'
    }
  ];

  const renderVerificationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-full ${
            verificationStatus.status === 'Verified' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <Shield className={`w-6 h-6 ${
              verificationStatus.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'
            }`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">NGO Verification Status</h3>
            <p className="text-gray-600">Your organization's government verification details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Verification Status</label>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{verificationStatus.status}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Certificate Number</label>
              <p className="text-gray-900 font-mono">{verificationStatus.certificateNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Verified By</label>
              <p className="text-gray-900">{verificationStatus.verifiedBy}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Verified Date</label>
              <p className="text-gray-900">{verificationStatus.verifiedDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Valid Until</label>
              <p className="text-gray-900">{verificationStatus.validUntil}</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Download Certificate
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Document Verification Status</h4>
          <div className="space-y-3">
            {verificationStatus.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {doc.status === 'Verified' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : doc.status === 'Pending' ? (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium text-gray-900">{doc.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    doc.status === 'Verified' ? 'text-green-600' : 
                    doc.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {doc.status}
                  </span>
                  <p className="text-xs text-gray-500">{doc.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchemesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search schemes by title, department, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {governmentSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{scheme.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{scheme.department}</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {scheme.category}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                scheme.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {scheme.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Grant Amount:</span>
                <span className="font-semibold text-gray-900">{scheme.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Application Fee:</span>
                <span className="font-semibold text-gray-900">{scheme.applicationFee}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-semibold text-red-600">{scheme.deadline}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedScheme(scheme)}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Apply Now
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">My Applications</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          New Application
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{app.scheme}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Application ID: {app.id}</span>
                  <span>Submitted: {app.submittedDate}</span>
                  <span>Amount: {app.amount}</span>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {app.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Current Stage: {app.reviewStage}</span>
              </div>
              <p className="text-sm text-gray-600">{app.nextAction}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Download Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Report Submission & Monitoring</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Submit New Report
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{report.project}</h4>
                <p className="text-gray-600 mb-2">{report.type}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Report ID: {report.id}</span>
                  <span>Due Date: {report.dueDate}</span>
                  <span>Last Submitted: {report.lastSubmitted}</span>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                report.status === 'Submitted' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                {report.status === 'Pending' ? 'Submit Report' : 'View Report'}
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Document Repository</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Registration Certificate', type: 'PDF', size: '2.4 MB', date: '2024-12-01', shared: true },
          { name: 'Audited Financial Report 2024', type: 'PDF', size: '5.2 MB', date: '2024-11-15', shared: false },
          { name: 'Project Proposal - Healthcare', type: 'DOCX', size: '1.8 MB', date: '2024-12-10', shared: true },
          { name: 'Impact Assessment Report', type: 'PDF', size: '3.1 MB', date: '2024-12-05', shared: false },
          { name: 'Budget Utilization Report', type: 'XLSX', size: '890 KB', date: '2024-11-28', shared: true },
          { name: 'Compliance Certificate', type: 'PDF', size: '1.2 MB', date: '2024-12-12', shared: true }
        ].map((doc, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{doc.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Uploaded: {doc.date}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                doc.shared ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {doc.shared ? 'Shared' : 'Private'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Download
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Notifications & Communication</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Mark All Read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className={`bg-white rounded-xl shadow-sm border p-6 ${
            !notification.read ? 'border-orange-200 bg-orange-50' : 'border-gray-100'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                notification.priority === 'High' ? 'bg-red-100' :
                notification.priority === 'Medium' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <Bell className={`w-5 h-5 ${
                  notification.priority === 'High' ? 'text-red-600' :
                  notification.priority === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      notification.priority === 'High' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.priority}
                    </span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{notification.date}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-orange-500 hover:text-orange-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="text-orange-500 hover:text-orange-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupportTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Get immediate help from our support team</p>
          <p className="font-semibold text-gray-900">1800-123-4567</p>
          <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us your queries and get detailed responses</p>
          <p className="font-semibold text-gray-900">support@gov-ngo.in</p>
          <p className="text-sm text-gray-500">Response within 24 hours</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Chat with our experts in real-time</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: 'How do I verify my NGO with the government?',
              answer: 'To verify your NGO, you need to submit your registration documents, financial statements, and compliance certificates through the verification tab. The process typically takes 7-14 business days.'
            },
            {
              question: 'What tax benefits are available for registered NGOs?',
              answer: 'Registered NGOs can avail 12A and 80G tax exemptions. 12A provides income tax exemption to the NGO, while 80G allows donors to claim tax deductions for their donations.'
            },
            {
              question: 'How can I track my grant application status?',
              answer: 'You can track your application status in the Applications tab. You will also receive email and SMS notifications for any status updates.'
            },
            {
              question: 'What documents are required for scheme applications?',
              answer: 'Common documents include NGO registration certificate, audited financial statements, project proposal, impact assessment reports, and compliance certificates. Specific requirements vary by scheme.'
            },
            {
              question: 'How often do I need to submit progress reports?',
              answer: 'Report submission frequency depends on the grant terms. Typically, monthly progress reports and quarterly financial reports are required. Check your grant agreement for specific requirements.'
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <button className="w-full text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              <p className="text-gray-600 mt-3">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCertificatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Government Certificates</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Request Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{cert.title}</h4>
                <p className="text-gray-600 mb-2">{cert.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {cert.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Issued By:</span>
                <span className="font-medium text-gray-900">{cert.issuedBy}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Issued Date:</span>
                <span className="font-medium text-gray-900">{cert.issuedDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Valid Until:</span>
                <span className="font-medium text-gray-900">{cert.validUntil}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Download
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Certificate Benefits</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Enhanced credibility and trust with donors and partners</li>
              <li>• Priority consideration for government schemes and grants</li>
              <li>• Recognition in government publications and events</li>
              <li>• Access to exclusive networking opportunities</li>
              <li>• Eligibility for additional tax benefits and exemptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const stats = [
    { label: 'Active Schemes', value: '24', icon: FileText, color: 'text-blue-600' },
    { label: 'Applications Submitted', value: '8', icon: Send, color: 'text-green-600' },
    { label: 'Reports Due', value: '3', icon: BarChart3, color: 'text-orange-600' },
    { label: 'Certificates Earned', value: '5', icon: Award, color: 'text-purple-600' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Hub</h1>
            <p className="text-gray-600">Manage government relations, schemes, and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Quick Apply
            </button>
          </div>
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
          <div className="flex overflow-x-auto">
            {[
              { id: 'verification', label: 'NGO Verification', icon: Shield },
              { id: 'schemes', label: 'Government Schemes', icon: FileText },
              { id: 'applications', label: 'Applications', icon: Send },
              { id: 'reports', label: 'Reports & Monitoring', icon: BarChart3 },
              { id: 'documents', label: 'Document Repository', icon: FolderOpen },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'support', label: 'Support & FAQ', icon: HelpCircle },
              { id: 'certificates', label: 'Certificates', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'verification' && renderVerificationTab()}
          {activeTab === 'schemes' && renderSchemesTab()}
          {activeTab === 'applications' && renderApplicationsTab()}
          {activeTab === 'reports' && renderReportsTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'support' && renderSupportTab()}
          {activeTab === 'certificates' && renderCertificatesTab()}
        </div>
      </div>

      {/* Application Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Apply for {selectedScheme.title}</h3>
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedScheme.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Grant Amount</label>
                  <p className="text-gray-900 font-semibold">{selectedScheme.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Application Deadline</label>
                  <p className="text-gray-900 text-red-600">{selectedScheme.deadline}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Eligibility</label>
                  <p className="text-gray-900">{selectedScheme.eligibility}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Required Documents</label>
                  <ul className="list-disc list-inside text-gray-900 space-y-1">
                    {selectedScheme.documents.map((doc: string, index: number) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                  Proceed to Application
                </button>
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}