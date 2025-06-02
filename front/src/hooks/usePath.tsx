import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Directory = { files: string[]; folders: string[] };

function usePath() {
  const [path, setPath] = useState<string>("root");

  const { data, refetch } = useQuery<Directory>({
    queryKey: ["directory", path],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/list?path=${path}`);
      if (!res.ok) {
        throw new Error("Failed to fetch directory");
      }
      const data = await res.json();
      return {
        files: data.files,
        folders: data.folders,
      };
    },
  });

  function forward(target: string) {
    const updated = path + "/" + target;
    setPath(updated);
  }

  function back() {
    if (path === "root") return;
    const split = path.split("/");
    split.pop();
    setPath(split.join("/"));
  }

  return {
    path,
    setPath,
    contents: data ?? null,
    forward,
    back,
    refetch,
  };
}

export default usePath;
