import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { DetailPage } from '../pages/DetailPage';
import { BookmarksPage } from '../pages/BookmarksPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sky', element: <DetailPage view="sky" /> },
      { path: 'weather', element: <DetailPage view="weather" /> },
      { path: 'history', element: <DetailPage view="history" /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
    ],
  },
]);
