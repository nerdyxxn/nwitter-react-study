import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route
              exact
              path="/profile"
              element={<Profile userObj={userObj} />}
            />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
