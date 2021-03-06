import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from "sweetalert2";

import { list, create } from "../services/flights";
import { NavBarAdmin } from './components/nav';
import { Footer } from './components/footer';

function Flights(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const [flights, setFlights] = useState([]);

    async function getFlights(){
      const { data } = await list();
      setFlights(data)
    };
    
    useEffect(() => {
        getFlights()
    }, []);

    function handleCreateCharge(event) {
        const flightId = event.target.getAttribute("data-id");
        setCookies('flight', flightId, { path: '/' });
        const amount = event.target.getAttribute("data-price");
        setCookies('amount', amount, { path: '/' });
        history.push("/charges");
    }

    return(
        <>
        <h3>Let's Fly</h3>
            <div className="flight">
                {flights.map(flight => 
                    <li className="list-group-item" key={flight._id}>
                    <Card>
                        <img src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' width='265' height='265'/>
                        <CardContent sx={{ pb: 0}}>
                            <Typography>
                                <b>Flight Number:</b> {flight.flight}
                            </Typography>
                            <Typography>
                                <b>Departure:</b> {flight.departureAirport} <br/>
                                <b>Date:</b> {flight.depatureDate} - {flight.depatureTime} <br/>
                            </Typography>
                            <Typography>
                                <b>Arrival:</b> {flight.arrivalAirport} <br/>
                                <b>Date:</b> {flight.arrivalDate} - {flight.arrivalTime} <br/>
                            </Typography>
                        </CardContent>
                        <CardActions className='cart'>
                            <span id='price'>${flight.amount}</span>
                            <Button variant="contained" onClick={handleCreateCharge} data-id={flight.flight} data-price={flight.amount}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                    </li>
                )}
            </div>
        </>
    )
};

function NewFlight(){
    const history = useHistory();

    async function createFlight(event){
        event.preventDefault();
        const flight = {
            "flight": event.target.flight.value,
            "departureAirport": event.target.departureAirport.value,
            "arrivalAirport": event.target.arrivalAirport.value,
            "depatureDate": event.target.depatureDate.value,
            "depatureTime": event.target.depatureTime.value,
            "arrivalDate": event.target.arrivalDate.value,
            "arrivalTime": event.target.arrivalTime.value,
            "amount": event.target.amount.value
        }

        try{
            await create(flight)
            SweetAlert.fire({
                icon: 'success',
                title: 'Itinerary Added',
                text: 'Customers are now able to purchase it!',
              })
            setTimeout(() => history.push('/admin/dashboard'), 3000)
        }catch(error){
            SweetAlert.fire({
                icon: 'error',
                title: 'Try again',
                text: 'This Flight is already on our itinerary',
            })
        }
    }

    return(
        <>
        <NavBarAdmin/>
        <h2>Add Itinerary</h2>
        <form onSubmit={ createFlight }>
            <div className="form-group">
                <label htmlFor="flightNumber">Flight Number</label>
                <input type='text' placeholder='FN 124' id='flightNumber' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="departureAirport">Depature Airport</label>
                <input type='text' placeholder='Depature Airport' id='departureAirport' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="arrivalAirportl">Arrival Airport</label>
                <input type='text' placeholder='Arrival Airport' id='arrivalAirport' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="depatureDate">Depature Date</label>
                <input type='text' placeholder='YYYY/MM/DD' id='depatureDate' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="depatureTime">Arrival Date</label>
                <input type='text' placeholder='Data da Chegada' id='depatureTime' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="arrivalDate">Depature Time</label>
                <input type='text' placeholder='HH:MM' id='arrivalDate' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="arrivalTime">Arrival Time</label>
                <input type='text' placeholder='HH:MM' id='arrivalTime' className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="amount">Price</label>
                <input type='number' placeholder='R$ 0,00' id='amount' min='1' step="0.01" className="form-control" required/>
            </div>
            <button className="btn btn-primary" type='submit'>Add Flight</button>
        </form>
        <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
        <Footer/>
        </>
    )
};

function ListFlights(){
    const [flights, setFlights] = useState([]);

    async function getFlights(){
      const { data } = await list();
      setFlights(data)
    };
    
    useEffect(() => {
        getFlights()
    }, []);

    return(
        <>
            <div className="flight">
                {flights.map(flight => 
                    <li className="list-group-item" key={flight._id}>
                    <Card>
                        <img src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' width='265' height='265'/>
                        <CardContent sx={{ pb: 0}}>
                            <Typography>
                                <b>Flight:</b> {flight.flight}
                            </Typography>
                            <Typography>
                                <b>Departure:</b> {flight.departureAirport} <br/>
                                <b>Date:</b> {flight.depatureDate} - {flight.depatureTime} <br/>
                            </Typography>
                            <Typography>
                                <b>Arrival:</b> {flight.arrivalAirport} <br/>
                                <b>Date:</b> {flight.arrivalDate} - {flight.arrivalTime} <br/>
                            </Typography>
                        </CardContent>
                        <CardActions className='cart'>
                            <span id='price'>${flight.amount}</span>
                        </CardActions>
                    </Card>
                    </li>
                )}
            </div>
        </>
    )
};

function ListFlightsAdmin(){
    const [flights, setFlights] = useState([]);

    async function getFlights(){
      const { data } = await list();
      setFlights(data)
    };
    
    useEffect(() => {
        getFlights()
    }, []);

    return(
        <>
        <NavBarAdmin />
        <h2>Avaliable Flights</h2>
            {flights.map(flight => 
                <li className="list-group-item" key={flight._id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography>
                                <b>Flight Number:</b> {flight.flight}
                            </Typography>
                            <Typography>
                                <b>Departure:</b> {flight.departureAirport} <br/>
                                <b>Departure Date:</b> {flight.depatureDate} - {flight.depatureTime} <br/>
                            </Typography>
                            <Typography>
                                <b>Arrival:</b> {flight.arrivalAirport} <br/>
                                <b>Arrival Date:</b> {flight.arrivalDate} - {flight.arrivalTime} <br/>
                            </Typography>
                            <Typography>
                                <b>Price:</b> {flight.amount} <br/>
                            </Typography>
                        </CardContent>
                    </Card>
                </li>
            )}
        <Footer/>
        </>
    )
}

export { Flights, NewFlight, ListFlights, ListFlightsAdmin }