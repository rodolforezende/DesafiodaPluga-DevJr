import React from 'react';
import Modal from 'react-modal';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import Cards from '../components/Cards';
import ModalComponent from '../components/Modal';
import '../styles/home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
    width: '40%',
  },
};

const Home = function Home() {
  const [search, setSearch] = React.useState('');
  const [tools, setTools] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [initial, setInitial] = React.useState(0);
  const [final, setFinal] = React.useState(11);

  React.useEffect(() => {
    async function loadTools() {
      const response = await api();
      setTools(response.data);
      setFilter(response.data);
    }
    loadTools();
  }, []);

  const findTool = (text) => {
    const newTools = tools
      .filter((value) => (value.name.toLowerCase().includes(text.toLowerCase())));
    setFilter(newTools);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    findTool(event.target.value);
  };

  const nextPage = () => {
    setInitial(initial + 12);
    setFinal(final + 12);
  };
  const backPage = () => {
    setInitial(initial - 12);
    setFinal(final - 12);
  };

  function openModal(obj) {
    const storage = JSON.parse(localStorage.getItem('tools')) || [];
    if (storage.length < 4) {
      const newItens = [obj, ...storage];
      localStorage.setItem('tools', JSON.stringify(newItens));
    } else {
      const newItens = [obj, ...storage.slice(0, 3)];
      localStorage.setItem('tools', JSON.stringify(newItens));
    }
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div id="root">
      <div>
        <SearchBar placeholder="Buscar Ferramenta" callback={handleChange} state={search} />
        <div className="cards-container">
          {tools.length ? filter
            .filter((_value, index) => index >= initial && index <= final).map(({
              app_id: appId, name, color, icon, link,
            }) => (

              <Cards
                key={appId}
                name={name}
                color={color}
                icon={icon}
                link={link}
                click={() => openModal({
                  appId, name, color, icon, link,
                })}
              />
            )) : 'Loading'}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
        >
          <ModalComponent />
          <button className="close-modal" type="button" onClick={closeModal}>close</button>
        </Modal>
        <div className="buttons">
          <button className="pagination-back" type="button" onClick={backPage} disabled={initial <= 0}><span>Back</span></button>
          <button className="pagination-next" type="button" onClick={nextPage} disabled={final > tools.length - 1}><span>Next</span></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
