package com.musicplayer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Artiste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String image;

    // 1 artiste → plusieurs albums
    @OneToMany(mappedBy = "artiste", cascade = CascadeType.ALL)
    private List<Album> albums;
}