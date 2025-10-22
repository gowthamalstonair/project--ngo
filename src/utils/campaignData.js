// Shared campaign data management
let campaigns = [
  {
    id: '1',
    title: 'Education for 1000 Children',
    description: 'Providing quality education and school supplies to underprivileged children in rural areas.',
    goal: 100000,
    raised: 85000,
    donors: 156,
    daysLeft: 5,
    category: 'education',
    status: 'active',
    createdDate: '2024-12-01'
  },
  {
    id: '2',
    title: 'Clean Water for Villages',
    description: 'Installing water purification systems in 10 remote villages.',
    goal: 75000,
    raised: 75000,
    donors: 89,
    daysLeft: 0,
    category: 'water',
    status: 'completed',
    createdDate: '2024-11-01'
  },
  {
    id: '3',
    title: 'Emergency Medical Equipment',
    description: 'Purchasing essential medical equipment for rural health centers.',
    goal: 50000,
    raised: 30000,
    donors: 67,
    daysLeft: 15,
    category: 'healthcare',
    status: 'active',
    createdDate: '2024-12-15'
  },
  {
    id: '4',
    title: 'Food Relief Program',
    description: 'Providing nutritious meals to families affected by natural disasters.',
    goal: 25000,
    raised: 10000,
    donors: 34,
    daysLeft: 8,
    category: 'food',
    status: 'active',
    createdDate: '2025-01-01'
  }
];

export const getCampaigns = () => campaigns;

export const addCampaign = (newCampaign) => {
  const campaign = {
    ...newCampaign,
    id: Date.now().toString(),
    raised: 0,
    donors: 0,
    status: 'active',
    createdDate: new Date().toISOString().split('T')[0],
    image: newCampaign.image || 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg'
  };
  campaigns.push(campaign);
  return campaign;
};

export const getCampaignById = (id) => {
  return campaigns.find(campaign => campaign.id === id);
};

export const updateCampaign = (id, updates) => {
  const index = campaigns.findIndex(campaign => campaign.id === id);
  if (index !== -1) {
    campaigns[index] = { ...campaigns[index], ...updates };
    return campaigns[index];
  }
  return null;
};

export const getStats = () => {
  return {
    totalCampaigns: campaigns.length,
    totalRaised: campaigns.reduce((sum, c) => sum + c.raised, 0),
    totalGoal: campaigns.reduce((sum, c) => sum + c.goal, 0),
    totalDonors: campaigns.reduce((sum, c) => sum + c.donors, 0),
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
    averageProgress: campaigns.length > 0 ? Math.round(campaigns.reduce((sum, c) => sum + (c.raised / c.goal * 100), 0) / campaigns.length) : 0
  };
};