import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import DataTable from './Components/Table/dataTable';
import './App.css';
import Tr from './Components/tr';

function pageData({data, per=50, page=1 }){
  // return (data.slice(per * (page - 1), per * page));
  return data.slice(0, 50);
}

function App() {

  const[stats, setStats] = useState([]);
  const[countries, setCountries] = useState([]);
  const[state, setState]= useState({
    worldData: pageData({ data: countries }),
    loading: false,
    page: 1,
  });  
  
  // Getting world COVID-19 data from API
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
      ])
      .then(response => {
        setStats(response[0].data);
        setCountries(response[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  

  function loadMore(){
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    setState((prev) => ({
      worldData: [
        ...prev.worldData, 
        ...pageData({ data: countries, page: prev.page + 1 }),
      ],
      loading: false,
      page: prev.page + 1,
    }));
  }

  return (
    <div>
      COVID-19 world dashboard
      <DataTable 
      loadMore = {loadMore}
      items={countries}
      renderHead={() => (
        <>
          <Tr label ='Flag'/>
          <Tr label ='Country' sortable sorted='ascending'/>
          <Tr label ='Total cases' sortable/>
          <Tr label ='Active cases' sortable/>
          <Tr label ='Recovered' sortable/>
          <Tr label ='Death' sortable/>
        </>
      )}
      renderRow={(row) => (
        <tr>
          <td>{row.critical}</td>
          <td>{row.country}</td>
          <td>{row.cases}</td>
          <td>{row.active}</td>
          <td>{row.recovered}</td>
          <td>{row.deaths}</td>
        </tr>
      )}
      />
    </div>
  );
}

export default App;
