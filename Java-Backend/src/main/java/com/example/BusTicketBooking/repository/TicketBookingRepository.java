package com.example.BusTicketBooking.repository;


import com.example.BusTicketBooking.model.TicketBooking;
import com.example.BusTicketBooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketBookingRepository extends JpaRepository<TicketBooking,Long> {



}