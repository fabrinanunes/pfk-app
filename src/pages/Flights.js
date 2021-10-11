import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "bootstrap/dist/css/bootstrap.min.css";

import { list } from "../services/flights";

export function Flights(){
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
        <h3>Vôos disponíveis</h3>
            {flights.map(flight => 
                <li className="list-group-item" key={flight._id}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography>
                            <b>Vôo:</b> {flight.flight}
                        </Typography>
                        <Typography>
                            <b>Partida:</b> {flight.departureAirport} <br/>
                            <b>Data:</b> {flight.depatureDate} - {flight.depatureTime} <br/>
                        </Typography>
                        <Typography>
                            <b>Destino:</b> {flight.arrivalAirport} <br/>
                            <b>Data:</b> {flight.arrivalDate} - {flight.arrivalTime} <br/>
                        </Typography>
                        <Typography>
                            <b>Preço:</b> {flight.amount} <br/>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleCreateCharge} data-id={flight.flight} data-price={flight.amount}>Comprar</Button>
                    </CardActions>
                </Card>
                </li>
            )}
        </>
    )
};