import React from 'react';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import Cards from '../components/Cards';

const Home = function () {
  const [search, setSearch] = React.useState('');
  const [tools, setTools] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  React.useEffect(() => {
    async function loadTools() {
      const response = await api.get();
      setTools(response.data);
      setFilter(response.data);
    }
    loadTools();
  }, []);

  const findTool = (text) => {
    if (!text || text === '') {
      setFilter([...tools]);
    } else {
      const tool = tools.filter((value) => (value.name.toLowerCase().includes(text.toLowerCase())));
      setFilter(tool);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    findTool(event.target.value);
  };
  return (
    <div>
      <div>
        <SearchBar placeholder="Buscar Ferramenta" callback={handleChange} state={search} />
        {tools.length ? <Cards tools={filter} /> : 'Loading'}
      </div>
    </div>
  );
};

export default Home;
