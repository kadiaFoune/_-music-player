package com.musicplayer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chanson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String fichierAudio;

    private Integer duree;

    // Plusieurs chansons → 1 album
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
}
