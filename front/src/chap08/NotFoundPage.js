import { useParams } from 'react-router-dom';

export default function NotFoundPage() {
  const { '*': paths } = useParams();
  return <p>指定されたパス「{paths}」は存在しません。</p>;
}