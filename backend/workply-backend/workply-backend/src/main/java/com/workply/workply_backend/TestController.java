package com.workply.workply_backend;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    private final JdbcTemplate jdbcTemplate;

    public TestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET /api/test -> lista todo lo que hay en submissions
    @GetMapping
    public List<Map<String, Object>> list() {
        return jdbcTemplate.queryForList(
                "SELECT * FROM public.submissions ORDER BY id DESC"
        );
    }

    // POST /api/test -> inserta un registro en submissions
    @PostMapping
    public ResponseEntity<String> save(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");

        jdbcTemplate.update(
                "INSERT INTO public.submissions (name, email) VALUES (?, ?)",
                name, email
        );

        return ResponseEntity.ok("Guardado correctamente en BD");
    }
}
