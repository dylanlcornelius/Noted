import React from 'react';
import './App.scss';
import {Note} from './note/note';
import { Header } from './header/header';

const App: React.FC = () => {

  return (
    <div className="App">
      <Header/>
      <div className="App-body">
        <Note/>
      </div>
    </div>
  );
}

export default App;
