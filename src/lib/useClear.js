/**
 * @desc Values of stateful strings are set to empty.
 * @param  {...import("react").Dispatch<React.SetStateAction<string>>} args
 */
export function useClear() {
  return function () {
    arguments.map(setString => setString(""));
  };
}
