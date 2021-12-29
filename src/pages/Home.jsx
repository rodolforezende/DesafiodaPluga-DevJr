import React from 'react';
import Modal from 'react-modal';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import Cards from '../components/Cards';
import ModalComponent from '../components/Modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Home = function Home() {
  const [search, setSearch] = React.useState('');
  const [tools, setTools] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [initial, setInitial] = React.useState(0);
  const [final, setFinal] = React.useState(11);
  const [item, setItem] = React.useState({});
  const [acess, setAcess] = React.useState([]);

  React.useEffect(() => {
    async function loadTools() {
      const response = await api.get();
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
    setItem(obj);
    const array = [];
    const storage = JSON.parse(localStorage.getItem('tools'));
    if (!storage) {
      localStorage.setItem('tools', JSON.stringify(array));
    }
    if (storage.length < 4) {
      const takeback = JSON.parse(localStorage.getItem('tools'));
      array.push(...takeback, obj);
      localStorage.setItem('tools', JSON.stringify(array));
      console.log(array);
    } else {
      const takeback = JSON.parse(localStorage.getItem('tools'));
      const newItens = takeback.slice(0, 1);
      array.push(...newItens, obj);
      localStorage.setItem('tools', JSON.stringify(array));
    }
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <SearchBar placeholder="Buscar Ferramenta" callback={handleChange} state={search} />
        {tools.length ? filter.filter((_value, index) => index >= initial && index <= final).map(({
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
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
        >
          <ModalComponent item={item} acess={acess} />
          <button type="button" onClick={closeModal}>close</button>
        </Modal>
        <button type="button" onClick={backPage} disabled={initial <= 0}>Back</button>
        <button type="button" onClick={nextPage} disabled={final > tools.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default Home;
