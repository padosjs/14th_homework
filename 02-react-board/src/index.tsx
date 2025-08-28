import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router';
import BoardsNew from './\broutes/boards/new/BoardsNew';
import BoardsDetail from './\broutes/boards/new/BoardsDetail';

const PageList = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/boardsnew", element: <BoardsNew/>},
  { path: "/boardsdetail", element: <BoardsDetail/>},
])

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(<RouterProvider router={PageList} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
