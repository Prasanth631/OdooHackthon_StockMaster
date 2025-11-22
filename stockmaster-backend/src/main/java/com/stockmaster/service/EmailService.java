package com.stockmaster.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendOTP(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("StockMaster - Password Reset OTP");
            message.setText("Your OTP for password reset is: " + otp + "\n\nThis OTP will expire in 10 minutes.");
            
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Email sending failed. OTP: " + otp);
        }
    }
}