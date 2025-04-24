import React from "react";
import { Box } from "@mui/material";
import SvgGrid from "./SvgGrid";

export default function SvgGridBoxes() {
  return (
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
        .fill(null)
        .map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 60,
              height: 60,
              border: "1px solid #aaa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgGrid/>
          </Box>
        ))}
    </Box>
  );
}
