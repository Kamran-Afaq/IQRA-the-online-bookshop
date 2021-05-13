import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './custom.css'

const ProductImage = (props) => {

  const [it, setIt] = useState([props.m])

  let items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'data:image/jpeg;base64,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',
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EFourth%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 4',
      caption: 'Slide 4'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  let slides = []
  useEffect(() => {
  })
  setIt(props.m)
  if (it != undefined) {
    slides = it.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    })
  }

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={(it || items)} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default ProductImage;