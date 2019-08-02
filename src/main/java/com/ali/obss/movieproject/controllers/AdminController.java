package com.ali.obss.movieproject.controllers;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.User;
import com.ali.obss.movieproject.services.serviceClasses.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@CrossOrigin
@RequestMapping(value = "/admins")
public class AdminController {
    @Autowired
    AdminService service;

    @GetMapping(path = "/users/search")
    public List<User> searchUser(@RequestParam(required = false) String username) {
        if (username == null) {
            return service.getUsers();
        } else {
            return service.searchUsers(username);
        }
    }

    @GetMapping("/movies/search")
    public List<Movie> searchMovie(@RequestParam(required = false) String movie) {
        if (movie == null) {
            return service.getMovies();
        } else {
            return service.searchMovies(movie);
        }
    }

    @GetMapping("/directors/search")
    public List<Director> searchDirector(@RequestParam(required = false) String directors) {
        if (directors == null) {
            return service.getDirectors(directors);
        } else {
            return service.searchDirectors(directors);
        }
    }

    // ADD METHODS
    @PostMapping("/users/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (service.addUsers(user)) {
            return new ResponseEntity<>("this user succesfully created", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this user already created", HttpStatus.FOUND);
        }
    }

    @PostMapping(value = "/movies/add", headers = "Content-Type=application/json")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        //   movie.setDirector(director);
        if (service.addMovie(movie)) {
            return new ResponseEntity<>("this movie succesfully added", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this movies already added", HttpStatus.FOUND);
        }
    }

    @PostMapping(value = "/directors/add", headers = "Content-Type=application/json")
    public ResponseEntity<?> addDirector(@RequestBody Director director) {
        if (service.addDirectors(director)) {
            return new ResponseEntity<>("this director succesfully added", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this director already added", HttpStatus.FOUND);
        }
    }

    // DELETE METHODS
    @DeleteMapping("/users/delete")
    public ResponseEntity<?> deleteUser(@RequestParam int id) {

        if (service.deleteUsers(id)) {
            return new ResponseEntity<>("this user succesfully deleted", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this user already deleted", HttpStatus.FOUND);
        }
    }

    @DeleteMapping("/movies/delete")
    public ResponseEntity<?> deleteMovie(@RequestParam int id) {
        if (service.deleteMovie(id)) {
            return new ResponseEntity<>("this movie succesfully deleted", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this movies already deleted", HttpStatus.FOUND);
        }
    }

    @DeleteMapping("/directors/delete")
    public ResponseEntity<?> deleteDirector(@RequestParam int id) {
        if (service.deleteDirectors(id)) {
            return new ResponseEntity<>("this director succesfully deleted", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this director already deleted", HttpStatus.FOUND);
        }
    }

    // UPDATE METHODS
    @PutMapping("/users/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        if (service.updateUsers(user)) {
            return new ResponseEntity<>("this user succesfully updated", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this user already updated", HttpStatus.FOUND);
        }
    }

    @PutMapping("/movies/update")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie) {
        if (service.updateMovie(movie)) {
            return new ResponseEntity<>("this movie succesfully updated", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this movies already updated", HttpStatus.FOUND);
        }
    }

    @PutMapping("/directors/update")
    public ResponseEntity<?> updateDirector(@RequestBody Director director) {
        if (service.updateDirectors(director)) {
            return new ResponseEntity<>("this director succesfully updated", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("this director already updated", HttpStatus.FOUND);
        }
    }

    @GetMapping("/{directors}")
    public List<Movie> moviesOfDirector(@PathVariable String directors) {
        if (service.directorsMovie(directors) == null) {
            return null;
        } else {
            return service.directorsMovie(directors);
        }
    }

}


