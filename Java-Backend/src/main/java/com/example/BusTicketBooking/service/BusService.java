package com.example.BusTicketBooking.service;

import com.example.BusTicketBooking.dto.AuthResponse;
import com.example.BusTicketBooking.exception.ResourceNotFoundException;
import com.example.BusTicketBooking.model.Bus;

import com.example.BusTicketBooking.model.BusRoute;
import com.example.BusTicketBooking.repository.BusRepository;
import com.example.BusTicketBooking.repository.BusRouteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.RouteMatcher;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;


@Service
public class BusService {
    final Logger logger = LoggerFactory.getLogger(BusService.class);

    @Autowired
    private BusRepository busRepository;
    @Autowired
    private BusRouteRepository busRouteRepository;
//    public List<Bus> searchBusesByDate(String routeSource,String routeDestination, Date journeyDate) {
//        BusRoute busRoute = busRouteRepository.findByJourneyDate(journeyDate);
//        if (busRoute == null) { throw new RuntimeException("No route found at that date " + journeyDate); }
//        return busRepository.findByRouteSourceAndRouteDestinationAndRouteJourneyDate(routeSource, routeDestination, journeyDate); }
    public ResponseEntity<AuthResponse> addBus(Bus bus) {

        try {
            if ((bus.getRouteSource().toLowerCase()).equals(bus.getRouteDestination().toLowerCase())) {
                return ResponseEntity.badRequest().body(new AuthResponse("Source and destination cannot be the same", false));
            }

//            Optional<Bus> existingBus = busRepository.findByBusNumber(bus.getBusNumber());
//            if (existingBus.isPresent()) {
//                return ResponseEntity.badRequest().body(new AuthResponse("Bus with the same number already exists", false));
//            }

            busRepository.save(bus);
            return ResponseEntity.ok(new AuthResponse("added successfully", true));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("bus", e.getMessage(), "creating new bus error");
        }
    }
    public ResponseEntity<List<Bus>> getBus() {
        logger.info("Get Bus");
        return ResponseEntity.ok(busRepository.findAll());
    }

    public ResponseEntity<AuthResponse> updateBus(Integer id, Bus updatedBus) {
        Bus oldBus =busRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bus", id.toString(), "not exist"));

        if (updatedBus.getRouteDestination().equals(updatedBus.getRouteSource())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Source and destination cannot be the same", false));
        }

        oldBus.setBusNumber(updatedBus.getBusNumber());
        oldBus.setBusName(updatedBus.getBusName());
        oldBus.setTotalSeats(updatedBus.getTotalSeats());
        oldBus.setRouteDestination(updatedBus.getRouteDestination());
        oldBus.setRouteSource(updatedBus.getRouteSource());

        busRepository.save(oldBus);
        logger.info("updated Bus");
        return ResponseEntity.ok(new AuthResponse(String.format("%s is updated", id), true));
    }


    public ResponseEntity<AuthResponse> deleteBus(Integer id) {
        System.out.println(id);
        Bus bus = busRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bus", id.toString(), "not exist"));
        logger.info("deleted bus");
        busRepository.delete(bus);
        return ResponseEntity.ok(new AuthResponse(String.format("%s is deleted", id), true));
    }
    public ResponseEntity<String> addBusToRoute(Integer routeId,Integer busId){
     BusRoute busRoute= busRouteRepository.findById(routeId).orElseThrow();
     Bus bus=busRepository.findById(busId).orElseThrow();
     bus.setRoute(busRoute);
     busRepository.save(bus);
     return ResponseEntity.ok("Added Successfully");
    }

//    public List<Bus> searchBuses(String routeSource, String routeDestination) {
//        return busRepository.findByRouteSourceAndRouteDestination(routeSource, routeDestination);
//    }

}
