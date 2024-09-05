package com.example.integracao.controller;
import org.springframework.http.ResponseEntity;
import com.example.integracao.model.Usuario;
import com.example.integracao.repository.UsuarioRepository;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class AuthController {
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario>  login(@RequestBody Usuario usuario) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario u : usuarios) {
            if (u.getEmail().equals(usuario.getEmail()) && u.getPassword().equals(usuario.getPassword())) {
                return ResponseEntity.ok(u);
            }
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("error", "Usuário ou senha incorretos");
        return new ResponseEntity<>(null, headers, HttpStatus.UNAUTHORIZED);
    }

}
