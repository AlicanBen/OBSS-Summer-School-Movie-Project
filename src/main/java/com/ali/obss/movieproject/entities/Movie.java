package com.ali.obss.movieproject.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column
    private String name;

    @ManyToOne(targetEntity = Director.class,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false,referencedColumnName ="id",name = "director")
    @JsonBackReference(value = "secondParent")
    private Director director;

    @Column
    private String releaseDate;
    @Column
    private double imdbRating;
    @Column
    private String duration;
    @Column
    private String genre;

    public Movie() {
    }

    public Movie( String name, Director director, String releaseDate, double imdbRating, String duration, String genre) {
        this.name = name;
        this.director = director;
        this.releaseDate = releaseDate;
        this.imdbRating = imdbRating;
        this.duration = duration;
        this.genre = genre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Director getDirector() {
        return director;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public double getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(double imdbRating) {
        this.imdbRating = imdbRating;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
