type Props = {
  name: string;
  currentPath: string;
};

function FileCard(props: Props) {
  const stripped = props.name
    .replace(props.currentPath, "")
    .replace("/", "")
    .replace("/", "");

  return (
    <div className="border-2 flex flex-col items-center justify-center px-8 py-16">
      <p>File</p>
      <p>{stripped}</p>
    </div>
  );
}

export default FileCard;
