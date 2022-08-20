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
      axios.get('http://localhost:8001/api/interviewers'),
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,  interviewers: all[2].data}));
        
    });
  }, []);



  

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

  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        
        setState({...state, appointments, days: updateSpots(state, appointments)})

      })
      .catch(error => {
        //console.log(error)
      });
    
  };


  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments, days: updateSpots(state, appointments)})
      });

  };



  return {state, setDay, bookInterview, cancelInterview};
  
};