import AiResponse from "./AiResponse";
import UserQuestion from "./UserQuestion";

const ChatTab = ({
  query,
  cookMode,
  last,
}: {
  query: string;
  cookMode: boolean;
  last: boolean;
}) => {
  return (
    <div>
      <UserQuestion query={query} />
      <AiResponse query={query} cookMode={cookMode} last={last} />
    </div>
  );
};
export default ChatTab;
