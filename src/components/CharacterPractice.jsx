import React, { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Box, Typography } from "@mui/material";
import SvgGridBoxes from "./SvgGridBoxes";

function CharacterPractice({ character }) {
  const characterContainerRef = useRef(null);
  const fanningContainerRef = useRef(null);
  const [writer, setWriter] = useState(null);

  useEffect(() => {
    if (characterContainerRef.current) {
      characterContainerRef.current.innerHTML = "";
      const writerInstance = HanziWriter.create(
        characterContainerRef.current,
        character,
        {
          width: 120,
          height: 120,
          padding: 5,
          showOutline: true,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 300,
          showCharacter: true,
        }
      );
      setWriter(writerInstance);
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
          border: "1px solid blue",
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
          sx={{ display: "flex", height: "100mm", border: "1px solid gray" }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1, padding: 1, borderRight: "1px solid black" }}>
            Luyện Viết
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

        <Box sx={{ flex: 1, padding: 1, borderBottom: "1px solid black" }} />
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
            {Array(10)
              .fill()
              .map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "1px solid #aaa",
                  }}
                />
              ))}
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
          <Typography variant="subtitle1">Tập Viết</Typography>
          <SvgGridBoxes />
        </Box>
      </Box>
    </Box>
  );
}

export default CharacterPractice;
