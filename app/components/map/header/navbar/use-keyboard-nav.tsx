import type { Key } from "react";
import { useState, useEffect } from "react";

export default function useKeyboardNav(
  initCursorVal = 0,
  cursorMin = 0,
  cursorMax = 0,
) {
  const useKeyPress = function (targetKey: Key) {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }: { key: string }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };

      const upHandler = ({ key }: { key: string }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  };

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const controlPress = useKeyPress("Control");
  const metaPress = useKeyPress("Meta");
  const [cursor, setCursor] = useState(initCursorVal);

  useEffect(() => {
    if (downPress && cursor < cursorMax - 1) {
      setCursor(cursor + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downPress, cursorMax]);
  useEffect(() => {
    if (upPress && cursor > 0) {
      setCursor(cursor - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upPress, cursorMin]);

  return {
    cursor,
    setCursor,
    enterPress,
    controlPress,
    metaPress,
  };
}
