import { useQueryClient } from "@tanstack/react-query";
import usePath from "../hooks/usePath";
import { useState } from "react";

function Buttons() {
  const { path, back } = usePath();
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");

  async function makeFolder() {
    try {
      const res = await fetch(
        `http://localhost:8080/folder?path=${path}&name=${name}`
      );

      if (!res.ok) {
        throw new Error("server could not make folder");
      }
      queryClient.invalidateQueries({
        queryKey: ["directory", path],
      });
    } catch (err) {
      console.error("Folder failed:", err);
    }
  }

  return (
    <div className="flex space-x-8">
      <button onClick={() => back()}>back</button>
      <input className="border-2 border-lime-500" type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => makeFolder()}>add folder</button>
      <p>current path : {path}</p>
    </div>
  );
}

export default Buttons;
