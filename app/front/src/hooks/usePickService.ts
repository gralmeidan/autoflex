import { useLocation } from 'react-router-dom';
import productService from '../services/product.service';
import materialService from '../services/material.service';

export default function usePickService(invert?: boolean) {
  const location = useLocation();
  const isProducts = location.pathname.includes('product');

  return {
    isProducts,
    ...location,
    service: isProducts && !invert ? productService : materialService,
  };
}
