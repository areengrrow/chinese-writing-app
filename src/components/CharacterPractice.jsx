import React, { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Box, Typography } from "@mui/material";
import SvgGridBoxes from "./SvgGridBoxes";
import CharacterGrid from "./CharacterGrid";

function CharacterPractice({ character, pinyin, relatives }) {
  const characterContainerRef = useRef(null);
  const fanningContainerRef = useRef(null);
  const searchingContainerRef = useRef(null);

  console.log(relatives);
  //use this array to display chracter
  useEffect(() => {
    const searchingContainer = searchingContainerRef.current;
    if (searchingContainer && relatives) {
      searchingContainer.innerHTML = "";

      relatives.forEach((relativeChar) => {
        const charContainer = document.createElement("div");
        charContainer.style.width = "30px";
        charContainer.style.height = "30px";
        searchingContainer.appendChild(charContainer);

        HanziWriter.loadCharacterData(relativeChar).then((charData) => {
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          charContainer.appendChild(svg);
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
          );
          const transformData = HanziWriter.getScalingTransform(30, 30); // Use container dimensions
          group.setAttributeNS(null, "transform", transformData.transform);
          svg.appendChild(group);
          charData.strokes.forEach((strokePath) => {
            const path = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            path.setAttributeNS(null, "d", strokePath);
            path.style.fill = "#000000";
            group.appendChild(path);
          });
        });
      });
    }
  }, [relatives]);

  useEffect(() => {
    const target = characterContainerRef.current;
    if (target) {
      target.innerHTML = ""; // Clear previous content
  
      HanziWriter.loadCharacterData(character).then(function (charData) {
        // Create container for pinyin and SVG
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";
  
        // Create and append pinyin div
        const pinyinDiv = document.createElement("div");
        pinyinDiv.innerText = pinyin;
        pinyinDiv.style.fontSize = "20px";
        pinyinDiv.style.marginBottom = "4px";
        pinyinDiv.style.fontWeight = "bold";
        wrapper.appendChild(pinyinDiv);
  
        // Create and append SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = "180px";
        svg.style.height = "180px";
  
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const transformData = HanziWriter.getScalingTransform(180, 180);
        group.setAttributeNS(null, "transform", transformData.transform);
        svg.appendChild(group);
  
        charData.strokes.forEach(function (strokePath) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttributeNS(null, "d", strokePath);
          path.style.fill = "#000000"; // Set fill color to black
          group.appendChild(path);
        });
  
        wrapper.appendChild(svg);
        target.appendChild(wrapper);
      });
    }
  }, [character]);
  

  useEffect(() => {
    if (fanningContainerRef.current) {
      fanningContainerRef.current.innerHTML = "";
      HanziWriter.loadCharacterData(character).then((charData) => {
        for (let i = 0; i < charData.strokes.length; i++) {
          renderFanningStrokes(
            fanningContainerRef.current,
            charData.strokes,
            i
          );
        }
      });
    }
  }, [character]);

  const renderFanningStrokes = (target, allStrokes, currentIndex) => {
    const svgWrapper = document.createElement("div");
    svgWrapper.style.display = "inline-block";
    svgWrapper.style.margin = "0.5px";
    svgWrapper.style.border = "1px solid #ccc";
    svgWrapper.style.background = "#fff";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "45");
    svg.setAttribute("height", "45");
    svg.classList.add("stroke-preview");

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const transformData = HanziWriter.getScalingTransform(45, 45);
    group.setAttributeNS(null, "transform", transformData.transform);
    svg.appendChild(group);

    // Draw strokes
    allStrokes.forEach((strokePath, index) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttributeNS(null, "d", strokePath);
      path.style.fill = index <= currentIndex ? "#000" : "#ccc";
      group.appendChild(path);
    });

    svgWrapper.appendChild(svg);
    target.appendChild(svgWrapper);
  };

  return (
    <Box
      sx={{
        width: "210mm",
        height: "297mm",
        border: "1px solid black",
        padding: 2,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pageBreakBefore: "always", // Ensures it starts on a new page when printed
      }}
    >
      <Box
        sx={{
          width: "95%",
          height: "95%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top section with character and stroke fans */}
        <Box
          sx={{
            flex: 3,
            borderBottom: "1px solid black",
            display: "flex",
            flexDirection: "row",
            gap: 20,
            padding: 2,
            alignItems: "flex-start",
          }}
        >
          {/* Character container */}
          <Box ref={characterContainerRef} />
          {/* Stroke order fan */}
          <Box
            ref={fanningContainerRef}
            sx={{
              flexGrow: 1,
              display: "grid",
              gap: 0,
              padding: 0,
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(45px, 1fr))",
                sm: "repeat(auto-fill, minmax(45px, 1fr))",
                md: "repeat(auto-fill, minmax(45px, 1fr))",
              },
            }}
          />
        </Box>

        {/* Practice area below */}
        <Box
          sx={{
            display: "flex",
            height: "100mm",
            borderBottom: "1px solid black",
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1, padding: 1, borderRight: "1px solid black" }}>
            <Typography variant="subtitle1">Tìm Từ {character} </Typography>
            <Box
              ref={searchingContainerRef}
              sx={{
                flex: 1,
                padding: 1,
                display: "grid", // Changed to grid
                gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", // Define grid columns
                gap: 2, // Add gap between grid items
                alignItems: "center", // Vertically align items in the grid cells
                justifyContent: "center", // Center content horizontally
              }}
            >
              {/* Relatives will be rendered here */}
            </Box>
          </Box>
          {/* Right Column (with two rows) */}
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
            {/* Top Row */}
            <Box sx={{ flex: 1, padding: 1, borderBottom: "1px solid black" }}>
              Vẽ hình minh hoạ
            </Box>
            {/* Bottom Row */}
            <Box sx={{ flex: 1, padding: 1 }}>Nghĩa Tiếng Việt</Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: "fit-content",
            borderBottom: "1px solid black",
            padding: 1,
            paddingBottom: 5,
          }}
        >
          <Typography variant="subtitle1">Tập Tô</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1,
              justifyContent: "center",
            }}
          >
            <CharacterGrid character={character} />
            <CharacterGrid character={character} />
          </Box>
        </Box>
        <Box
          sx={{
            height: "fit-content",
            padding: 1,
            paddingBottom: 5,
          }}
        >
          <Typography variant="subtitle1">Tập Viết</Typography>
          <SvgGridBoxes />
          <SvgGridBoxes />
        </Box>
      </Box>
    </Box>
  );
}

export default CharacterPractice;
