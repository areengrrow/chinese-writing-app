import React, { useState, useRef } from "react";
import CharacterPractice from "./components/CharacterPractice";
import CommonCharacterList from "./components/CommonCharacterList";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./App.css";

function App() {
  const [character, setCharacter] = useState("號");
  const [uploadedCharacters, setUploadedCharacters] = useState([]);
  const [relatives, setRelatives] = useState([]);

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

    if (uploadedCharacters.length === 0) {
      // Combine tempRelatives and selectedChar, ensuring it's added 3 times
      const set = new Set(tempRelatives);
      set.add(selectedChar);
      result = Array.from(set);

      // Ensure the selectedChar appears exactly 3 times
      result = [...result, selectedChar, selectedChar].slice(0, 21); // Limit to 21 characters
    } else {
      const index = uploadedCharacters.indexOf(selectedChar);
      if (index === -1) return [];

      const start = Math.max(0, index - 10);
      const end = Math.min(uploadedCharacters.length, index + 11);
      result = uploadedCharacters.slice(start, end);

      // Add selectedChar 2 more times to make 3 times in total
      while (result.filter((char) => char === selectedChar).length < 3) {
        result.push(selectedChar);
      }

      // Shuffle the result before returning
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      // Ensure we have exactly 21 characters
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const chars = Array.from(new Set(text.replace(/\s/g, "").split("")));
      setUploadedCharacters(chars);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <div ref={characterPracticeRef} className="practice-container">
        <CharacterPractice character={character} relatives={relatives} />
      </div>

      <CommonCharacterList
        characters={commonCharacters}
        selectedCharacter={character}
        onCharacterClick={handleCharacterClick}
        onAddCustom={addCustomCharacter}
      />

      <div style={{ marginTop: "20px" }}>
        <button className="action-button" onClick={generatePDF}>
          Generate PDF
        </button>

        <label
          htmlFor="file-upload"
          className="action-button"
          style={{
            marginLeft: "10px",
            display: "inline-block",
            cursor: "pointer",
          }}
        >
          Upload .txt
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      {uploadedCharacters.length > 0 && (
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          ✅ Uploaded {uploadedCharacters.length} unique characters
        </div>
      )}
    </div>
  );
}

export default App;
