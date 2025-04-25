import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import HanziWriter from "hanzi-writer";
import SvgGrid from "./SvgGrid";

function createCharacterSVG(charData, width = 60, height = 60) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const transformData = HanziWriter.getScalingTransform(width, height);
  group.setAttribute("transform", transformData.transform);
  svg.appendChild(group);

  charData.strokes.forEach((strokePath) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", strokePath);
    path.style.fill = "#aaa";
    group.appendChild(path);
  });

  return svg;
}

function CharacterDisplay({ character }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    let isCancelled = false;

    HanziWriter.loadCharacterData(character).then((charData) => {
      if (isCancelled) return;

      const svg = createCharacterSVG(charData);
      container.appendChild(svg);
    });

    return () => {
      isCancelled = true;
      container.innerHTML = "";
    };
  }, [character]);

  return (
    <Box
      sx={{
        position: "relative",
        width: 60,
        height: 60,
        border: "1px solid #aaa",
      }}
    >
      {/* Your custom grid background */}
      <SvgGrid
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Foreground character container */}
      <Box
        ref={containerRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}

function CharacterGrid({ character }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mt: 1,
        justifyContent: "center",
        width: "fit-content",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <CharacterDisplay key={i} character={character} />
      ))}
    </Box>
  );
}

export default CharacterGrid;
