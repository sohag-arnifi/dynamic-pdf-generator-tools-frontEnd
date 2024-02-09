import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";

export const eventTypes: { [key: string]: string } = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
};

const pluginsList: {
  id: number;
  icon: JSX.Element;
  event: string;
}[] = [
  {
    id: 8,
    icon: <UndoOutlinedIcon />,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    icon: <RedoOutlinedIcon />,
    event: eventTypes.formatRedo,
  },
  {
    id: 1,
    icon: (
      <p
        style={{
          fontSize: "20px",
          width: "20px",
          height: "20px",
          fontWeight: "600",
        }}
      >
        T
      </p>
    ),
    event: eventTypes.paragraph,
  },
  {
    id: 2,
    icon: (
      <p
        style={{
          fontSize: "20px",
          width: "20px",
          height: "20px",
          fontWeight: "600",
        }}
      >
        H1
      </p>
    ),
    event: eventTypes.h1,
  },
  {
    id: 3,
    icon: (
      <p
        style={{
          fontSize: "20px",
          width: "20px",
          height: "20px",
          fontWeight: "600",
        }}
      >
        H2
      </p>
    ),
    event: eventTypes.h2,
  },
  {
    id: 4,
    icon: <FormatListBulletedIcon />,
    event: eventTypes.ul,
  },

  {
    id: 5,
    icon: <FormatListNumberedIcon />,
    event: eventTypes.ol,
  },
  {
    id: 10,
    icon: <FormatBoldOutlinedIcon />,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    icon: <FormatItalicOutlinedIcon />,
    event: eventTypes.formatItalic,
  },
  {
    id: 12,
    icon: <FormatUnderlinedOutlinedIcon />,
    event: eventTypes.formatUnderline,
  },
  {
    id: 15,
    icon: <FormatAlignLeftOutlinedIcon />,
    event: eventTypes.formatAlignLeft,
  },

  {
    id: 16,
    icon: <FormatAlignJustifyOutlinedIcon />,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 17,
    icon: <FormatAlignRightOutlinedIcon />,
    event: eventTypes.formatAlignRight,
  },
  {
    id: 6,
    icon: <FormatQuoteIcon />,
    event: eventTypes.quote,
  },

  {
    id: 7,
    icon: <CodeIcon />,
    event: eventTypes.formatCode,
  },

  {
    id: 13,
    icon: <ImageIcon />,
    event: eventTypes.insertImage,
  },
  {
    id: 14,
    icon: <InsertLinkOutlinedIcon />,
    event: eventTypes.formatInsertLink,
  },
];

export default pluginsList;
