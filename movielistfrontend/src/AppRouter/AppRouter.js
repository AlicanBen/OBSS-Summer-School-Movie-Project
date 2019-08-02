import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import AdminPage from "../pages/admins/AdminPage";
import DirectorListPage from "../pages/admins/Lists/DirectorListPage";
import UserListPage from "../pages/admins/Lists/UserListPage";
import AdminMovieListPage from "../pages/admins/Lists/AdminMovieListPage";
import UserPage from "../pages/UserPage";
import UserMovieListPage from "../pages/UserMovieListPage";
import DirectorMoviesPage from "../pages/admins/Lists/DirectorMoviesPage";
import AddUser from "../pages/admins/adds/AddUser";
import AddMovie from "../pages/admins/adds/AddMovie";
import AddDirector from "../pages/admins/adds/AddDirector";

import UpdateUser from "../pages/admins/updates/UpdateUser";
import UpdateMovie from "../pages/admins/updates/UpdateMovie";
import UpdateDirector from "../pages/admins/updates/UpdateDirector";

const AppRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={Login} method="post" />
    {/*  ADMIN PAGES*/}
    <Route exact path="/admins" component={AdminPage} />
    {/* ADDS */}
    <Route exact path="/admins/users/add" component={AddUser} />
    <Route exact path="/admin/movies/add" component={AddMovie} />
    <Route exact path="/admins/directors/add" component={AddDirector} />
    {/* UPDATES */}
    <Route exact path="/admins/users/update" component={UpdateUser} />
    <Route exact path="/admins/movies/update/" component={UpdateMovie} />
    <Route exact path="/admins/directors/update/" component={UpdateDirector} />
    {/* LİSTS */}
    <Route exact path="/admins/directors" component={DirectorListPage} />
    <Route exact path="/admins/movies" component={AdminMovieListPage} />
    <Route exact path="/admins/users" component={UserListPage} />
    <Route
      exact
      path="/admins/directors-movies"
      component={DirectorMoviesPage}
    />
    {/*  USER PAGES*/}
    <Route exact path="/users" component={UserPage} />{" "}
    <Route exact path="/users/movieList" component={UserMovieListPage} />
  </BrowserRouter>
);
export default AppRouter;
