import { useLocation } from 'react-router-dom';
import productService from '../services/product.service';
import materialService from '../services/material.service';

export default function usePickService() {
  const { pathname } = useLocation();
  const isProducts = pathname.includes('product');

  return {
    isProducts,
    pathname,
    service: isProducts ? productService : materialService,
  };
}
