import { useEffect, useState } from 'react';


export default function useFilter(initialState?) {
  const [oldState, setOldState] = useState(initialState);

  const [state, setState] = useState(oldState);

  useEffect(() => {
    setState(oldState);
  }, [oldState]);

  // const dispatch = (setStateAction: any, keyList: any) => {
  //   setState(setStateAction(oldState, setState, keyList));
  // };

  const reduction = () => {
    setState(oldState);
  };
  return [state, setState, oldState, setOldState, reduction];
}

export function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  if (array && array.length > 0)
    return array.filter((item) => {
      return filterKeys.every(key => {
        if (typeof (item[key]) == 'string') {
          return filters[key] === item[key];
        }
        return filters[key] === item[key].toString();
      });
    });
}
