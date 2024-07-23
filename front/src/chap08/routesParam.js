import { Route, createBrowserRouter, createRoutesFromElements,
  json, redirect } from 'react-router-dom';
import RouterParam from './RouterParam';
import TopPage from './TopPage';
import WeatherPage from './WeatherPage';
import BookQueryPage from './BookQueryPage';
import BookStatePage from './BookStatePage';
import BookPage from './BookPage';
import InvalidParamsPage from './InvalidParamsPage';
import SearchPage from './SearchPage';
import NotFoundPage from './NotFoundPage';
import CommonErrorPage from './CommonErrorPage';
import BookFormPage from './BookFormPage';
import yup from '../chap04/yup.jp';
import { date, number, string } from 'yup';

const sleep = ms => new Promise(res => setTimeout(res, ms));

const fetchWeather = async ({ params }) => {
  // await sleep(2000);
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&lang=ja&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
  if (res.ok) { return res; }
  return json({
    "weather":[
      {"id":803,"main":"Unknown","description":"不明","icon":"50d"}
    ],
    "name":"不明"
  });

  // return new Response(
  //   JSON.stringify({
  //     "weather":[
  //       {"id":803,"main":"Unknown","description":"不明","icon":"50d"}
  //     ],
  //     "name":"不明"
  //   }),
  //   {
  //     status: 200,
  //     headers: {
  //       'Content-Type': 'application/json; UTF-8',
  //     },
  //   }
  // );

  // const data = {
  //   "weather":[
  //     {"id":803,"main":"Unknown","description":"不明","icon":"50d"}
  //   ],
  //   "name":"不明"
  // };

  // switch (res.status) {
  //   case 404:
  //     throw json({ message: 'city is invalid!!' }, { status: 404 });
  //   case 401:
  //     throw json({ message: 'api key is invalid!!' }, { status: 401 });
  //   default:
  //     throw json({ message: 'api server is in trouble...' }, { status: 501 });
  // }
};

const bookAction = async ({ request }) => {
  const form = await request.formData();
  const bookSchema = yup.object({
    title: string().label('書名').required().max(100),
    price: number().label('価格').integer().positive(),
    published: date().label('刊行日').required().max(new Date(2100, 0, 1))
  });
  let info;
  try {
    info = await bookSchema.validate({
      title: form.get('title'),
      price: form.get('price') || 0,
      published: new Date(form.get('published') || Date.now()),
    }, {
      abortEarly: false
    });
    console.log(info);
    return redirect('/');
  } catch (e) {
    return e.errors;
  }
};

const routesParam = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouterParam />}
      // errorElement={<CommonErrorPage />}
      // errorElement={<InvalidParamsPage />}
    >
      <Route path="/" element={<TopPage />} />
      <Route path="/books" lazy={async ()=> {
        const { BookListPage } = await import('./BookNest');
        return { Component: BookListPage };
      }}>
        <Route path=":isbn" lazy={async ()=> {
          const { BookDetailsPage } = await import('./BookNest');
          return { Component: BookDetailsPage };
        }} />
      </Route>
      <Route path="/book/form" element={<BookFormPage />}
        action={bookAction} />
      {/* <Route path="/book/:isbn" element={<BookPage />} /> */}
      <Route path="/book/:isbn?" element={<BookPage />}
        // errorElement={<InvalidParamsPage />}
      />
      <Route path="/bookQuery" element={<BookQueryPage />} />
      <Route path="/bookState" element={<BookStatePage />}/>
      <Route path="/search/*" element={<SearchPage />} />
      <Route path="/weather/:city" element={<WeatherPage />}
        loader={({ params }) =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&lang=ja&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
        }
        // loader={fetchWeather}
        />
      {/* <Route path="/weather/:city"
        lazy={() => import('./WeatherLazyPage')} /> */}
      <Route path="*" element={<NotFoundPage />} />
  </Route>
  )
);

export default routesParam;