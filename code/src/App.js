import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import DataTable from './Components/Table/dataTable';
import './App.css';
import Tr from './Components/tr';
import covid from './covid.png';

function pageData({data, per = 50, page=1 }){
  return data.slice(per * (page - 1), per * page);
}

export default function App({}) {
  const[latest, setLatest] = useState([]);
  const[countries, setCountries] = useState([]);
  const covidImg = <img className="img" src={covid} alt="Covid image"/>;

  
  const[state, setState]= useState({
    rawData: countries,
    data: pageData({ data: countries }),
    loading: false,
    page: 1,
    sortedBy: { country: 'ascending'},
  }); 

  //Change date format
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  // Getting world COVID-19 data from API
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
      ])
      .then(response => {
        setLatest(response[0].data);
        setCountries(response[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);
  
  // Sorting the data
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
      <br/>
      <h2>COVID-19 Dashboard</h2>
      <br/>
      {covidImg}
      <p className="text">
        Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
      <br/>
      <br/>
      The following data has been recently updated at: {lastUpdated}
      </p>
      <br/>
      <DataTable 
      loadMore = {loadMore}
      items={countries}
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
          <td>
              <div> <img className="flag-img" src={row.countryInfo.flag} alt=""/></div>
          </td>
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