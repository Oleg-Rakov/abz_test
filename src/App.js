import {useEffect} from "react";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import {BASE_URL} from "./api/api";
import './App.scss';

const App = () => {
  // Get auth token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/token`);
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header/>
      <Wrapper/>
    </div>
  );
}

export default App;
