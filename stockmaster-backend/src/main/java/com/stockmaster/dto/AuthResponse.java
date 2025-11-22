package com.stockmaster.dto;
<<<<<<< HEAD
//used to check health point
public class AuthResponse {
=======

import lombok.Data;
>>>>>>> 67a3605a06716f80cfda40e48f64028e49861b7e

@Data
public class AuthResponse {
    public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	private String token;
    private String email;
    private String fullName;
    private String role;
    private Long userId;
}
