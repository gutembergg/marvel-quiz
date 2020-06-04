import React from 'react';
import '../../App.css';
import Routes from '../../routes';

import Header from '../Header';
import Footer from '../Footer'

function App() {
  return (
    <div>
     <Header />
       <Routes />
     <Footer />
    </div>
  );
}

export default App;
