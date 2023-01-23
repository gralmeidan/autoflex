import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productService from '../../services/product.service';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';

export default function ItemsListPage() {
  const [data, setData] = useState([] as ProductByFindAll[] | Material[]);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const resp = await productService.fetchAll();
      setData(resp);
    })();
  }, [setData]);

  return <div />;
}
