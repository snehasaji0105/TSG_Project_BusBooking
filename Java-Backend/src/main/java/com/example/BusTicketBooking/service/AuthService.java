package com.example.BusTicketBooking.service;


import com.example.BusTicketBooking.dto.AuthRequest;
import com.example.BusTicketBooking.dto.AuthResponse;
import com.example.BusTicketBooking.dto.JwtResponse;
import com.example.BusTicketBooking.exception.EmailAlreadyExistsException;
import com.example.BusTicketBooking.exception.ResourceNotFoundException;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.repository.RoleRepository;
import com.example.BusTicketBooking.repository.UserRepository;
import com.example.BusTicketBooking.util.ValidationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.BusTicketBooking.model.Role;

import java.lang.reflect.InvocationTargetException;


//@Service
//public class AuthService {
//    final Logger logger = LoggerFactory.getLogger(AuthService.class);
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private RoleRepository roleRepository;
//    @Autowired
//    private JwtService jwtService;
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//   public ResponseEntity<AuthResponse>registerUser(AuthRequest request){
//        if(Boolean.TRUE.equals(userRepository.existsByEmail(request.getEmail()))){
//            logger.error("user already exist");
//            throw new EmailAlreadyExistsException("Email already exists");
//        }
//        User user = new User();
//        Role role = roleRepository.findByName("ROLE_USER").orElseThrow(()->new UsernameNotFoundException("ROLE_USER EXCEPTION"));
//        user.setRole(role);
//        user.setName(request.getName());
//
//        user.setEmail(request.getEmail());
//
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        logger.info("user registered");
//        userRepository.save(user);
//        return ResponseEntity.ok(new AuthResponse(user.getEmail()+" successfully registered",true));
//    }
//
//    public ResponseEntity<JwtResponse>loginUser(AuthRequest request){
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//            logger.info("user logged in");
//            Role role=userRepository.findByEmail(request.getEmail()).get().getRole();
//            return ResponseEntity.ok(new JwtResponse(jwtService.generateToken(request.getEmail()),true,role.getName())) ;
//        }
//        catch (AuthenticationException ex){
//            logger.error("invalid user credentials");
//            throw new ResourceNotFoundException("User",request.getEmail(),"invalid user email or password");
//        }
//    }
//}

    @Service
    public class AuthService {
        final Logger logger = LoggerFactory.getLogger(AuthService.class);
        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final PasswordEncoder passwordEncoder;

        @Autowired
        public AuthService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService,
                           AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
            this.jwtService = jwtService;
            this.authenticationManager = authenticationManager;
            this.passwordEncoder = passwordEncoder;
        }

        /**
         * Registers a new user.
         *
         * @param request the authentication request containing user information
         * @return a response entity with a success message and status
         * @throws EmailAlreadyExistsException if the email already exists in the system
         */
        public ResponseEntity<AuthResponse> registerUser(AuthRequest request) throws IllegalAccessException, InvocationTargetException {
            if(request==null){
                logger.error("request is null ");
                throw new IllegalArgumentException("request empty");
            }
            // check if request is empty
            if (ValidationUtil.isBlank(request)) {
                logger.error("request can't be null");
                throw new IllegalArgumentException("fields cannot be empty");
            }


            //check if email is valid
            if(!ValidationUtil.validateEmail(request.getEmail())){
                logger.error("Invalid email format: {}", request.getEmail());
                throw new IllegalArgumentException("Invalid email format");
            }

  /*
            Must contain at least one lowercase letter.
Must contain at least one uppercase letter.
Must contain at least one digit.
Must contain at least one special character (@, $, !, %, *, ?, &).
Must be at least 8 characters long.
*/
            if (!ValidationUtil.validatePassword(request.getPassword())) {
                logger.error("Invalid password format: {}", request.getPassword());
                throw new IllegalArgumentException("""
                    Must contain at least one lowercase letter
                   Must contain at least one uppercase letter
                   Must contain at least one digit
                   Must contain at least one special character (@, $, !, %, *, ?, &)
                   Must be at least 8 characters long
                    """);
            }
            // Check if email already exists
            if (Boolean.TRUE.equals(userRepository.existsByEmail(request.getEmail()))) {
                logger.error("User with email {} already exists", request.getEmail());
                throw new EmailAlreadyExistsException("Email already exists");
            }

            Role role = roleRepository.findByName("ROLE_USER").orElseThrow(()->new UsernameNotFoundException("ROLE_USER EXCEPTION"));
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(role);
            userRepository.save(user);
            logger.info("User {} successfully registered", request.getEmail());

            return ResponseEntity.ok(new AuthResponse(user.getEmail() + " successfully registered", true));
        }

        /**
         * Logs in a user.
         *
         * @param email password the authentication request containing user email and password
         * @return a response entity with a JWT token and success status
         * @throws ResourceNotFoundException if the user email or password is invalid
         */
        public ResponseEntity<JwtResponse> loginUser(String email,String password) {
            try {
                if(!ValidationUtil.isBlank(email,password)){
                    logger.error("Invalid email or password format: {} , {}",email,password);
                    throw new IllegalArgumentException("email or password invalid");
                }
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
                logger.info("User logged in: {}",email);
                return ResponseEntity.ok(new JwtResponse(jwtService.generateToken(email), email, true,userRepository.findByEmail(email).orElseThrow().getRole().getName()));
            } catch (AuthenticationException ex) {
                logger.error("Invalid credentials for email: {}",email);
                throw new ResourceNotFoundException("User", email, "Invalid email or password");
            }
        }
        public ResponseEntity<User>getUser(String email){
            return ResponseEntity.ok(userRepository.findByEmail(email).orElseThrow());
        }
    }
