import Buttons from "./components/Buttons";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
import Uploader from "./components/Uploader";
import usePath from "./hooks/usePath";

function App() {
  // no starting slash
  const { path, contents, forward } = usePath();

  return (
    <div className="border-4 border-black h-screen w-full">
      <Uploader />
      <Buttons />

      <div className="grid grid-cols-4">
        {contents?.folders?.map((f, i) => (
          <FolderCard key={i} name={f} currentPath={path} onClick={forward} />
        ))}
        {contents?.files?.map((f, i) => (
          <FileCard key={i} name={f} currentPath={path} />
        ))}
      </div>
    </div>
  );
}

export default App;
