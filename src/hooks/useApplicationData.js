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
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,  interviewers: all[2].data}));
        console.log("useEffect test", all);
    })
  }, []);



  

  const updateSpots = function(state, appointments) {

    let numSpots = 0;

    for (let i of state.appointments) { 
      console.log("for loop", i)
      if(appointments[i].interview === null) {
        numSpots += 1;
      }
      
    };

    const updatedSpots = state.days.map(slot => {
      slot.name === state.day ? {...state.days.find(day => day.name === state.day), numSpots} : slot
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

   
    console.log("bookInterview values",id,interview)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        console.log("bookInterview log")
        setState({...state, appointments, days: updateSpots(state, appointments)})
       
      })
      .catch(error => {
        console.log("bookInterview catch")
        console.log(error)
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