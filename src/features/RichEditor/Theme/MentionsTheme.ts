import { BeautifulMentionsTheme } from "lexical-beautiful-mentions";

const MentionsTheme: BeautifulMentionsTheme = {
  "@": {
    trigger: "mention-trigger",
    value: "mention-variable",
  },
  "@Focused": "mention-variableFocused",
  "due:": {
    trigger: "text-blue-400 ...",
    value: "text-orange-400 ...",
  },
};

export default MentionsTheme;
