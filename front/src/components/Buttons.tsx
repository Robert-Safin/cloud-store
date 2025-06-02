import usePath from "../hooks/usePath"

function Buttons() {
    const {path,  back} = usePath()
  return (
    <div className="flex space-x-8">
      <button onClick={() => back()}>back</button>
      <button>add folder</button>
      <p>current path : {path}</p>
    </div>
  )

}

export default Buttons
