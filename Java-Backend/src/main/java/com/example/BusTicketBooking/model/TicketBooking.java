package com.example.BusTicketBooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity

@Getter
@Setter
@ToString
@RequiredArgsConstructor

@AllArgsConstructor

public class TicketBooking {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer ticketId;
    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;
    private String bookingDate;
    private Integer noOfPassengers;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
