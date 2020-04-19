import { useState } from 'react'

export default function useName (initialState) {
  const [name, setName] = useState(initialState);

  return [name, (name) => {
    name = name.toLowerCase();
    return setName(name.charAt(0).toUpperCase() + name.slice(1));
  }]
}
