import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  BaseSelection,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";
import { GetSelectedNode } from "../SelectNode";

const LowPriority = 1;

const positionEditorElement = (editor: HTMLElement, rect: DOMRect | null) => {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
};

const FloatingLinkEditor: React.FC<{ editor: LexicalEditor }> = ({
  editor,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null
  );

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = GetSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();

    if (!editorElem || !nativeSelection) {
      return;
    }

    const rootElement = editor.getRootElement() as HTMLElement;

    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          // @ts-expect-error: TypeScript error about 'Element' missing properties from 'HTMLElement'
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      positionEditorElement(editorElem, rect);
      setLastSelection(selection as BaseSelection);
    } else {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }
  }, [editor]);

  useEffect(() => {
    const update = () => {
      updateLinkEditor();
    };
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(update);
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
    return () => {
      unregister();
    };
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    updateLinkEditor();
  }, [updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (lastSelection !== null && linkUrl !== "") {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      }
      setEditMode(false);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setEditMode(false);
    }
  };

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="link-input">
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </a>
          <div
            className="link-edit"
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setEditMode(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FloatingLinkEditor;
