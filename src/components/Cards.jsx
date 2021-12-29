import React from 'react';
import PropTypes from 'prop-types';

const Cards = function Cards({
  appId, name, color, icon, link, click,
}) {
  return (
    <button type="button" onClick={click}>
      <div
        key={appId}
        style={{
          width: '200px', marginTop: '30px',
        }}
      >
        <div style={{ backgroundColor: `${color}`, borderRadius: '100%' }}>
          <img src={icon} alt={name} />
        </div>
        <div>
          <a href={link}>{name}</a>
        </div>
      </div>
    </button>
  );
};

export default Cards;

Cards.propTypes = {
  appId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};
