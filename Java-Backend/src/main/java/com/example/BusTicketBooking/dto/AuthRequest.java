package com.example.BusTicketBooking.dto;

import com.example.BusTicketBooking.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthRequest {
    final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private String name;
    private String email;
    private String password;

    public AuthRequest(String email, String password){
        this.email = email;
        this.password=password;
    }
}
