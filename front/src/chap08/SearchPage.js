import { useParams } from 'react-router-dom';

export default function SearchPage() {
  const { '*': keywords } = useParams();
  return <p>検索ワード「{keywords}」のページです。</p>;
}