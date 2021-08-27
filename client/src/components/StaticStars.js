import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';
import useWindowSize from '../utils/useWindowSize';

// Creates a Stars component that can't be changed
const StaticStars = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating ? initialRating : 0);
  const ORANGE = 'rgb(232, 178, 0)';
  const FADED_ORANGE = 'rgb(255, 225, 125)';
  const { width } = useWindowSize();

  return (
    <Ratings
      rating={rating}
      widgetHoverColors={ORANGE}
      widgetRatedColors={FADED_ORANGE}
      widgetDimensions={`${width / 32}px`}
      widgetSpacings={`${width / 220}px`}
    >
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
    </Ratings>
  );
};

export default StaticStars;
