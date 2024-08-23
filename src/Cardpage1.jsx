import React from 'react';
import { useParams } from 'react-router-dom';
import Customize1 from './Products/Customize1'
import CardDetails from './CardDetails';
import Catalog1 from './Catalog/Catalog1';

function DynamicCardDetail() {
  const { id } = useParams();


  const components = {
    '66b4c29c138a0365e1353933': Customize1,
    '669f87ce4323fdc35ad4111e': CardDetails,
    // '66c42a734fd09c17109d482b': Catalog1,
  };

  const ComponentToRender = components[id] || DefaultComponent;

  return <ComponentToRender />;
}

const DefaultComponent = () => <div>Page not found</div>;

export default DynamicCardDetail;
