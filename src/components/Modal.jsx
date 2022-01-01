import React from 'react';
import '../styles/modal.css';

const Modal = function Modal() {
  const storage = JSON.parse(localStorage.getItem('tools'));
  return (
    <div className="modal">
      { storage.map(({
        name, icon, color, link,
      }, index) => {
        if (index === 0) {
          return (
            <div>
              <div className="main-modal">
                <div
                  className="main-tool-view"
                  style={{
                    backgroundColor: `${color}`,
                  }}
                >
                  <img className="icon-main-tool" src={icon} alt={name} />
                </div>
                <div>
                  <h3>{name}</h3>
                  <button className="acess-link" type="button"><a href={link}>Acessar</a></button>
                </div>
              </div>
              <h4>ÚLTIMAS FERRAMENTAS VISUALIZADAS</h4>
            </div>
          );
        }
        return (
          <div className="tool-viewers">
            <div className="main-tools-view">
              <div className="tools-view" style={{ backgroundColor: `${color}` }}>
                <img src={icon} alt={name} />
              </div>
              <div>
                <h3>{name}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
