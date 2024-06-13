import ReactDOM from "react-dom";
import { useBallsStore } from "../store/balls";
import { useDebugStore } from "../store/debug";
import { useWallsStore } from "../store/walls";

const Debug = () => {
  const { debug, toggleDebug, showShadows, toggleShadows } = useDebugStore();
  const { addBall } = useBallsStore();
  const { addWall } = useWallsStore();
  return ReactDOM.createPortal(
    <aside className="fixed bottom-0 right-0 px-6 py-3 bg-[#ecfb5c]/60 flex flex-col gap-4 m-4 rounded-xl">
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={debug}
          onChange={toggleDebug}
          className="mr-2"
        />
        Debug
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={showShadows}
          onChange={toggleShadows}
          className="mr-2"
        />
        Shadows
      </label>
      <button
        onClick={() => {
          addBall();
        }}
        className="cursor-pointer px-2 py-1 rounded-md ml-2"
      >
        Add Ball
      </button>
      <button
        onClick={() => {
          addWall();
        }}
        className="cursor-pointer px-2 py-1 rounded-md ml-2"
      >
        Add Wall
      </button>
    </aside>,
    document.querySelector("#debug")!
  );
};

export default Debug;
