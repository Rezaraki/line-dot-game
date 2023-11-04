import { useState } from 'react';

function useRerender() {
  const [state, setState] = useState(false);

  const rerender = () => setState((pre) => !pre);
  return rerender;
}
export default useRerender;
