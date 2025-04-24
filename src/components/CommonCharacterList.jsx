import React from 'react';

function CommonCharacterList({ characters, selectedCharacter, onCharacterClick, onAddCustom }) {
  return (
    <div className="common-characters">
      <h3>Common Characters</h3>
      <div className="character-buttons">
        {characters.map((char) => (
          <button
            key={char}
            onClick={() => onCharacterClick(char)}
            className={selectedCharacter === char ? 'selected' : ''}
          >
            {char}
          </button>
        ))}
        <button onClick={onAddCustom}>+ Add Custom</button>
      </div>
    </div>
  );
}

export default CommonCharacterList;