import { FaFile } from "react-icons/fa";
import usePath from "../hooks/usePath";
import useAlertStore from "../hooks/useAlert";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  name: string;
  currentPath: string;
};

function FileCard(props: Props) {
  const { path } = usePath();
  const { trigger } = useAlertStore();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const stripped = props.name
    .replace(props.currentPath, "")
    .replace("/", "")
    .replace("/", "");

  async function pull() {
    try {
      const res = await fetch(
        `http://localhost:8080/pull?path=${path + "/" + stripped}`,
      );

      if (!res.ok) {
        trigger("Error", "error");
        return;
      }
      const data = await res.json();
      const link = data.link;
      if (!link) {
        trigger("Download link missing", "error");
        return;
      }

      const a = document.createElement("a");
      a.href = link;
      a.download = stripped;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      trigger("Download started", "info");
    } catch (err) {
      trigger(JSON.stringify(err), "error");
    }
  }

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
      onDoubleClick={() => pull()}
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-between rounded-3xl bg-slate-700 py-6 text-center">
          <p className="underline" onClick={() => pull()}>
            Download
          </p>
          <p className="text-rose-500" onClick={() => del()}>
            Delete
          </p>
        </div>
      )}
      <div className="flex flex-col space-y-2 px-3 py-2">
        <FaFile className="mx-auto text-4xl group-hover:text-slate-400" />
        <p className="line-clamp-4 text-center text-sm break-all group-hover:text-slate-400">
          {stripped}
        </p>
      </div>
    </div>
  );
}

export default FileCard;
