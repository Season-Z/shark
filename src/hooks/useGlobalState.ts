import { useCallback, useLayoutEffect, useState } from "react";

const globalStates: {
  [name: string]: {
    state: any;
    sets: ((v: any) => void)[];
  };
} = {};

export default <T>(name: string, initState?: T): [T, (state: T) => void] => {
  const [globalState, setGlobalState] = useState<T>(globalStates[name]?.state || initState);
  if (!globalStates[name]) {
    globalStates[name] = {
      state: globalState,
      sets: [],
    };
  }
  useLayoutEffect(() => {
    globalStates[name].sets.push(setGlobalState);
  }, [name]);
  return [
    globalState,
    useCallback(
      (state: T) => {
        globalStates[name].state = state;
        setGlobalState(state);
        globalStates[name].sets.forEach((fn) => fn(state));
      },
      [name]
    ),
  ];
};
