import { BeautifulMentionsPlugin } from "lexical-beautiful-mentions";
import { Combobox, ComboboxItem } from "./Combobox";
import { getVariableKeys } from "./GetVariableKeys";

const MentionsVarible = ({ docId }: { docId: number }) => {
  const mentionItems = {
    "@": getVariableKeys(docId).map((item) => item.label),
  };

  return (
    <BeautifulMentionsPlugin
      items={mentionItems}
      allowSpaces
      menuItemLimit={20}
      menuComponent={Combobox}
      menuItemComponent={ComboboxItem}
    />
  );
};

export default MentionsVarible;
