import clsx from "clsx";

export default function Keyboard({
  charactersUsed,
}: {
  charactersUsed: Record<string, string>;
}) {
  const keys = {
    firstRow: ["q", "w", "e", "r", "t", "y", "u", "o", "p"],
    secondRow: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    thirdRow: ["z", "x", "c", "v", "b", "n", "m"],
  };

  const handleClick = (key: string) => {
    const event = new KeyboardEvent("keyup", { key: key });
    document.dispatchEvent(event);
  };

  return (
    <div className="sm: flex w-full flex-col gap-1">
      <div className="flex justify-stretch gap-1">
        {keys.firstRow.map((key, i) => {
          return (
            <button
              className={clsx(
                "flex-1 rounded  p-2 text-base font-bold",
                {
                  "!bg-green-600 !text-white hover:!bg-green-700":
                    charactersUsed[key] === "correct",
                  "!bg-yellow-600  !text-white hover:!bg-yellow-700":
                    charactersUsed[key] === "incorrect",
                  "!bg-gray-600 !text-white hover:!bg-gray-700":
                    charactersUsed[key] === "no-match",
                },
                "bg-slate-300  text-gray-800 hover:bg-slate-400",
              )}
              key={i}
              onClick={() => handleClick(key)}
            >
              {key.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className="flex justify-stretch gap-1">
        {keys.secondRow.map((key, i) => {
          return (
            <button
              className={clsx(
                "flex-1 rounded  p-2 text-base font-bold",
                {
                  "!bg-green-600 !text-white hover:!bg-green-700":
                    charactersUsed[key] === "correct",
                  "!bg-yellow-600  !text-white hover:!bg-yellow-700":
                    charactersUsed[key] === "incorrect",
                  "!bg-gray-600 !text-white hover:!bg-gray-700":
                    charactersUsed[key] === "no-match",
                },
                "bg-slate-300  text-gray-800 hover:bg-slate-400",
              )}
              key={i}
              onClick={() => handleClick(key)}
            >
              {key.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className="flex  justify-stretch gap-1">
        <button
          className="flex-[4_1_0%] rounded bg-slate-300 p-2 font-bold text-gray-800 hover:bg-slate-400"
          onClick={() => handleClick("Backspace")}
        >
          Backspace
        </button>
        {keys.thirdRow.map((key, i) => {
          return (
            <button
              className={clsx(
                "flex-1 rounded  p-2 text-base font-bold",
                {
                  "!bg-green-600 !text-white hover:!bg-green-700":
                    charactersUsed[key] === "correct",
                  "!bg-yellow-600  !text-white hover:!bg-yellow-700":
                    charactersUsed[key] === "incorrect",
                  "!bg-gray-600 !text-white hover:!bg-gray-700":
                    charactersUsed[key] === "no-match",
                },
                "bg-slate-300  text-gray-800 hover:bg-slate-400",
              )}
              key={i}
              onClick={() => handleClick(key)}
            >
              {key.toUpperCase()}
            </button>
          );
        })}
        <button
          className="flex-[4_1_0%] rounded bg-slate-300 p-2 font-bold text-gray-800  hover:bg-slate-400"
          onClick={() => handleClick("Enter")}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
