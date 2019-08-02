package com.ali.obss.movieproject.entities;

import javax.persistence.*;

@Entity(name = "watchlists")
public class Lists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;


    @OneToOne
    private User user;

    @OneToOne
    private Movie movie;

   @Column(nullable = false)
    private String type;

    public Lists() {
    }

    public Lists(User user, Movie movie, String type) {
        this.user = user;
        this.movie = movie;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
