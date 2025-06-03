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
          className={`absolute bottom-8 right-8 p-4
            rounded-4xl
          border-2
          ${alert.type === "error" ? "border-red-400 text-red-400" : ""}
        `}
        >
          <p>{alert.msg}</p>
        </div>
      )}
    </>
  );
}

export default Alert;
