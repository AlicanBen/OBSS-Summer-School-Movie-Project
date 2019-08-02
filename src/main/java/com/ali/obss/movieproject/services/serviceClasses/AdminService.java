package com.ali.obss.movieproject.services.serviceClasses;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.User;
import com.ali.obss.movieproject.repository.DirectorRepository;
import com.ali.obss.movieproject.repository.MovieRepository;
import com.ali.obss.movieproject.repository.UserRepository;
import com.ali.obss.movieproject.services.AdminServiceInt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AdminService implements AdminServiceInt {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    DirectorRepository directorRepository;

    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public boolean addMovie(Movie movie) {
        if (movieRepository.existsByName(movie.getName())) {
            return false;
        } else {
            movieRepository.save(movie);
            return true;
        }
    }

    @Override
    public boolean deleteMovie(int id) {
        if (!movieRepository.existsById(id)) {
            return false;
        } else {
            movieRepository.delete(movieRepository.findById(id));
            return true;
        }

    }

    @Override
    public boolean updateMovie(Movie movie) {
        if (!movieRepository.existsById(movie.getId())) {
            return false;
        } else {
            Movie movie1 = movieRepository.findById(movie.getId());
            Director director = movie.getDirector();
            movie1.setName(movie.getName());
            movie1.setDirector(director);
            movie1.setDuration(movie.getDuration());
            movie1.setGenre(movie.getGenre());
            movie1.setImdbRating(movie.getImdbRating());
            movie1.setReleaseDate(movie.getReleaseDate());
            movieRepository.save(movie1);
            return true;
        }
    }

    @Override
    public List<Movie> searchMovies(String movie) {
        List<Movie> movies = movieRepository.findAllByName(movie);
        return movies;
    }

    @Override
    public List<Movie> directorsMovie(String directorMovie) {
        List<Director> director = directorRepository.findAllByName(directorMovie);
        List<Movie> movies = new ArrayList<Movie>();
        for (Director director1 : director) {
            movies.addAll(movieRepository.findAllByDirector(director1));
        }
        return movies;
    }

    @Override
    public boolean addUsers(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return false;
        } else {
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public boolean deleteUsers(int id) {

        if (!userRepository.existsById(id)) {
            return false;
        } else {
          userRepository.delete(userRepository.findById(id));
            return true;
        }
    }

    @Override
    public boolean updateUsers(User user) {
        if (!userRepository.existsById(user.getId())) {
            return false;
        } else {
            User tmpUser = userRepository.findById(user.getId());
            tmpUser.setIsAdmin(user.getIsAdmin());
            tmpUser.setIsDisabled(user.getIsDisabled());
            tmpUser.setEmail(user.getEmail());
            tmpUser.setFirstName(user.getFirstName());
            tmpUser.setLastName(user.getLastName());
            tmpUser.setPassword(user.getUsername());
            tmpUser.setUsername(user.getUsername());
            userRepository.save(tmpUser);
            return true;
        }
    }

    @Override
    public List<User> searchUsers(String username) {
        List<User> users = userRepository.findAllByUsername(username);
        return users;
    }

    @Override
    public boolean addDirectors(Director director) {
        if (directorRepository.existsByName(director.getName())) {
            return false;
        } else {
            directorRepository.save(director);
            return true;
        }
    }

    @Override
    public boolean deleteDirectors(int id) {

        if (!directorRepository.existsById(id)) {
            return false;
        } else {
            directorRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public boolean updateDirectors(Director director) {

        if (!directorRepository.existsById(director.getId())) {
            return false;
        } else {
            Director director1 = directorRepository.findById(director.getId());
            if (director.getName() != null && director.getSurName() != null) {
                director1.setName(director.getName());
                director1.setSurName(director.getSurName());
                director1.setBirthPlace(director.getBirthPlace());
                director1.setBirthDate(director.getBirthDate());
                directorRepository.save(director1);
                return true;
            } else {
                return false;
            }

        }
    }

    @Override
    public List<Director> searchDirectors(String director) {
        return (List<Director>) directorRepository.findAllByName(director);
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public List<Director> getDirectors(String directors) {
        return (List<Director>) directorRepository.findAll();
    }
}
