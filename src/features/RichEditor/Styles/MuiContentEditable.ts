import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { styled } from "@mui/material";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 200,
  width: "8.27in",
  height: "11.69in",
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
