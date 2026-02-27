import React from "react";
import Approutes from "./App.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Approutes />
    </AuthProvider>
  );
};

export default App;
