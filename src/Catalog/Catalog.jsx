import React from 'react';
import image1 from '../images/image 2.png';
import image2 from '../images/image 3.png';
import image3 from '../images/image 4.png';
import image4 from '../images/image 6.png';
import image5 from '../images/image 7.png';
import image6 from '../images/image 8.png';
import image7 from '../images/image 5.png';
import image8 from '../images/image 9.png';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const navigate = useNavigate();

  const cardsData = [
    { id: 1, title: 'OUTDOOR <br/> DECOR', imageUrl: image1 },
    { id: 2, title: 'WALL <br/> DECOR', imageUrl: image2 },
    { id: 3, title: 'KITCHEN <br/> DECOR', imageUrl: image3 },
    { id: 4, title: 'BATHROOM <br/> DECOR', imageUrl: image4 },
    { id: 5, title: 'PRAYER <br/>  ESSENTIALS', imageUrl: image5 },
    { id: 6, title: 'WALL LIGHT <br/> DECOR', imageUrl: image6 },
    { id: 7, title: 'CORPORATE <br/>GIFTS', imageUrl: image7 },
    { id: 8, title: 'ACRYLIC <br/> FRAME', imageUrl: image8 }
  ];

  const handleCardClick = (id) => {
    switch (id) {
      case 1:
        navigate('/catalog1');
        break;
      case 2:
        navigate('/catalog1');
        break;
      case 3:
        navigate('/catalog1');
        break;
      case 4:
        navigate('/catalog1');
        break;
      case 5:
        navigate('/catalog1');
        break;
      case 6:
        navigate('/catalog1');
        break;
      case 7:
        navigate('/catalog1');
        break;
      case 8:
        navigate('/catalog1');
        break;
      default:
        break;
    }
  };

  return (
    <>

   <div className='hidden md:block'>

  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4 sm:mx-8 md:mx-20 mt-52">
      {cardsData.map((card) =>(
        <div
          key={card.id}
          className="relative bg-gray-200 w-full h-52 sm:h-54 md:h-80 lg:h-82 lg:w-50 ml-3 cursor-pointer"
          onClick={() => handleCardClick(card.id)}
        >
          <img src={card.imageUrl} className="object-cover w-full h-full" alt={card.title} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h5
              style={{ fontFamily: 'Rosarivo' }}
              className="text-white text-center text-2xl pt-60"
              dangerouslySetInnerHTML={{ __html: card.title }}
            ></h5>
          </div>
        </div>
      ))}
    </div>
    </div>
       
       

       
        
        
  
        <div className='text-sm mt-10  md:hidden scrollbar-none flex items-center h-52 w-full px-3 overflow-x-auto gap-4'>
  {cardsData.map((index) => (
    <div key={index.id}  onClick={() => handleCardClick(index.id)} className='text-center w-20 h-20 flex-shrink-0'>
      <img 
        className='w-20 h-20 rounded-full object-cover' 
        src={index.imageUrl} 
        alt="Photoframe"
      />
      <p className='mt-3 text-[12px] font-[650]'  dangerouslySetInnerHTML={{ __html: index.title }}></p>
    </div>
  ))}
</div>



    
    </>
  );
};

export default Catalog;

