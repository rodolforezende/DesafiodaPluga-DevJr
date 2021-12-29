import React from 'react';

const Modal = function Modal({item: {appId, name, color, icon, link}}, acess) {
  console.log(acess);
  return (
    <div>
      <h2>Hello</h2>
      <div>I am a modal</div>
    </div>
  );
};

export default Modal;
