import React, { useEffect, useState  } from "react";
import axios from "axios";

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
        console.log(response[0].data);
        console.log(response[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  return (
    <div>
      COVID-19 world dashboard
    </div>
  );
}

export default App;
