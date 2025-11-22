package com.stockmaster.controller;

import com.stockmaster.entity.User;
import com.stockmaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> {
                user.setPassword(null);
                user.setOtp(null);
                return ResponseEntity.ok(user);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @RequestBody User updateUser) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            user.setFullName(updateUser.getFullName());
            
            return ResponseEntity.ok(userRepository.save(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}