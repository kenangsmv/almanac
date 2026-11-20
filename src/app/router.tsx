import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { DetailPage } from '../pages/DetailPage';
import { BookmarksPage } from '../pages/BookmarksPage';

/**
 * App routes. `AppLayout` is the shell; children render into its <Outlet/>.
 * The selected date rides along in the `?date=` query across all routes.
 */
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
