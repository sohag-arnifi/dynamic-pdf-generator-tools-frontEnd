import { $generateHtmlFromNodes } from "@lexical/html";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable, placeHolderSx } from "./Styles/MuiContentEditable";
import { Box } from "@mui/material";
import Toolbar from "./Tools";
import "./Styles/LexicalThemeStyle.css";
import editorConfig from "./Config";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import MentionsVarible from "./Plugin/MentionsVariable";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

const ConvertToHtmlPlugin = () => {
  const [editor] = useLexicalComposerContext();

  editor.registerUpdateListener(({ editorState }) => {
    editorState.read(() => {
      const tmp = $generateHtmlFromNodes(editor);
      console.log(tmp);
    });
  });

  return null;
};

const ArnifiRichEditor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Toolbar />
      <Box sx={{ position: "relative" }}>
        <RichTextPlugin
          contentEditable={<MuiContentEditable />}
          placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MentionsVarible />
        <ConvertToHtmlPlugin />
      </Box>
    </LexicalComposer>
  );
};

export default ArnifiRichEditor;
