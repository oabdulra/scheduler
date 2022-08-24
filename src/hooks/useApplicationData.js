import {useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  //state declarations
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //sets state based on api call using axios library
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,  interviewers: all[2].data}));
        
    });
  }, []);



  
  //updates the spots for the selected day when deleting, creating, etc..
  const updateSpots = function(state, appointments) {

    const updatedSpots = state.days.map(slot => {
       if (slot.name === state.day) {
        return {
          ...slot,
          spots: slot.appointments.map(appt => appointments[appt]).filter(({interview}) => !interview).length
        }
       }
       return slot; 
    });
    return updatedSpots;
  };

  const setDay = (day) => {
    setState({...state, day });
  };

  //books interview then sets state and calls updateSpots function to update the spots remaining
  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({...state, appointments, days: updateSpots(state, appointments)})
      })
      
  };

   
  //deletes interview then sets state and calls updateSpots function to update the spots remaining
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments, days: updateSpots(state, appointments)})
      });

  };



  return {state, setDay, bookInterview, cancelInterview};
  
};