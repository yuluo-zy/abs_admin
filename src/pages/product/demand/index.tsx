import React, { useReducer } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicCard from '@/components/Dynamic/Card';
import ProductMenu from '@/pages/product/demand/menu';
import { initialProductDemand, ProductDemandContext, ProductDemandStore } from '@/store/context-manager';


export default function ProductDemand() {
  const t = useLocale();
  const [state, dispatch] = useReducer(ProductDemandStore, initialProductDemand);
  return <ProductDemandContext.Provider value={{ state, dispatch }}>
    <DynamicCard title={t['menu.title']}>
      <ProductMenu />
    </DynamicCard>
  </ProductDemandContext.Provider>;
}
