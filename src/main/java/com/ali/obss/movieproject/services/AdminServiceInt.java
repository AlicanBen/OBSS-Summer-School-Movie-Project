package com.ali.obss.movieproject.services;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.User;

import java.util.List;

public interface AdminServiceInt {
    boolean addMovie(Movie movie);

    boolean deleteMovie(int id);

    boolean updateMovie(Movie movie);

    List<Movie> searchMovies(String movie);

    List<Movie> directorsMovie(String directorMovie);


    boolean addUsers(User user);

    boolean deleteUsers(int id);

    boolean updateUsers(User user);

    List<User> searchUsers(String username);


    boolean addDirectors(Director director);

    boolean deleteDirectors(int  id);

    boolean updateDirectors(Director director);

    List<Director> searchDirectors(String director);


}
