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
          className=" flex flex-1 items-center justify-center rounded bg-slate-300 p-2 font-bold text-gray-800 hover:bg-slate-400"
          onClick={() => handleClick("Backspace")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H7.07L2.4 12l4.66-7H22zm-11.59-2L14 13.41L17.59 17L19 15.59L15.41 12L19 8.41L17.59 7L14 10.59L10.41 7L9 8.41L12.59 12L9 15.59z"
            />
          </svg>
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
          className="flex flex-[2_1_0%]  items-center justify-center rounded bg-slate-300 p-2 font-bold text-gray-800  hover:bg-slate-400"
          onClick={() => handleClick("Enter")}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
