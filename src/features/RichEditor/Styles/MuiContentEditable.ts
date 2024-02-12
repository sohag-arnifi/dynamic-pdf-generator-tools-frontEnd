import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { styled } from "@mui/material";

export const MuiContentEditable = styled(ContentEditable)({
  width: "8.27in",
  minHeight: "11.69in",
  padding: "0.65in",
  borderRadius: 5,
  position: "relative",
  outline: "none",
  overflow: "none",
  gutter: "0px",
  background: "white",
  margin: "20px auto",
});

export const placeHolderSx = {
  position: "absolute",
  top: 0,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};
