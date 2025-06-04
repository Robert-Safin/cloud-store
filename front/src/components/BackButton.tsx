import { IoIosArrowBack } from "react-icons/io";
import usePath from "../hooks/usePath";

function BackButton() {
  const { back } = usePath();
  return (
    <IoIosArrowBack onClick={() => back()} className="cursor-pointer text-3xl">
      back
    </IoIosArrowBack>
  );
}

export default BackButton;
