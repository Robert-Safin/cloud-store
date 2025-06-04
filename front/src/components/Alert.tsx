import useAlert from "../hooks/useAlert";

function Alert() {
  const { alert } = useAlert();

  if (alert === undefined) {
    return;
  }

  return (
    <>
      {alert.show && (
        <div
          className={`absolute right-8 bottom-8 rounded-4xl border-2 p-4 ${alert.type === "error" ? "border-red-400 text-red-400" : ""} `}
        >
          <p>{alert.msg}</p>
        </div>
      )}
    </>
  );
}

export default Alert;
