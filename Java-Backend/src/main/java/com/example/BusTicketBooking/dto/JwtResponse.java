package com.example.BusTicketBooking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class JwtResponse {
        private String token;
        private String email;
        private Boolean access;
        private String role;
}
