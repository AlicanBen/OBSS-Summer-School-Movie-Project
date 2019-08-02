package com.ali.obss.movieproject.services.serviceClasses;

import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.Lists;
import com.ali.obss.movieproject.repository.MovieRepository;
import com.ali.obss.movieproject.repository.UserRepository;
import com.ali.obss.movieproject.repository.ListsRepository;
import com.ali.obss.movieproject.services.UserServiceInt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService implements UserServiceInt {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ListsRepository listsRepository;
    @Autowired
    MovieRepository movieRepository;

    @Override
    public List<Movie> listMovies() {
        return movieRepository.findAll();
    }

    @Override
    public boolean addMovieToLists(Lists lists) {
        if (listsRepository.existsById(lists.getId())) {
            return false;
        } else {
            listsRepository.save(lists);
            return true;
        }

    }

    @Override
    public List<Movie> searchMovieByName(String movieName) {
        return movieRepository.findAllByName(movieName);
    }
}
