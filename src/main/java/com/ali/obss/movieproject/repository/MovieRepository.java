package com.ali.obss.movieproject.repository;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.Movie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovieRepository extends CrudRepository<Movie,Long> {
    boolean existsByName(String s);

    List<Movie> findAllByDirector(Director director);
    List<Movie> findAllByName(String name);
    List<Movie> findAll();
    Movie findById(int id);
    boolean existsById(int id);
}
