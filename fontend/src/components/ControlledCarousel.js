import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../Image/pngtree-illustration-of-the-transport-logistics-center-and-transport-png-image_8487457.png'; // Đảm bảo đường dẫn đúng


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
        
        <form>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ExampleCarouselImage}
          alt="First slide"
        />
        <Carousel.Caption>
        <h1 >Quản Lý Kho</h1>
         
        </Carousel.Caption>
      </Carousel.Item>
     
    </Carousel>
    </form>
    </div>

  );
}

export default ControlledCarousel;