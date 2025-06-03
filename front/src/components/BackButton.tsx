import { IoIosArrowBack } from "react-icons/io";
import usePath from "../hooks/usePath";

function BackButton() {
  const { back } = usePath();
  return <IoIosArrowBack onClick={() => back()} className="text-3xl cursor-pointer">back</IoIosArrowBack>;
}

export default BackButton;
