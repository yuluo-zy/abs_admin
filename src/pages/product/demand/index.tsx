import React from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicCard from '@/components/Dynamic/Card';
import ProductMenu from '@/pages/product/demand/menu';


export default function ProductDemand() {
  const t = useLocale();
  return <DynamicCard title={t['menu.title']}>
    <ProductMenu />
  </DynamicCard>;
}
