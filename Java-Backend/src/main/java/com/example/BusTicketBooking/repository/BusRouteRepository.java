package com.example.BusTicketBooking.repository;


import com.example.BusTicketBooking.model.BusRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;

public interface BusRouteRepository extends JpaRepository<BusRoute, Integer> {
    BusRoute findByJourneyDate(Date journeyDate);

}

