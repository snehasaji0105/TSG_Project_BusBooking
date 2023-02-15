package com.example.BusTicketBooking.service;

import com.example.BusTicketBooking.dto.AuthResponse;
import com.example.BusTicketBooking.exception.ResourceNotFoundException;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.model.TicketBooking;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.repository.BusRepository;
import com.example.BusTicketBooking.repository.TicketBookingRepository;
import com.example.BusTicketBooking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TicketBookingService {
    final Logger logger = LoggerFactory.getLogger(TicketBookingService.class);
    @Autowired
    private TicketBookingRepository ticketBookingRepository;
    @Autowired
    private BusRepository busRepository;
    @Autowired
    private UserRepository userRepository;



    public ResponseEntity<TicketBooking> getTicket(Integer id) {
        return new ResponseEntity<TicketBooking>(this.ticketBookingRepository.findById(Long.valueOf(id)).orElseThrow(() -> new ResourceNotFoundException("TicketBooking", "id", String.valueOf(id))), HttpStatus.FOUND);
    }

    public ResponseEntity<AuthResponse> addTicket(TicketBooking ticketBooking, String userId) {
        User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        ticketBooking.setUser(user);
        try {
            logger.info("added ticket");
            ticketBookingRepository.save(ticketBooking);
            return ResponseEntity.ok(new AuthResponse(" added successfully", true));
        } catch (Exception e) {
            throw new ResourceNotFoundException("ticket", e.getMessage(), "creating new ticket error");
        }
    }


    public ResponseEntity<AuthResponse> deleteTicket(Long id) {
        TicketBooking ticketBooking = ticketBookingRepository.findById(Long.valueOf(Integer.valueOf(Math.toIntExact(id)))).orElseThrow(() -> new ResourceNotFoundException("BusTicketBooking", "id", "not exist"));
        logger.info("deleted course");
        ticketBookingRepository.delete(ticketBooking);
        return ResponseEntity.ok(new AuthResponse(String.format("%s is deleted", id), true));
    }

    public ResponseEntity<String> addTicketToBus(Integer ticketId,Integer busId){
        if (ticketId == null || ticketId <= 0 || busId == null || busId <= 0) {
            throw new ResourceNotFoundException("Ticket or bus ID is not valid",ticketId.toString(),"ticket not found");
        }
        TicketBooking ticketBooking=ticketBookingRepository.findById(Long.valueOf(ticketId)).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", "not exist"));
        Bus bus=busRepository.findById(busId).orElseThrow(() -> new ResourceNotFoundException("Bus", "id", "not exist"));
        if (ticketBooking.getBus() != null) {
            throw new ResourceNotFoundException("Ticket is not available",ticketId.toString(),"ticket not found");
        }
        ticketBooking.setBus(bus);
        ticketBookingRepository.save(ticketBooking);
        return ResponseEntity.ok("Added Successfully");
    }


}



