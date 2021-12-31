import React from 'react';
import PropTypes from 'prop-types';
import '../styles/cards.css';

const Cards = function Cards({
  name, color, icon, link, click,
}) {
  return (
    <div className="card-container">
      <button className="card-element" type="button" onClick={click} data-testid="card">
        <div className="card">
          <div className="icon" style={{ backgroundColor: `${color}` }}>
            <img src={icon} alt={name} />
          </div>
          <div>
            <a className="link-name" href={link}>{name}</a>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Cards;

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};
