import React, { useState } from 'react';
import CharacterPractice from './components/CharacterPractice';
import CommonCharacterList from './components/CommonCharacterList';

import './App.css';

function App() {
  const [character, setCharacter] = useState('好');
  const commonCharacters = ['你', '好', '我', '是', '的', '在', '有', '人', '这', '中', '大', '为', '上', '个', '国', '会'];

  const handleCharacterClick = (char) => setCharacter(char);
  const addCustomCharacter = () => {
    const customChar = prompt("Enter a Chinese character:");
    if (customChar && customChar.length === 1) {
      setCharacter(customChar);
    } else if (customChar) {
      alert("Please enter only one character at a time.");
    }
  };

  return (
    <div className="App">
      <CharacterPractice character={character} />
      <CommonCharacterList
        characters={commonCharacters}
        selectedCharacter={character}
        onCharacterClick={handleCharacterClick}
        onAddCustom={addCustomCharacter}
      />
    </div>
  );
}

export default App;