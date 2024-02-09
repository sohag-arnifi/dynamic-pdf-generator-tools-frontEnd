import { BeautifulMentionsPlugin } from "lexical-beautiful-mentions";

const MentionsVarible = () => {
  const mentionItems = {
    "@": ["Anton", "Boris", "Catherine", "Dmitri", "Elena", "Felix", "Gina"],
    "#": ["Anton", "Boris", "Catherine", "Dmitri", "Elena", "Felix", "Gina"],
  };

  return <BeautifulMentionsPlugin items={mentionItems} />;
};

export default MentionsVarible;
