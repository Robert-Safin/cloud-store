type Props = {
  name: string;
  currentPath: string;
  onClick: (updated: string) => void;
};

function FolderCard(props: Props) {
  const stripped = props.name
    .replace(props.currentPath, "")
    .replace("/", "")
    .replace("/", "");

  return (
    <div className="border-2 flex flex-col items-center justify-center px-8 py-16">
      <p>folder</p>
      <p onClick={() => props.onClick(stripped)}>{stripped}</p>
    </div>
  );
}

export default FolderCard;
