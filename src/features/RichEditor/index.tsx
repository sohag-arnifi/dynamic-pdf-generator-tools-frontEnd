import { $getRoot, $getSelection } from "lexical";
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
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import MentionsVarible from "./Plugin/MentionsVariable";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

const ArnifiRichEditor = () => {
  function onChange(editorState: { read: (arg0: () => void) => void }) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  }

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

        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />

        <ListPlugin />
        <LinkPlugin />
        <MentionsVarible />
      </Box>
    </LexicalComposer>
  );
};

export default ArnifiRichEditor;
