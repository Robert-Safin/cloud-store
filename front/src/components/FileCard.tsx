import { FaFile } from "react-icons/fa";

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
    <div className="flex flex-col min-w-[120px] max-w-[120px] min-h-[120px] max-h-[120px]">
      <div className="flex flex-col  px-3 space-y-2">
        <FaFile className="text-4xl"/>
        <p className="text-sm break-all line-clamp-4">{stripped}</p>
      </div>
    </div>
  );
}

export default FileCard;
