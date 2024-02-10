import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { styled } from "@mui/material";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 200,
  width: "100%",
  padding: "50px",
  borderRadius: 5,
  position: "relative",
  outline: "none",
});

export const placeHolderSx = {
  position: "absolute",
  top: 0,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};
