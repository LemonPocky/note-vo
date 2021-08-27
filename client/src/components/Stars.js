import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';
import useWindowSize from '../utils/useWindowSize';

// Takes props.onUpdateRating function that defines what happens when a rating is edited
const Stars = ({ initialRating, onUpdateRating }) => {
  const [rating, setRating] = useState(initialRating ? initialRating : 0);
  const ORANGE = 'rgb(232, 178, 0)';
  const FADED_ORANGE = 'rgb(255, 225, 125)';
  const { width } = useWindowSize();

  // Change how the rating appears, then call the handler passed in via props
  const handleUpdateRating = (newRating) => {
    setRating(newRating);
    if (onUpdateRating) {
      onUpdateRating(newRating);
    }
  };

  return (
    <Ratings
      rating={rating}
      changeRating={handleUpdateRating}
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

export default Stars;
