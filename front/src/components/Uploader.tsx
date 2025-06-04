import { useRef, useState } from "react";
import usePath from "../hooks/usePath";
import { useQueryClient } from "@tanstack/react-query";
import useAlert from "../hooks/useAlert"; // or useAlertStore if using Zustand
import { MdDriveFolderUpload } from "react-icons/md";

function Uploader() {
  const { path } = usePath();
  const queryClient = useQueryClient();
  const { trigger } = useAlert();

  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      trigger("Please select a file", "error");
      return;
    }

    if (file.name.includes("/")) {
      trigger("filename can not have any '/'", "error");
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

      if (!res.ok) {
        throw new Error("server could not upload");
      }

      await queryClient.invalidateQueries({
        queryKey: ["directory", path],
      });

      trigger("Upload successful", "info");
      setFile(null);
    } catch (err) {
      trigger(JSON.stringify(err), "error");
    }
  };

  return (
    <div className="w-full md:w-auto">
      <h4 className="mb-1">Upload file</h4>
      <form
        onSubmit={handleSubmit}
        className="flex h-[50px] items-center space-x-4 rounded-md border-1 p-2"
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleClick}
          className="rounded-sm bg-slate-400 px-2 py-1 text-slate-900"
        >
          Select File
        </button>
        <p className="truncate text-slate-400">
          {file ? file.name : "No file selected"}
        </p>
        <button type="submit" className="">
          <MdDriveFolderUpload className="cursor-pointer text-3xl" />
        </button>
      </form>
    </div>
  );
}

export default Uploader;
