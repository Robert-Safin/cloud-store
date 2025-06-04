import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import useAlertStore from "../hooks/useAlert";
import usePath from "../hooks/usePath";

type Props = {
  name: string;
  currentPath: string;
  onClick: (updated: string) => void;
};

function FolderCard(props: Props) {
  const { path } = usePath();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { trigger } = useAlertStore();

  const stripped = props.name
    .replace(props.currentPath, "")
    .replace("/", "")
    .replace("/", "");

  async function del() {
    try {
      const res = await fetch(
        `http://localhost:8080/delete?path=${path + "/" + stripped}`,
      );

      if (!res.ok) {
        trigger("Error", "error");
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["directory", path],
      });

      trigger("Success", "info");
    } catch (err) {
      trigger(JSON.stringify(err), "error");
    }
  }
  return (
    <div
      className="group relative flex max-h-[120px] min-h-[120px] max-w-[120px] min-w-[120px] cursor-pointer flex-col"
      onDoubleClick={() => props.onClick(stripped)}
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-between rounded-3xl bg-slate-700 py-6 text-center">
          <p className="underline" onClick={() => props.onClick(stripped)}>
            Open
          </p>
          <p className="text-rose-500" onClick={() => del()}>
            Delete
          </p>
        </div>
      )}
      <div className="flex flex-col space-y-2 p-2 px-3">
        <FaFolderOpen className="mx-auto text-4xl group-hover:text-slate-400" />
        <p className="line-clamp-4 text-center text-sm break-all group-hover:text-slate-400">
          {stripped}
        </p>
      </div>
    </div>
  );
}

export default FolderCard;
