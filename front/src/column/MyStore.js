import { useSyncExternalStore } from 'react';

export default function MyStore() {
  const data = useSyncExternalStore(
    callback => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => localStorage.getItem('MY_REACT')
  );
  return (
    <p>localStorage：{data}</p>
  );
}
