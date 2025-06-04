import BackButton from "./BackButton";
import Crumbs from "./Crumbs";
import MakeFolderButton from "./MakeFolderButton";
import Uploader from "./Uploader";

function Buttons() {
  return (
    <div className="flex flex-col space-y-4 rounded-t-lg bg-slate-700 p-2">
      <div className="flex items-center space-x-8">
        <BackButton />
        <Crumbs />
      </div>
      <div className="flex flex-col justify-between space-x-8 md:flex-row md:items-center">
        <Uploader />
        <MakeFolderButton />
      </div>
    </div>
  );
}

export default Buttons;
