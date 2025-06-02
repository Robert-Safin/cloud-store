import { useEffect, useState } from "react";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
//import Explorer from "./explorer";

type Directory = { files: Array<string>; folders: Array<string> };

function App() {
  // no starting slash
  const [path, setPath] = useState<string>("root");
  const [file, setFile] = useState<Blob | null>(null);
  const [contents, setContents] = useState<Directory | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  useEffect(() => {
    async function fetch_directory() {
      try {
        const res = await fetch(`http://localhost:8080/list?path=${path}`);
        const data = await res.json();

        setContents({
          files: data.files,
          folders: data.folders,
        });
      } catch (err) {
        console.error("fetch failed:", err);
      }
    }

    fetch_directory();
  }, [path]);

  function updatePath(target: string) {
    const updated = path + "/" + target;
    setPath(updated);
  }

  function back() {
    const split = path.split("/");
    split.pop();
    setPath(split.join("/"));
  }

  return (
    <div className="border-4 border-black h-screen w-full">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">submit</button>
      </form>

      <button onClick={() => back()}>back</button>

      <div className="grid grid-cols-4">
        {contents?.folders?.map((f, i) => (
          <FolderCard
            key={i}
            name={f}
            currentPath={path}
            onClick={updatePath}
          />
        ))}
        {contents?.files?.map((f, i) => (
          <FileCard key={i} name={f} currentPath={path} />
        ))}
      </div>
    </div>
  );
}

export default App;
