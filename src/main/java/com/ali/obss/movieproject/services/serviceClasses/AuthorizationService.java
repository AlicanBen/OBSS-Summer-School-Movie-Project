package com.ali.obss.movieproject.services.serviceClasses;

import com.ali.obss.movieproject.entities.User;
import com.ali.obss.movieproject.repository.UserRepository;
import com.ali.obss.movieproject.services.AuthorizationServiceInt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.User.UserBuilder;

@Component
public class AuthorizationService implements AuthorizationServiceInt {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }


    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        UserBuilder builder = null;
        if (user != null) {

            builder = org.springframework.security.core.userdetails.User.withUsername(username);
            builder.password(user.getPassword());
            String ROLE =  "admin".equals(user.getIsAdmin()) ? "ROLE_ADMIN" : "ROLE_USER";
            builder.authorities(ROLE);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
        return builder.build();
    }
}
