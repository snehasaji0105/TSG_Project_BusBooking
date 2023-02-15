package com.example.BusTicketBooking.dto;

import com.example.BusTicketBooking.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {

    private String message;
    private boolean access;
}
