import React from 'react';
import PropTypes from 'prop-types';

const Cards = function ({ tools }) {
  const estilo = {
    width: '300px',
    height: '300px',
  };
  console.log(tools);
  return (
    <div>
      <h3>Ferramentas</h3>
      {tools.map(({
        app_id, name, color, icon, link,
      }) => (
        <div key={app_id}>
          <img src={icon} alt={name} style={{ width: '300px', height: '300px', backgroundColor: color }} />
          <h4>{`${name}`}</h4>

        </div>
      ))}

    </div>
  );
};

export default Cards;

Cards.propTypes = {
  tools: PropTypes.shape({
    app_id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};
