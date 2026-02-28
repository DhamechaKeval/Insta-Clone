import { router } from "./App.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { RouterProvider } from "react-router";
import { PostContextProvider } from "./features/Post/post.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
