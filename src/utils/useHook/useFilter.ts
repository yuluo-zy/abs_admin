import { useEffect, useState } from 'react';


export default function useFilter(initialState?) {
  const [oldState, setOldState] = useState(initialState);

  const [newState, setNewState] = useState(oldState);

  useEffect(() => {
    setNewState(oldState);
  }, [oldState]);

  const reduction = () => {
    setNewState(oldState);
  };
  return [newState, setNewState, oldState, setOldState, reduction];
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
