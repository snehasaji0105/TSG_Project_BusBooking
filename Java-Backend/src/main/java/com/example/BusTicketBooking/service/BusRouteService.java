package com.example.BusTicketBooking.service;

import com.example.BusTicketBooking.dto.AuthResponse;
import com.example.BusTicketBooking.exception.ResourceNotFoundException;
import com.example.BusTicketBooking.model.BusRoute;
import com.example.BusTicketBooking.repository.BusRouteRepository;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BusRouteService {
    final Logger logger = LoggerFactory.getLogger(BusRouteService.class);

    @Autowired
    private BusRouteRepository busRouteRepository;


    public ResponseEntity<AuthResponse> addBusRoute(@Valid BusRoute busRoute) {
        try {
            logger.info("added bus route");
            busRouteRepository.save(busRoute);
            return ResponseEntity.ok(new AuthResponse("added successfully", true));
        } catch (ConstraintViolationException e) {
            throw new ResourceNotFoundException("bus-route", e.getMessage(), "validation error");
        } catch (Exception e) {
            throw new ResourceNotFoundException("bus-route", e.getMessage(), "creating new bus-route error");
        }
    }
    public ResponseEntity<List<BusRoute>> getBusRoute() {
        logger.info("Get BusRoute");
        return ResponseEntity.ok(busRouteRepository.findAll());
    }


    public ResponseEntity<AuthResponse> updateBusRoute(Integer id, @Valid BusRoute updatedBusRoute) {
        BusRoute oldBusRoute = busRouteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusRoute", "id", "not exist"));
        oldBusRoute.setJourneyDate(updatedBusRoute.getJourneyDate());
        oldBusRoute.setBookedSeats(updatedBusRoute.getBookedSeats());

        try {
            busRouteRepository.save(oldBusRoute);
            logger.info("updated BusRoute");
            return ResponseEntity.ok(new AuthResponse(String.format("%s is updated", id), true));
        } catch (ConstraintViolationException e) {
            throw new ResourceNotFoundException("bus-route", e.getMessage(), "validation error");
        }
    }



    public ResponseEntity<AuthResponse> deleteBusRoute(Integer id) {
        BusRoute busRoute = busRouteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusRoute", "id", "not exist"));
        logger.info("deleted BusRoute");
        busRouteRepository.delete(busRoute);
        return ResponseEntity.ok(new AuthResponse(String.format("%s is deleted", id), true));
    }

}
