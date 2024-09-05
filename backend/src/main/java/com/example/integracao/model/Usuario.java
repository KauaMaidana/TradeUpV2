package com.example.integracao.model;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
public class Usuario{
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long cod;
 private String name;
 private String cpf;
 private int telefone;
 private String dataNasc;
 private String email;
 private String password;
}
