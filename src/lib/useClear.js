/**
 * @desc Values of stateful strings are set to empty.
 * @param  {...import("react").Dispatch<React.SetStateAction<string>>} args
 */
export function useClear(...args) {
  return function () {
    args.map(setString => setString(""));
  };
}
