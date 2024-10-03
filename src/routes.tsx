import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoutes from "./components/PrivateRoutes";
import RouterLayout from "./components/layouts/RouterLayout";
import ArticlesPage from "./pages/ArticlesPage";
import PublishersPage from "./pages/PublishersPage";
import PlatformsPage from "./pages/PlatformsPage";
import GenresPage from "./pages/GenresPage";
import UsersPage from "./pages/UsersPage";
import GamesPage from "./pages/GamesPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterLayout>
        <DefaultLayout />
      </RouterLayout>
    ),
    errorElement: (
      <RouterLayout>
        <ErrorPage />
      </RouterLayout>
    ),
    children: [
      {
        index: true,
        element: (
          <RouterLayout>
            <HomePage />
          </RouterLayout>
        ),
      },
      {
        path: "login",
        element: (
          <RouterLayout>
            <LoginPage />
          </RouterLayout>
        ),
      },
      {
        path: "users",
        element: (
          <RouterLayout>
            <UsersPage />
          </RouterLayout>
        ),
      }, {
        path: "games",
        element: (
          <RouterLayout>
            <GamesPage />
          </RouterLayout>
        ),
      }, {
        path: "articles",
        element: (
          <RouterLayout>
            <ArticlesPage />
          </RouterLayout>
        ),
      }, {
        path: "publishers",
        element: (
          <RouterLayout>
            <PublishersPage />
          </RouterLayout>
        ),
      }, {
        path: "platforms",
        element: (
          <RouterLayout>
            <PlatformsPage />
          </RouterLayout>
        ),
      }, {
        path: "genres",
        element: (
          <RouterLayout>
            <GenresPage />
          </RouterLayout>
        ),
      },

    ],
  },
  {
    element: (
      <RouterLayout>
        <PrivateRoutes />
      </RouterLayout>
    ),
    errorElement: (
      <RouterLayout>
        <ErrorPage />
      </RouterLayout>
    ),
    children: [
      {
        path: "profile",
        element: (
          <RouterLayout>
            <ProfilePage />
          </RouterLayout>
        ),
      },
    ],
  },
]);

export default router;
