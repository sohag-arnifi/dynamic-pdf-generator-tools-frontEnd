import { BeautifulMentionsTheme } from "lexical-beautiful-mentions";

const MentionsTheme: BeautifulMentionsTheme = {
  // 👇 use the trigger name as the key
  "@": "mention-variable",
  // 👇 add the "Focused" suffix to style the focused mention
  "@Focused": "outline-none shadow-md ...",
  // 👇 use a configuration object if you need to apply different styles to trigger and value
  "due:": {
    trigger: "text-blue-400 ...",
    value: "text-orange-400 ...",
  },
};

export default MentionsTheme;
