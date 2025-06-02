import { useState } from "react";
import usePath from "../hooks/usePath";

function Uploader() {
  const { path } = usePath();

  const [file, setFile] = useState<Blob | null>(null);

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
  return (
    <form onSubmit={handleSubmit} className="p-4 border-2">
      <input type="file" onChange={handleFileChange} />
      <button type="submit">submit</button>
    </form>
  );
}

export default Uploader;
