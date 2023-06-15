import Message from './Message';
import Alert from './components/Alert';
import ApartmentCard from './components/ApartmentCard';
import Button, { Color } from './components/Button';
import ListGroup from './components/ListGroup';
import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './pages/Home';
import Login from './pages/Login';
import AllApartments from './pages/AllApartments';
import SingleApartment from './pages/Apartment';
import Map from './components/Map';

function App() {
  // const [alertVisible, setAlertVisible] = useState(false);

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  // return (
  //   <div>
  //     {alertVisible && <Alert onClose={() => { setAlertVisible(false) }}> SuccessFully Done!</Alert>}

  //     <Button color='success' onClick={() => setAlertVisible(true)} >
  //       My Button
  //     </Button>
  //   </div>
  // );

  return <div>
    <Home />
  </div>;
}

export default App;
