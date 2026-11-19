import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { BriefingPage } from '../pages/BriefingPage';
import { BookmarksPage } from '../pages/BookmarksPage';

/**
 * App routes. `AppLayout` is the shell; children render into its <Outlet/>.
 * Date deep-linking (e.g. /date/:date) will be added in the feature phase.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <BriefingPage /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
    ],
  },
]);
