package com.ali.obss.movieproject.repository;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DirectorRepository extends CrudRepository<Director,Long> {
    boolean existsByName(String name);
    List<Director> findAllByName(String name);

    Director findById(int id);
    boolean existsById(int id);
    void deleteById(int id);
}
