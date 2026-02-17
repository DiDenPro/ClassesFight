import { useState } from 'react';
import "./App.css";

import { Sidebar } from './components/Sidebar';
import { Tabs } from './components/Tabs';
import { Preview } from './components/Preview';

import { characters } from './data/characters/index';
import { CharacterData } from './data/characters';

function App(){
  const [current, setCurrent] = useState<CharacterData>(characters[0]);

  return(
    <div className="app-layout">
      <Sidebar
        characters={characters}
        selected={current}
        onSelect={setCurrent}
      />
      <Tabs character={current}/>
      <Preview character={current} />
    </div>
  );
}

export default App;