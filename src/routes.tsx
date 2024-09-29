import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoutes from "./components/PrivateRoutes";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import RouterLayout from "./components/layouts/RouterLayout";

// const routeBuilder = (routes: any[]) => {
//   console.log('ry', typeof Object.values(routes),  Object.values(routes))
//   return Object.values(routes)?.map((route: any) => ({
//     ...route,
//     element: <RouterLayout>{route.element}</RouterLayout>,
//     children: route?.children?.length
//       ? () => routeBuilder(route.children)
//       : undefined,
//   }));
// };

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
        path: "games/:slug",
        element: (
          <RouterLayout>
            <GameDetailPage />
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
        path: "articles",
        element: (
          <RouterLayout>
            <ArticlesPage />
          </RouterLayout>
        ),
      },
      {
        path: "articles/:id",
        element: (
          <RouterLayout>
            <ArticleDetailPage />
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
