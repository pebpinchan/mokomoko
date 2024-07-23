import { Form, useActionData } from 'react-router-dom';

export default function BookFormPage() {
  const errors = useActionData();

  return (
  <Form method="POST" noValidate>
    <ul>
    {errors?.map(msg => <li key={msg}>{msg}</li>)}
    </ul>
    <div>
      <label htmlFor="title">書名：</label><br/>
      <input id="title" name="title" type="text" size="20" />
    </div>
    <div>
      <label htmlFor="price">価格：</label><br/>
      <input id="price" name="price" type="number" />円
    </div>
    <div>
      <label htmlFor="published">刊行日：</label><br/>
      <input id="published" name="published" type="date" />
    </div>
    <div>
      <button type="submit">登録</button>
    </div>
  </Form>
  );
}