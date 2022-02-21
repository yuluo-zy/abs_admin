import { useEffect, useState } from 'react';


export default function useFilter(initialState?) {
  const [oldState, setOldState] = useState(initialState);

  const [state, setState] = useState(oldState);

  useEffect(() => {
    setState(oldState);
  }, [oldState]);

  const dispatch = (setStateAction: any, keyList: any) => {
    setState(setStateAction(oldState, setState, keyList));
  };

  const reduction = () => {
    setOldState(oldState);
  };
  return [state, dispatch, setOldState, reduction];
}

export function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    return filterKeys.every(key => {
      if (!filters[key].length) return true;
      return !!~filters[key].indexOf(item[key]);
    });
  });
}
