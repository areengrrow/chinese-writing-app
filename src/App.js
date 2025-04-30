import React, { useState, useRef } from "react";
import { Box } from "@mui/material"; // Importing Box component
import CharacterPractice from "./components/CharacterPractice";
import CommonCharacterList from "./components/CommonCharacterList";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";
import { WORDS } from "./components/Words";
import { PINYINS } from "./components/Pinyins";

function App() {
  const initChar = WORDS[10]
  const initPinyin = PINYINS[10]
  const [character, setCharacter] = useState(initChar);
  const [pinyin, setPinyin] = useState(initPinyin);
  const [relatives, setRelatives] = useState([]);

  console.log(WORDS)
  const commonCharacters = [
    "你",
    "好",
    "我",
    "是",
    "的",
    "在",
    "有",
    "人",
    "这",
    "中",
    "大",
    "为",
    "上",
    "个",
    "国",
    "会",
  ];

  const tempRelatives = [
    "你",
    "好",
    "我",
    "是",
    "的",
    "中",
    "国",
    "人",
    "大",
    "小",
    "上",
    "下",
    "天",
    "地",
    "学",
    "生",
    "老",
    "师",
    "日",
    "月",
  ];

  const characterPracticeRef = useRef(null);

  const handleCharacterClick = (char) => {
    setCharacter(char);
    setRelatives(getRelatives(char));
  };

  const getRelatives = (selectedChar) => {
    let result = [];

    if (WORDS.length === 0) {
      const set = new Set(tempRelatives);
      set.add(selectedChar);
      result = Array.from(set);
      result = [...result, selectedChar, selectedChar].slice(0, 21); // Limit to 21 characters
    } else {
      const index = WORDS.indexOf(selectedChar);
      setPinyin(PINYINS[index])
      if (index === -1) return [];
      const start = Math.max(0, index - 10);
      const end = Math.min(WORDS.length, index + 11);
      result = WORDS.slice(start, end);

      while (result.filter((char) => char === selectedChar).length < 3) {
        result.push(selectedChar);
      }

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      result = result.slice(0, 21);
    }
    return result;
  };

  const addCustomCharacter = () => {
    const customChar = prompt("Enter a Chinese character:");
    if (customChar && customChar.length === 1) {
      setCharacter(customChar);
      setRelatives(getRelatives(customChar));
    } else if (customChar) {
      alert("Please enter only one character at a time.");
    }
  };

  const generatePDF = async () => {
    const element = characterPracticeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 5,
      useCORS: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(imgData);
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = (pageHeight * imgProperties.width) / imgProperties.height;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(`character-practice-${character}-stretched.pdf`);
  };

  return (
    <Box className="App">
      <Box ref={characterPracticeRef} className="practice-container">
        <CharacterPractice character={character} pinyin={pinyin} relatives={relatives} />
      </Box>

      <CommonCharacterList
        characters={commonCharacters}
        selectedCharacter={character}
        onCharacterClick={handleCharacterClick}
        onAddCustom={addCustomCharacter}
      />

      <Box sx={{ marginTop: 2 }}>
        <button
          className="action-button"
          onClick={generatePDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            borderRadius: "5px",
            textAlign: "center",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
            width: "auto",
            display: "inline-block",
            border: "2px solid #333",
          }}
        >
          Generate PDF
        </button>
      </Box>
    </Box>
  );
}

export default App;
