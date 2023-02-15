package com.example.BusTicketBooking.controller;


import com.example.BusTicketBooking.dto.AuthResponse;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.model.BusRoute;
import com.example.BusTicketBooking.model.TicketBooking;
import com.example.BusTicketBooking.service.TicketBookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ticket")
@CrossOrigin
public class TicketBookingController {
    final Logger logger = LoggerFactory.getLogger(TicketBookingController.class);
    @Autowired
    private TicketBookingService ticketBookingService;



    @GetMapping("get-ticket/{id}")
    public  ResponseEntity<TicketBooking> getEmployee(@PathVariable Integer id ){
        return ticketBookingService.getTicket(id);
    }


    @PostMapping("add-ticket/{id}")
    public ResponseEntity<AuthResponse> addTicket( @RequestBody TicketBooking ticketBooking,@PathVariable String id) {
        System.out.println(ticketBooking.toString());
        return ticketBookingService.addTicket(ticketBooking, id);
    }



    @DeleteMapping("delete-ticket/{id}")
    public ResponseEntity<AuthResponse> deleteTicket(@PathVariable Long id) {
        return ticketBookingService.deleteTicket(Long.valueOf(id));
    }
    @GetMapping("add-ticket")
    public ResponseEntity<String> addTicket(@RequestParam("ticketId") Integer ticketId,@RequestParam("busId") Integer busId){
        return ticketBookingService.addTicketToBus(ticketId,busId);
    }
}