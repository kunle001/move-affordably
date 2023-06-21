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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactUs from './pages/Contactus';

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
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='/apartments' element={<AllApartments />} />
          <Route path="/apartment/:id" element={<SingleApartment />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  </div>;
}

export default App;
