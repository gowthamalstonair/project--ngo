// Utility function to format numbers with Indian place values
export const formatNumber = (num: number): string => {
  if (num >= 1e7) return (num / 1e7).toFixed(1) + 'Cr'; // Crore
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';  // Million (10+ lakhs)
  if (num >= 1e5) return (num / 1e5).toFixed(1) + 'L';  // Lakh
  return num.toString();
};