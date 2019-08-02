package com.ali.obss.movieproject.services;

import com.ali.obss.movieproject.entities.User;

public interface AuthorizationServiceInt {
    User getUser(String username);
}
