import {useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,  interviewes: all[2].data}))
    });
  }, []);



  

  const updateSpots = function(state, appointment) {

    


  };




  const setDay = (day) => {
    setState({...state, day });
  };

  const bookInterview = function(id, interview) {
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments})
      })
      .catch(error => {
        console.log(error)
      });
    
  };


  const cancelInterview = function(id) {
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments})
      });

  };


  




  return {state, setDay, bookInterview, cancelInterview};
  
};