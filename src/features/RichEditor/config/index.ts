import LexicalEditorTheme from "../Theme/LexicalEditorTheme";

import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { BeautifulMentionNode } from "lexical-beautiful-mentions";
import MentionsTheme from "../Theme/MentionsTheme";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const editorConfig = {
  namespace: "MyEditor",
  theme: { ...LexicalEditorTheme, beautifulMentions: MentionsTheme },
  onError,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    BeautifulMentionNode,
  ],
};

export default editorConfig;
