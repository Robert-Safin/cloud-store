import usePath from "../hooks/usePath";
import { IoIosArrowBack } from "react-icons/io";

function Crumbs() {
  const { path } = usePath();
  return (
    <div className="flex space-x-1 items-center">
      {path.split("/").map((s)=>(
        <div className="flex items-center space-x-1" key={s}>
          <p className="text-sm">{s}</p>
          <IoIosArrowBack className="rotate-180"/>
        </div>
      ))}

    </div>
  )
}

export default Crumbs
