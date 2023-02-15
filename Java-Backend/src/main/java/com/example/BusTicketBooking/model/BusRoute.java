package com.example.BusTicketBooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "busRoute",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"journeyDate"})})
@Data
@NoArgsConstructor
@AllArgsConstructor


public class BusRoute {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
   private Integer routeId;

//    private String journeyDate;
//    private Integer bookedSeats;
    @Min(value = 0, message = "Booked seats must be a non-negative number")
    private int bookedSeats;

    @NotNull(message = "Journey date must not be empty")
    private Date journeyDate;
    private String busNumber;


}
