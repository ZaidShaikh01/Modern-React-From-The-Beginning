import { useState } from 'react';
import Star from './Star';

const Rating = ({
  heading = 'Rate your experince?',
  color = 'gold',
  feedbackMessages = ['Terrible', 'poor', 'meh', 'good', 'excellent'],
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className='rating-container'>
      <h2>{heading} </h2>
      <div className='stars'>
        {stars.map((star) => (
          <Star
            key={star}
            star={star}
            rating={rating}
            hover={hover}
            color={color}
            ratingClick={setRating}
            hoverEnter={setHover}
            hoverLeave={() => setHover(null)}
          />
          //   <span
          //     onClick={() => setRating(star)}
          //     onMouseEnter={() => setHover(star)}
          //     onMouseLeave={() => setHover(0)}
          //     key={star}
          //     className={`star`}
          //     style={{
          //       color: star <= (hover || rating) ? color : 'grey',
          //     }}
          //   >
          //     {'\u2605'}
          //   </span>
        ))}
      </div>
      {rating > 0 && <p className='feedback'>{feedbackMessages[rating - 1]}</p>}
    </div>
  );
};

export default Rating;
