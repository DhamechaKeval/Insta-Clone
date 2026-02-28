import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/Post/pages/Feed";
import Addpost from "./features/Post/pages/Addpost";
import Profile from "./features/user/pages/Profile";
import Followers from "./features/user/pages/Followers";
import Following from "./features/user/pages/Following";
import Request from "./features/user/pages/Request";

// const Approutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <main>
//               <h1>Welcom to the App</h1>
//             </main>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/add-post",
    element: <Addpost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/followers",
    element: <Followers />,
  },
  {
    path: "/profile/following",
    element: <Following />,
  },
  {
    path: "/profile/request",
    element: <Request />,
  },
]);
