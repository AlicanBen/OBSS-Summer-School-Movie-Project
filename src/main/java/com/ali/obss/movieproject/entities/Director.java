package com.ali.obss.movieproject.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "directors")
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;
    @Column
    private String name;
    @Column
    private String surName;
    @Column
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private String birthDate;
    @Column
    private String birthPlace;

    @OneToMany(mappedBy = "director", cascade = CascadeType.ALL,targetEntity = Movie.class)
    @JsonBackReference(value = "secondParent")
    private Set<Movie> movies ;

    public Director() {
    }

    public Director(String name, String surName, String birthDate, String birthPlace) {
        this.name = name;
        this.surName = surName;
        this.birthDate = birthDate;
        this.birthPlace = birthPlace;

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

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String  birthDate) {
        this.birthDate = birthDate;
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }


}
