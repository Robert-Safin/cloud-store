import usePath from "../hooks/usePath";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";

function View() {
  const { path, contents, forward } = usePath();
  console.log(contents);

  return (
    <div className="flex flex-col space-y-8 rounded-b-lg bg-slate-900 p-4">
      {contents?.files || contents?.folders ? (
        <>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl">Folders</h2>
            <div className="flex flex-wrap space-x-4">
              {contents?.folders?.map((f, i) => (
                <FolderCard
                  key={i}
                  name={f}
                  currentPath={path}
                  onClick={forward}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl">Files</h2>
            <div className="flex flex-wrap space-x-4">
              {contents?.files?.map((f, i) => (
                <FileCard key={i} name={f} currentPath={path} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center text-3xl">Nothing here</h1>
      )}
    </div>
  );
}

export default View;
