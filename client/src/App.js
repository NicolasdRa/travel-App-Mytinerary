import React from "react";
import { Provider } from "react-redux";

import { store } from "./Components/Redux/store";
import { AppRouter } from "./routers/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
