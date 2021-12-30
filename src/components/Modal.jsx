import React from 'react';

const Modal = function Modal() {
  const storage = JSON.parse(localStorage.getItem('tools'));
  return (
    <div>
      { storage.filter((_value, index) => index === 0).map(({
        name, color, icon, link,
      }) => (
        <>
          <div style={{
            backgroundColor: `${color}`, borderRadius: '100%', width: '200px', height: '200px',
          }}
          >
            <img src={icon} alt={name} />
          </div>
          <div>
            <h3>{name}</h3>
            <a href={link}>Acessar</a>
          </div>
        </>
      ))}
      <h4>ÚLTIMAS FERRAMENTAS VISUALIZADAS</h4>
      <div>
        { storage.filter((_value, index) => index !== 0).map(({
          name, color, icon,
        }) => (
          <>
            <div style={{ backgroundColor: `${color}`, borderRadius: '100%' }}>
              <img src={icon} alt={name} />
            </div>
            <div>
              <h3>{name}</h3>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Modal;
