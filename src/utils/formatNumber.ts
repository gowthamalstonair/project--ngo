// Utility function to format numbers with Indian place values
export const formatNumber = (num: number): string => {
  if (num >= 1e7) return (num / 1e7).toFixed(1) + 'Cr'; // Crore (1+ crore)
  if (num >= 1e6) return (num / 1e5).toFixed(0) + 'L';  // Show in Lakhs for 10+ lakhs
  if (num >= 1e5) return (num / 1e5).toFixed(1) + 'L';  // Lakh
  return num.toFixed(2).replace(/\.?0+$/, ''); // Limit to 2 decimal places and remove trailing zeros
};