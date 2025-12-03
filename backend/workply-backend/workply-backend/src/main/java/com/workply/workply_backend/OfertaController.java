package com.workply.workply_backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin("*")
public class OfertaController {

    private final OfertaRepository repo;

    public OfertaController(OfertaRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Oferta> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oferta> detalle(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
