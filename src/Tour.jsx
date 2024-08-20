import React, { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const Tour = () => {
  useEffect(() => {
    const driverObj = driver({
      animate: false,
      showProgress: false,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        { element: '.option', popover: { title: 'Header', description: 'Select a photo for instant preview.', side: 'bottom', align: 'start' }},
        { element: '.shape-options', popover: { title: 'Shapes', description: 'Shape available for current size', side: 'right', align: 'start' }},
        { element: '#image-container', popover: { title: 'Preview Area', description: 'This is where you can preview your selected options.', side: 'left', align: 'start' }},
        { element: '#footer', popover: { title: 'Footer', description: 'This is the footer of the page.', side: 'top', align: 'start' }},
        { popover: { title: 'End of Tour', description: 'Thank you for taking the tour!' }}
      ]
    });

    driverObj.drive();

    // Cleanup the tour when the component unmounts
    return () => {
      driverObj.reset();
    };
  }, []);

  return null;
};

export default Tour;
