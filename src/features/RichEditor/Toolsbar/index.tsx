/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { createPortal } from "react-dom";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";
import BlockOptionsDropdownList from "./BlockOptionsDropdownList";
import FloatingLinkEditor from "./FloatingLinkEditor";
import { IconButton } from "@mui/material";
import { Select, GetSelectedNode } from "./SelectNode";
import "./Styles/styles.css";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

const blockTypeToBlockName: Record<string, string> = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

const Divider = () => <div className="divider" />;

const Toolsbar = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        const type = $isListNode(element)
          ? ($getNearestNodeOfType(anchorNode, ListNode) || element).getTag()
          : $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        setBlockType(type);
        if ($isCodeNode(element))
          setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
      }
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      const node = GetSelectedNode(selection);
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(updateToolbar);
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: { target: { value: string } }) => {
      console.log(e);
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) node.setLanguage(e.target.value);
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(
    () =>
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, isLink ? null : "https://"),
    [editor, isLink]
  );

  return (
    <div className="toolbar" ref={toolbarRef}>
      <IconButton
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </IconButton>
      <IconButton
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </IconButton>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label="Formatting Options"
          >
            <span className={"icon block-type " + blockType} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <IconButton
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
            className={"toolbar-item spaced " + (isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }
            className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }
            className={
              "toolbar-item spaced " + (isStrikethrough ? "active" : "")
            }
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough" />
          </IconButton>
          <IconButton
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
            className={"toolbar-item spaced " + (isCode ? "active" : "")}
            aria-label="Insert Code"
          >
            <i className="format code" />
          </IconButton>
          {/* <IconButton
            onClick={insertLink}
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </IconButton> */}
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
            }
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
            }
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
            }
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
            }
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default Toolsbar;
