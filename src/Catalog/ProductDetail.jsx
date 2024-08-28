import React from 'react';
import { useParams } from 'react-router-dom';
// import Customize1 from './Products/Customize1'
import CardDetails from '../CardDetails';
// import Catalog1 from './Catalog/Catalog1';
// import Customize1 from '../Products/Customize1'
import Products from './Products'
import Products1 from './Products1'
function DynamicCardDetail() {
  const { id } = useParams();


  const components = {
    '66c044b2f2ce78c3b7eea7bb': Products,
    '66b4c29c138a0365e1353933': Products1,
    // '66c42a734fd09c17109d482b': Catalog1,
    
    
  };

  const ComponentToRender = components[id] || DefaultComponent;

  return <ComponentToRender />;
}

const DefaultComponent = () => <div>Page not found</div>;

export default DynamicCardDetail;
