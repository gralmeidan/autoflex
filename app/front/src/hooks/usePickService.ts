import { useLocation } from 'react-router-dom';
import productService from '../services/product.service';
import materialService from '../services/material.service';

export default function usePickService() {
  const location = useLocation();
  const isProducts = location.pathname.includes('product');

  return {
    isProducts,
    ...location,
    service: isProducts ? productService : materialService,
  };
}
