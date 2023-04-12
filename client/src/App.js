import {React, useState} from 'react';
import { Offline, Online } from "react-detect-offline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import Header from './Components/Header';
import Main from './Components/Main';
import FooterComponent from './Components/Footer';
import NetworkLost from './Components/NetworkLost';

import Contact from './pages/Contact';
import About from './pages/About';
import NoPage from './pages/NoFoundPage';


function App() {
  // const [restor, setLoad] = useState(false);
 
  const handleOnline = () => {
    // setLoad(true);
  }

  const handleOffline = () => {
    // setLoad(false);
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <div className="headerContainer">
        <Header />
      </div>
      <div className='container mainApp my-3 py-3 flex-fill'>
        <Offline onChange={handleOffline}>
          <>
            <NetworkLost />
            {/* <ToastContainer className="p-3" position={"bottom-center"}>
              <Toast bg={'danger'} show={true} delay={3000} autohide>
                <Toast.Body className={'text-white'}>Connection Lost!</Toast.Body>
              </Toast>
            </ToastContainer> */}
          </>
        </Offline>
        <Online onChange={handleOnline}>
            {/* <ToastContainer className="p-3" position={"bottom-center"}>
              <Toast bg={'success'} show={true} delay={3000} autohide>
                <Toast.Body className={'text-white'}>Connection Restored </Toast.Body>
              </Toast>
            </ToastContainer> */}
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Main/>} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
        </Online>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
