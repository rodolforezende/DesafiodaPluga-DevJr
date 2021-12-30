import React from 'react';

const Modal = function Modal() {
  const storage = JSON.parse(localStorage.getItem('tools'));
  return (
    <div>
      { storage.map(({
        name, icon, color, link,
      }, index) => {
        if (index === 0) {
          return (
            <div>
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
              <h4>ÚLTIMAS FERRAMENTAS VISUALIZADAS</h4>
            </div>
          );
        }
        return (
          <div>
            <div style={{ backgroundColor: `${color}`, borderRadius: '100%' }}>
              <img src={icon} alt={name} />
            </div>
            <div>
              <h3>{name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
