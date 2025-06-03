import { useQuery } from "@tanstack/react-query";
import usePathStore from "../stores/usePathStore";


type Directory = { files: string[]; folders: string[] };

function usePath() {
  const { path, setPath, forward, back } = usePathStore();

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
