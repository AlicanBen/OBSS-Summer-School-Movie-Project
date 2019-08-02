package com.ali.obss.movieproject.controllers;

import com.ali.obss.movieproject.entities.User;
import com.ali.obss.movieproject.security.model.*;
import com.ali.obss.movieproject.repository.UserRepository;
import com.ali.obss.movieproject.security.util.JwtTokenUtil;
import com.ali.obss.movieproject.services.serviceClasses.AuthorizationService;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class JwtAuthenticationController {

//    @Autowired
//    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private AuthorizationService userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        User user=userRepository.findByUsername(authenticationRequest.getUsername());
        String autpass=authenticationRequest.getPassword();
        if (authenticationRequest != null&&user.getPassword().equals(autpass)){
            UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String token1 = jwtTokenUtil.generateToken(userDetails);
            System.out.println(token1);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization","Bearer "+token1);
           String  isAdmin= user.getIsAdmin();
            String s="{\n" +
                    "\t\"message\":\"you are logined\",\n" +
                    "\t\"token\":\""+token1+"\",\n" +
                    "\t\"isAdmin\":\""+isAdmin+"\"\n" +
                    "}";
            return new ResponseEntity<>(s ,headers, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("cant login", HttpStatus.BAD_REQUEST);
        }



    }
/*
    private void authenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        try {
            authenticationManager.authenticate(token);
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }*/
}