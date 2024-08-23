import React from 'react';
import './Thankyou.css'
import group2 from './images/Group (8).png'
import group1 from './images/mandala.png'

function App() {
  return (
    <div className="thanks">
      <div className="message">
        <p className='enquiry1' style={{fontFamily:'Poppins',fontWeight:'bold',fontSize:'42px'}}>THANK YOU FOR YOUR ENQUIRY,</p>
        <p className='enquiry1'style={{fontFamily:'Poppins',fontWeight:'bold',fontSize:'42px'}}>WE SHALL REVERT BACK SOON.</p>
      </div>
      <div className="buttons2">
        <button className="call-button">CALL US: +91-9811099999</button>
        <button className="download-button">DOWNLOAD CATALOGUE NOW</button>
      </div>
      
        <div>
          <img src={group2} className='mandala' />
        </div>
        <div>
        <img src={group1} className="thankyou" alt="Group Image" />        
        </div>
      
    </div>
  );
}

export default App;

