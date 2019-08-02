package com.ali.obss.movieproject.controllers;

import com.ali.obss.movieproject.entities.Lists;
import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.services.serviceClasses.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ROLE_USER')")
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService service;

    // Listing Moviees
    @GetMapping("/movieList")
    public List<Movie> getMovieList() {
        return service.listMovies();
    }


    // Search Movie
    @GetMapping("/searchMovie/{movie}")
    public List<Movie> searchMovie(@PathVariable String movie) {
        return service.searchMovieByName(movie);
    }


    // Add movies to Watched/favorite list
    @PostMapping("/movieList/addList")
    public ResponseEntity<?> addList(@RequestBody Lists lists) {

        if (service.addMovieToLists(lists)) {
            return new ResponseEntity<>("this movie succesfully added", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this movies already added", HttpStatus.FOUND);
        }
    }


}
