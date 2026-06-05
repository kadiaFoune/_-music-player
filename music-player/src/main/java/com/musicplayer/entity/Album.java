package com.musicplayer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String image;

    // Plusieurs albums → 1 artiste
    @ManyToOne
    @JoinColumn(name = "artiste_id")
    private Artiste artiste;

    // 1 album → plusieurs chansons
    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Chanson> chansons;
}