package com.example.integracao.controller;
import com.example.integracao.model.Usuario;
import com.example.integracao.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
@CrossOrigin(origins = {"http://localhost:5173"}) // Endereço do front
@RestController

@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{cod}")
    public ResponseEntity<String> deletarUsuario(@PathVariable Long cod) {
        if (usuarioRepository.existsById(cod)) {
            usuarioRepository.deleteById(cod);
            return ResponseEntity.ok("Usuario deletado com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cod}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long cod, @RequestBody Usuario usuarioAtualizado) {
        if (usuarioRepository.existsById(cod)) {
            Usuario usuario = usuarioRepository.findById(cod).get();
            usuario.setName(usuarioAtualizado.getName());
            usuario.setPassword(usuarioAtualizado.getPassword());
            usuario.setEmail(usuarioAtualizado.getEmail());
            Usuario usuarioAtualizadoBD = usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuarioAtualizadoBD);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
