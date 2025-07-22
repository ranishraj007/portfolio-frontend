import { useQuery } from 'react-query';
import { portfolioData, type PortfolioData } from '../data/portfolioData';

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(portfolioData), 500);
  });
};

export const usePortfolioData = () => {
  return useQuery<PortfolioData, Error>('portfolioData', fetchPortfolioData, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};