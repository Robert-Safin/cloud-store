import type { Directory } from "../App";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";






function View(props:Directory) {
  return (
    <div className="grid grid-cols-4">
      {props?.folders?.map((f, i) => (
        <FolderCard key={i} name={f} currentPath={path} onClick={updatePath} />
      ))}
      {props?.files?.map((f, i) => (
        <FileCard key={i} name={f} currentPath={path} />
      ))}
    </div>
  );
}

export default View;
