import React, { useEffect, useState  } from "react";
import axios from "axios";
import DataTable from "./Components/dataTable"

function App() {

  const[stats, setStats] = useState([]);
  const[countries, setCountries] = useState([]);

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
        console.log(response[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const tableData = countries.map((data, i) => {
    return(
          <tr key={i}>
            <td><img src={data.img}/></td>
            <td>{data.country}</td>
            <td>{data.cases}</td>
            <td>{data.active}</td>
            <td>{data.recovered}</td>
            <td>{data.deaths}</td>
          </tr>
    )}
  );

  return (
    <div>
      COVID-19 world dashboard
      <DataTable 
      items={countries}
      renderHead={() => (
        <tr>
          <th>Flag</th>
          <th>Country</th> 
          <th>Total cases</th>
          <th>Active cases</th>
          <th>Recovered</th>
          <th>Death</th>
        </tr>
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
