/* eslint-disable @typescript-eslint/no-explicit-any */
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable, placeHolderSx } from "./Styles/MuiContentEditable";
import { Box } from "@mui/material";
import "./Styles/LexicalThemeStyle.css";
import editorConfig from "./config";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import MentionsVarible from "./Plugins/MentionsVariable";
import { $getRoot, $insertNodes } from "lexical";
import Form from "../StepperForm/components/Forms";
import { useFormContext } from "react-hook-form";
import { BeautifulMentionNode } from "lexical-beautiful-mentions";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import PlaygroundAutoLinkPlugin from "./Plugins/AutoLinkPlugin";
import Toolsbar from "./Toolsbar";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

const ConvertToHtmlPlugin = ({ docName }: { docName: string }) => {
  const [editor] = useLexicalComposerContext();
  const { setValue, getValues } = useFormContext();
  const value = getValues(docName);

  useEffect(() => {
    if (value) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();

        if (!root.isEmpty()) {
          root.clear();
        }

        $insertNodes(nodes);
      });
    }
    editor.registerNodeTransform(BeautifulMentionNode, (textNode) => {
      textNode.__trigger = "";
    });

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const tmp = $generateHtmlFromNodes(editor);

        return setValue(docName, tmp);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const handelOnChange = (e: any) => {
  console.log(e);
};

const ArnifiRichEditor = ({
  selectedDoc,
}: {
  selectedDoc: { id: number; name: string };
}) => {
  return (
    <Form submitHandler={() => console.log("submit")}>
      <Box>
        <LexicalComposer initialConfig={editorConfig}>
          <Toolsbar />
          <MyCustomAutoFocusPlugin />
          <Box sx={{ position: "relative" }}>
            <RichTextPlugin
              contentEditable={<MuiContentEditable />}
              placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={handelOnChange} />
            <HistoryPlugin />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MentionsVarible docId={selectedDoc.id} />
            <PlaygroundAutoLinkPlugin />
            <CodeHighlightPlugin />
            <ListMaxIndentLevelPlugin />
            <ConvertToHtmlPlugin docName={selectedDoc.name} />
          </Box>
        </LexicalComposer>
      </Box>
    </Form>
  );
};

export default ArnifiRichEditor;
