import { useRouteError } from 'react-router-dom';

export default function InvalidParamsPage() {
  const error = useRouteError();
  return (
    <p style={{ color: 'Red' }}>{error.message}</p>
  );
}