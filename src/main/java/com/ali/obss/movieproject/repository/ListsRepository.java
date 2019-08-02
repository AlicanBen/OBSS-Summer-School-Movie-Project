package com.ali.obss.movieproject.repository;

import com.ali.obss.movieproject.entities.Lists;
import org.springframework.data.repository.CrudRepository;

public interface ListsRepository extends CrudRepository<Lists,Long> {

    Lists findById(int id);
    boolean existsById(int id);
}
