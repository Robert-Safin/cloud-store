import { useQueryClient } from "@tanstack/react-query";
import usePath from "../hooks/usePath";
import { useState } from "react";
import useAlert from "../hooks/useAlert";
import { FaFolderPlus } from "react-icons/fa";

function MakeFolderButton() {
  const { path } = usePath();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string | undefined>(undefined);
  const { trigger } = useAlert();

  async function makeFolder() {
    if (name === "" || name === undefined) {
      trigger("folder must have name", "error");
      return;
    }
    if (name.includes("/")) {
      trigger("folder name can not have any '/'", "error");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/folder?path=${path}&name=${name}`,
      );

      if (!res.ok) {
        trigger("Error", "error");
        return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["directory", path],
      });
      setName(undefined);
      trigger("success", "info");
    } catch (err) {
      trigger(JSON.stringify(err), "error");
    }
  }
  return (
    <div>
      <h4 className="mb-1">Create folder</h4>
      <div className="flex h-[50px] rounded-md border-1">
        <input
          className="px-4 py-2"
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => makeFolder()} className="px-4 py-2">
          <FaFolderPlus className="cursor-pointer text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default MakeFolderButton;
