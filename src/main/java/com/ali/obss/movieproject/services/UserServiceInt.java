package com.ali.obss.movieproject.services;

import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.Lists;

import java.util.List;

public interface UserServiceInt {

    List<Movie> listMovies();

    boolean addMovieToLists(Lists lists);

    List<Movie> searchMovieByName(String movieName);
}
