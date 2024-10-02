const formatter = (data: string): string => {
  return data
    .replace("<div>", "")
    .replace("</div>", "")
    .replace("<h2>", `<h2 className="heading">`);
};
export default formatter;
