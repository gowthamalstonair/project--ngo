const API_BASE_URL = 'http://localhost/Final_NGO/Backend/php_api';

export const donationAPI = {
  // Add a new donation
  addDonation: async (donationData) => {
    try {
      console.log('Sending donation data:', donationData);
      const response = await fetch(`${API_BASE_URL}/add_donation.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      const responseData = await response.json();
      console.log('Response:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to add donation');
      }
      
      return responseData;
    } catch (error) {
      console.error('Error adding donation:', error);
      throw error;
    }
  },

  // Get all donations
  getAllDonations: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/add_donation.php`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  }
};