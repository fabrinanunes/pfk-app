import * as React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "bootstrap/dist/css/bootstrap.min.css";

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
        setCookies('flight', flightId, { path: '/' })
        const amount = event.target.getAttribute("data-price");
        setCookies('amount', amount, { path: '/' })
        history.push("/charges");
    }

    return(
        <>
        <h3>Let's Fly</h3>
            {flights.map(flight => 
                <li className="list-group-item" key={flight._id}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
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
                        <Typography>
                            <b>Price:</b> {flight.amount} <br/>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleCreateCharge} data-id={flight.flight} data-price={flight.amount}>Select Flight</Button>
                    </CardActions>
                </Card>
                </li>
            )}
        </>
    )
};

function NewFlight(){
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

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

        create(flight).then((res) => {
            if(res.status === 200){
                setOpen(true)
                setTimeout(() => history.push('/dashboard'), 3000)  
            }
        })
    }

    return(
        <>
        <NavBarAdmin/>
        <h2>Add Itinerary</h2>
        <form onSubmit={ createFlight }>
            <div className="form-group">
                <label htmlFor="flight">Flight Number</label>
                <input type='text' placeholder='FN 124' id='flight' className="form-control" required/>
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
        <Collapse in={open}>
          <Alert 
            severity="success"
          >
            <AlertTitle>Sucesso</AlertTitle>
            <strong>Success!</strong> The flight is now part of our itinerary.
          </Alert>
          </Collapse>
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
            {flights.map(flight => 
                <li className="list-group-item" key={flight._id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
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
                            <Typography>
                                <b>Price:</b> {flight.amount} <br/>
                            </Typography>
                        </CardContent>
                    </Card>
                </li>
            )}
        </>
    )
};

function ListFlightsAdmin(){
    return(
        <>
        <NavBarAdmin />
        <h2>Avaliable Flights</h2>
        <ListFlights/>
        <Footer/>
        </>
    )
}

export { Flights, NewFlight, ListFlights, ListFlightsAdmin }