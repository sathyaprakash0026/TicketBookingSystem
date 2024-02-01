import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import AppBarplay from './Appbar';


const SeatBookingSystem = () => {
    const [selectedMovie, setSelectedMovie] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [seatCost, setSeatCost] = useState(200);

    const movies = [
        { id: 1, title: 'Avengers End Game' },
        { id: 2, title: 'Iron Man 2' },
        { id: 3, title: 'Spiderman No Way Home' },
        { id: 4, title: 'WonderWomen' },
    ];

    const seatRows = 5;
    const seatsPerRow = 8;

    const seatAvailability = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const getLocalStorageKey = (movieId) => `bookedSeats_${movieId}`;

    useEffect(() => {
        const localStorageKey = getLocalStorageKey(selectedMovie);
        const storedBookedSeats = localStorage.getItem(localStorageKey);
        if (storedBookedSeats) {
            setBookedSeats(JSON.parse(storedBookedSeats));
        }
    }, [selectedMovie]);

    const handleMovieChange = (event) => {
        const movieId = event.target.value;
        setSelectedMovie(movieId);
        setSelectedSeats([]);
        setBookedSeats([]);

        const localStorageKey = getLocalStorageKey(movieId);
        const storedBookedSeats = localStorage.getItem(localStorageKey);
        if (storedBookedSeats) {
            setBookedSeats(JSON.parse(storedBookedSeats));
        }
    };

    const handleSeatClick = (row, seat) => {
        const selectedSeat = `${row}-${seat}`;
        const isSelected = selectedSeats.includes(selectedSeat);
        const isBooked = bookedSeats.includes(selectedSeat);

        if (!isBooked) {
            if (!isSelected) {
                setSelectedSeats([...selectedSeats, selectedSeat]);
            } else {
                setSelectedSeats(selectedSeats.filter((s) => s !== selectedSeat));
            }
        }
    };

    const isSeatOccupied = (row, seat) => seatAvailability[row][seat] === 1;

    const handleBookSeats = () => {
        const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
        setBookedSeats(updatedBookedSeats);
        setSelectedSeats([]);

        const localStorageKey = getLocalStorageKey(selectedMovie);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedBookedSeats));
    };


    const calculateTotalCost = () => {
        return selectedSeats.length * seatCost;
    };

    return (

        <><AppBarplay></AppBarplay>
            <CssBaseline />
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Seat Booking System</h1>
                <label>Select Movie:</label>
                <select onChange={handleMovieChange} value={selectedMovie || ''}>
                    <option value="" disabled>Select a movie</option>
                    {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>

                {selectedMovie && (
                    <div>
                        <h2>Selected Movie: {movies.find((movie) => movie.id === parseInt(selectedMovie, 10)).title}</h2>
                        <div>
                            {Array.from({ length: seatRows }).map((_, row) => (
                                <div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
                                    {Array.from({ length: seatsPerRow }).map((_, seat) => (
                                        <button
                                            key={seat}
                                            onClick={() => handleSeatClick(row, seat)}
                                            style={{
                                                margin: '5px',
                                                width: '30px',
                                                height: '30px',
                                                backgroundColor: isSeatOccupied(row, seat)
                                                    ? 'red'
                                                    : bookedSeats.includes(`${row}-${seat}`)
                                                        ? 'grey'
                                                        : selectedSeats.includes(`${row}-${seat}`)
                                                            ? '#2196F3'
                                                            : '#4CAF50',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <h3>Legend:</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ color: '#4CAF50' }}>Available Seat {seatRows * seatsPerRow - bookedSeats.length} available</div>
                                <div style={{ color: '#2196F3' }}>Selected Seat {selectedSeats.length} selected</div>
                                <div style={{ color: 'red' }}>Occupied Seat {bookedSeats.length} occupied</div>
                                {/* <div style={{ color: 'grey' }}>N/A Seat</div> */}
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={handleBookSeats} disabled={selectedSeats.length === 0}>
                                Book Selected Seats
                            </button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <p>Total Cost: {calculateTotalCost()} Rs</p>
                        </div>
                    </div>
                )}
            </div></>
    );
};

export default SeatBookingSystem;
