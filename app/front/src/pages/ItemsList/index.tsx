import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import productService from '../../services/product.service';
import materialService from '../../services/material.service';

export default function ItemsListPage() {
  const [data, setData] = useState([] as ProductByFindAll[] | Material[]);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const service =
        pathname === '/products' ? productService : materialService;
      const resp = await service.fetchAll();
      setData(resp);
    })();
  }, [setData]);

  return <div />;
}
