import React, { useState, useRef } from "react";
import CharacterPractice from "./components/CharacterPractice";
import CommonCharacterList from "./components/CommonCharacterList";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // Import at the top instead of dynamic import

import "./App.css";

function App() {
  const [character, setCharacter] = useState("好");
  const commonCharacters = [
    "你", "好", "我", "是", "的", "在", "有", "人",
    "这", "中", "大", "为", "上", "个", "国", "会",
  ];

  const characterPracticeRef = useRef(null); // Ref for the component wrapper

  const handleCharacterClick = (char) => setCharacter(char);

  const addCustomCharacter = () => {
    const customChar = prompt("Enter a Chinese character:");
    if (customChar && customChar.length === 1) {
      setCharacter(customChar);
    } else if (customChar) {
      alert("Please enter only one character at a time.");
    }
  };

  const generatePDF = async () => {
    const element = characterPracticeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 5, // higher resolution
      useCORS: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })
    const imgProperties = pdf.getImageProperties(imgData)
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = (pageHeight*imgProperties.width)/imgProperties.height;
    
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(`character-practice-${character}-stretched.pdf`);
  };

  return (
    <div className="App">
      <div ref={characterPracticeRef} className="practice-container">
        <CharacterPractice character={character} />
      </div>

      <CommonCharacterList
        characters={commonCharacters}
        selectedCharacter={character}
        onCharacterClick={handleCharacterClick}
        onAddCustom={addCustomCharacter}
      />

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default App;
