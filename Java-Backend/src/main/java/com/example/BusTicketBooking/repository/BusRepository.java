package com.example.BusTicketBooking.repository;

import com.example.BusTicketBooking.model.Bus;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;


public interface BusRepository extends JpaRepository<Bus,Integer> {

    Optional<Bus>findByBusNumber(String busNumber);
//    List<Bus> findByRouteSourceAndRouteDestinationAndRouteJourneyDate(String source, String destination, Date journeyDate);






}


