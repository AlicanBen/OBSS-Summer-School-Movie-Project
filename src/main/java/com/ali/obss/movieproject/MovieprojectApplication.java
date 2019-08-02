package com.ali.obss.movieproject;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.Movie;
import com.ali.obss.movieproject.entities.User;
import com.ali.obss.movieproject.repository.DirectorRepository;
import com.ali.obss.movieproject.repository.MovieRepository;
import com.ali.obss.movieproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieprojectApplication implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    DirectorRepository directorRepository;

    public static void main(String[] args) {
        SpringApplication.run(MovieprojectApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {

        userRepository.save(new User("ali", "ali", "ali", "ali", "ali", "false", "user"));
        userRepository.save(new User("admin", "admin", "admin", "admin", "admin", "false", "admin"));
        Director director = new Director("asd", "dsa", "1970-08-09", "erzincan");
        directorRepository.save(director);
        movieRepository.save(new Movie("Muslum", director, "2018-08-03", 8.9, "120 min", "biyografi"));
    }
}
