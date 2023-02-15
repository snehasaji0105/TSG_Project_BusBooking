package com.example.BusTicketBooking.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Bus-Ticket Booking Application",
                description = "",
                version = "1.0",
//                termsOfServiceUrl = "https://example.com/tos",
                contact = @Contact(
                        name = "Sneha Saji",
                        email = "snehasaji0105@gmail.com",
                        url = "https://snehasaji0105.tk"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.apache.org/licenses/LICENSE-2.0.html"
                )
        ),
        servers = @Server(
                url = "http://localhost:8080/",
                description = "Production Server"
        ),
        security = @SecurityRequirement(name = "bearerAuth")
)
public class SwaggerConfig {

}
