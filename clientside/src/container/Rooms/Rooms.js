import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { Navbar, SubHeading } from '../../components';
import { images } from '../../constants';
import '../Gallery/Gallery.css';

const Rooms = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
      <>
      <Navbar></Navbar>
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="$500 per night" />
        <h1 className="headtext__cormorant">King size Rooms</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>At 265 square feet / 24 square meters, the large room with an oversized King bed and upgraded linens includes an accessible shower, a well-lighted work space.Maximum  occupancy is 4 guests.We give two extra soft matrtress.</p>
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[images.king1, images.king2, images.king3].map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="$300 per night" />
        <h1 className="headtext__cormorant">Queen Size Rooms</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>Superior Single Queen Room Designed for an individual traveler, the very comfortable 225 square foot /19 meter, 40” HD television with expanded cable. Maximum  occupancy is 4 guests.We give two extra soft matrtress. </p>
        
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[images.queen1, images.queen2, images.queen3].map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div> <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="$500 per night" />
        <h1 className="headtext__cormorant">Family Size Rooms</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>With two Queen beds and a well-lighted work space and all of the upgraded amenities used throughout the hotel, the room is a spacious 265 square feet / 24 meters. The accommodations include a 40” HD television, vanity area and an ADA approved Roll-in Shower.Maximum  occupancy is 8 guests.We give Four extra soft matrtress.</p>
        
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[images.family1, images.family2, images.family3].map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Rooms;
