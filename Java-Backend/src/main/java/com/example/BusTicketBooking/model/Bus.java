package com.example.BusTicketBooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bus",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"busId"})})


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Bus {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer busId;
    private String busNumber;
    private String busName;
    private Integer totalSeats;
    private String routeSource;
    private String routeDestination;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")
    private BusRoute route;
}
