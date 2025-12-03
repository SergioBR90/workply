package com.workply.workply_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidaturas")
@CrossOrigin(origins = "*")
public class CandidaturaController {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    // Obtener todas las candidaturas
    @GetMapping
    public List<Candidatura> listar() {
        return candidaturaRepository.findAll();
    }

    // Registrar candidatura
    @PostMapping
    public Candidatura crear(@RequestBody Candidatura nueva) {
        return candidaturaRepository.save(nueva);
    }
}
