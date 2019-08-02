package com.ali.obss.movieproject.repository;

import com.ali.obss.movieproject.entities.Director;
import com.ali.obss.movieproject.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User,Long> {

    boolean existsByUsername(String username);
    List<User> findAllByUsername(String username);
    User findByUsername(String userName);
    User findById(int id);
    User deleteById(int id);
    boolean existsById(int id);
}
