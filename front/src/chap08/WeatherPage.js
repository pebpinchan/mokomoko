import { useLoaderData } from 'react-router-dom';

export default function WeatherPage() {
  const data =  useLoaderData();
  return (
    <figure>
      <img src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
      <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}