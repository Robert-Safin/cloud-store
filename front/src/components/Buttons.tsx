import BackButton from "./BackButton";
import Crumbs from "./Crumbs";
import MakeFolderButton from "./MakeFolderButton";
import Uploader from "./Uploader";

function Buttons() {
  return (
    <div className="flex flex-col bg-slate-700 p-2 space-y-4">
      <div className="flex items-center space-x-8">
        <BackButton />
        <Crumbs />
      </div>
      <div className="flex items-center space-x-8 justify-between">
        <Uploader/>
        <MakeFolderButton />
      </div>
    </div>
  );
}

export default Buttons;
