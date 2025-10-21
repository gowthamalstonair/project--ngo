import React from 'react';
import { ArrowLeft, Star, Calendar, User, Award, Target, MessageSquare, TrendingUp } from 'lucide-react';

export default function PerformanceReviewDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const reviewId = urlParams.get('id');

  const reviewData = {
    '1': {
      employee: 'Rajesh Kumar',
      position: 'Program Manager',
      department: 'Education',
      period: 'Q4 2024',
      score: 4.8,
      status: 'Completed',
      reviewDate: '2024-12-15',
      reviewer: 'Executive Director',
      strengths: ['Project Management', 'Community Outreach', 'Team Leadership'],
      improvements: ['Technical Skills', 'Time Management'],
      goals: [
        'Complete advanced project management certification',
        'Improve digital literacy skills',
        'Implement new time tracking system'
      ],
      feedback: 'Rajesh has shown exceptional leadership in managing education programs. His ability to engage with communities and coordinate with stakeholders is outstanding. Focus areas for improvement include adopting new technologies and better time management practices.',
      achievements: [
        'Successfully launched 3 new education centers',
        'Increased program reach by 40%',
        'Trained 25+ community volunteers'
      ]
    },
    '2': {
      employee: 'Priya Sharma',
      position: 'Finance Officer',
      department: 'Finance',
      period: 'Q4 2024',
      score: 4.7,
      status: 'Completed',
      reviewDate: '2024-12-18',
      reviewer: 'Executive Director',
      strengths: ['Financial Analysis', 'Budget Management', 'Compliance'],
      improvements: ['Leadership', 'Communication'],
      goals: [
        'Develop leadership skills through training',
        'Improve presentation and communication abilities',
        'Lead financial literacy workshops'
      ],
      feedback: 'Priya demonstrates excellent technical skills in financial management and maintains high standards of compliance. Her analytical abilities are strong. Development opportunities lie in leadership and communication skills to take on more strategic roles.',
      achievements: [
        'Maintained 100% compliance record',
        'Reduced processing time by 30%',
        'Implemented new budget tracking system'
      ]
    },
    '3': {
      employee: 'Anita Patel',
      position: 'Field Coordinator',
      department: 'Field Operations',
      period: 'Q4 2024',
      score: 4.6,
      status: 'Completed',
      reviewDate: '2024-12-20',
      reviewer: 'Program Manager',
      strengths: ['Community Relations', 'Field Operations', 'Problem Solving'],
      improvements: ['Documentation', 'Reporting'],
      goals: [
        'Improve documentation and reporting skills',
        'Complete field operations certification',
        'Develop digital reporting capabilities'
      ],
      feedback: 'Anita excels in field operations and has built strong relationships with communities. Her problem-solving abilities are remarkable. Areas for growth include better documentation practices and more structured reporting.',
      achievements: [
        'Established partnerships with 15 local organizations',
        'Coordinated 20+ community events',
        'Achieved 95% beneficiary satisfaction rate'
      ]
    },
    '4': {
      employee: 'Amit Singh',
      position: 'Communications Manager',
      department: 'Communications',
      period: 'Q4 2024',
      score: 4.5,
      status: 'Pending',
      reviewDate: '2025-01-20',
      reviewer: 'Executive Director',
      strengths: ['Digital Marketing', 'Content Creation', 'Social Media'],
      improvements: ['Leadership', 'Strategic Planning'],
      goals: [
        'Develop strategic planning capabilities',
        'Take leadership role in communications strategy',
        'Complete digital marketing advanced course'
      ],
      feedback: 'Amit shows great creativity in content creation and has significantly improved our digital presence. His social media campaigns have been very effective. Focus should be on developing strategic thinking and leadership skills.',
      achievements: [
        'Increased social media engagement by 60%',
        'Created award-winning campaign video',
        'Launched successful newsletter program'
      ]
    }
  };

  const review = reviewData[reviewId as keyof typeof reviewData];

  if (!review) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Performance Review Not Found</h1>
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

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => {
            localStorage.setItem('activeModule', 'hr');
            localStorage.setItem('hrActiveTab', 'performance');
            window.location.href = '/';
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to HR Management
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Performance Review Details</h1>
      </div>

      {/* Review Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-sm p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{review.employee}</h2>
            <p className="text-lg text-orange-100">{review.position}</p>
            <p className="text-sm text-orange-200">{review.department} Department</p>
          </div>
          <span className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm font-medium">
            {review.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-orange-200" />
            <div>
              <p className="text-sm text-orange-200">Review Period</p>
              <p className="font-medium text-white">{review.period}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-300" />
            <div>
              <p className="text-sm text-orange-200">Overall Score</p>
              <p className="font-medium text-white">{review.score}/5</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-orange-200" />
            <div>
              <p className="text-sm text-orange-200">Review Date</p>
              <p className="font-medium text-white">{review.reviewDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-orange-200" />
            <div>
              <p className="text-sm text-orange-200">Reviewer</p>
              <p className="font-medium text-white">{review.reviewer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
          </div>
          <div className="space-y-2">
            {review.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <div className="space-y-2">
            {review.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{improvement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Goals for Next Period</h3>
          </div>
          <div className="space-y-3">
            {review.goals.map((goal, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Achievements</h3>
          </div>
          <div className="space-y-2">
            {review.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Detailed Feedback</h3>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-gray-700 leading-relaxed">{review.feedback}</p>
        </div>
      </div>
      </div>
    </div>
  );
}