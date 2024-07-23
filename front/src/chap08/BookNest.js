import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import books from '../chap07/books';

export function BookListPage() {
  return (
    <>
    {books.map(b => (
      <React.Fragment key={b.isbn}>
        ［<NavLink to={`/books/${b.isbn}`}>
          {b.title}</NavLink>］｜
      </React.Fragment>
    ))}
    <Outlet />
    </>
  );
}

export function BookDetailsPage() {
  const { isbn='978-4-8156-0182-9' } = useParams();
  const book = books.find(b => isbn === b.isbn);

  return (
    <ul>
      <li>ISBNコード：{book.isbn}</li>
      <li>書名：{book.title}</li>
      <li>価格：{book.price}</li>
      <li>概要：{book.summary}</li>
    </ul>
  );
}