import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ index, title, src }) {
  return (
    <div data-testid={ `${index}-recommendation-card` } className="recommendation-card">
      <img src={ src } alt={ title } className="recommendation-image" />
      <h3 data-testid={ `${index}-recommendation-title` }>{title}</h3>
    </div>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default RecommendationCard;
