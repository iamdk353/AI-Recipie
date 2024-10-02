const UserQuestion = ({ query }: { query: string }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">Generate recipie For {query}</div>
    </div>
  );
};
export default UserQuestion;
