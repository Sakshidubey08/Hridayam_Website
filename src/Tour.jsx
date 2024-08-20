import React, { useEffect } from 'react';
import { driver } from 'driver.js'; // Correct import
import 'driver.js/dist/driver.css';

const Tour = () => {
  useEffect(() => {
    const driverObj = new driver({ // Initialize the driver
      animate: false,
      showProgress: false,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '.option',
          popover: {
            title: 'Select Photo',
            description: 'Select a photo for instant preview.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '.shape-content',
          popover: {
            title: 'Frames',
            description: 'Frames available for current size',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '.size',
          popover: {
            title: 'Size',
            description: 'Available acrylic size',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '.thickness-options',
          popover: {
            title: 'Thickness',
            description: 'Available acrylic thickness',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '.price1',
          popover: {
            title: 'Price',
            description: 'Current price for selected price',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '.image-container',
          popover: {
            title: 'Photo',
            description: 'Swipe to move photo',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '.text',
          popover: {
            title: 'Text',
            description: 'Add text to acrylic photo',
            side: 'top',
            align: 'start',
          },
        },
        
      ],
    });

    driverObj.drive();

    // Cleanup the tour when the component unmounts
    return () => {
      driverObj.destroy(); // Use destroy to clean up
    };
  }, []);

  return null;
};

export default Tour;



// import React, { useEffect } from 'react';
// import { driver } from 'driver.js';
// import 'driver.js/dist/driver.css';

// const Tour = () => {
//   useEffect(() => {
//     const driverObj = driver({
//       animate: false,
//       showProgress: false,
//       showButtons: ['next', 'previous', 'close'],
//       steps: [
//         { element: '.option', popover: { title: 'Header', description: 'Select a photo for instant preview.', side: 'bottom', align: 'start' }},
//         { element: '.shape-options', popover: { title: 'Shapes', description: 'Shape available for current size', side: 'right', align: 'start' }},
//         { element: '.size', popover: { title: 'Preview Area', description: 'Available acrylic size', side: 'left', align: 'start' }},
//         { element: '.thickness-options', popover: { title: 'Footer', description: 'Available acrylic thickness', side: 'top', align: 'start' }},
//         { element: '.price1', popover: { title: 'Price', description: 'Current price for selected price', side: 'top', align: 'start' }},
//         { element: '.image-container', popover: { title: 'Price', description: 'Swipe to move photo', side: 'top', align: 'start' }},
//         { element: '.text', popover: { title: 'Text', description: 'Swipe to move photo', side: 'top', align: 'start' }},

//         { popover: { title: 'End of Tour', description: 'Thank you for taking the tour!' }}
//       ]
//     });

//     driverObj.drive();

//     // Cleanup the tour when the component unmounts
//     return () => {
//       driverObj.reset();
//     };
//   }, []);

//   return null;
// };

// export default Tour;
