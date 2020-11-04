import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import DataTable from './Components/Table/dataTable';
import './App.css';
import Tr from './Components/tr';

function pageData({data, per = 50, page=1 }){
  return data.slice(per * (page - 1), per * page);
}

export default function App({}) {
  // const[stats, setStats] = useState([]);
  const[countries, setCountries] = useState([]);
  const[state, setState]= useState({
    rawData: countries,
    data: pageData({ data: countries }),
    loading: false,
    page: 1,
    sortedBy: { country: 'ascending'},
  }); 

  // Getting world COVID-19 data from API
  useEffect(() => {
    axios
      .all([
        // axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
      ])
      .then(response => {
        // setStats(response[0].data);
        setCountries(response[0].data);
        setState.countries(response[0].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);
  
  //Soting the data using bubble sort
  useEffect(() => {
    if (!state.sortedBy) return;
    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];

    setState(prev => ({
      ...prev,
        data: countries.sort((a, b) => {
          return direction === 'ascending'
            ? a[sortKey] > b[sortKey]
            : a[sortKey] > b[sortKey];
      }),
    }));
  }, [state.sortedBy]);

  function loadMore(){
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    setState((prev) => ({
      data: [
        ...prev.data, 
        ...pageData({ data: countries, page: prev.page + 1 }),
      ],
      loading: false,
      page: prev.page + 1,
    }));
  }

  return (
    <div className='center'>
      <h1>COVID-19 world dashboard</h1>
      <DataTable 
      loadMore = {loadMore}
      items={state.data}
      renderHead={() => (
        <>
          <Tr label ='Flag'/>
          <Tr 
            label ='Country'  
            sortedBy={state.sortedBy}
            sort={{key: 'country', changer: setState}}/>
          <Tr 
            label ='Total cases' 
            sortedBy={state.sortedBy}
            sort={{key: 'total_cases', changer: setState}}/>
          <Tr 
            label ='Active cases' 
            sortedBy={state.sortedBy}
            sort={{key: 'active_cases', changer: setState}}/>
          <Tr 
            label ='Recovered' 
            sortedBy={state.sortedBy}
            sort={{key: 'recovered', changer: setState}}/>
          <Tr 
            label ='Death' 
            sortedBy={state.sortedBy}
            sort={{key: 'death', changer: setState}}/>
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