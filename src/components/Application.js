import React, {useState , useEffect} from "react";
import axios from "axios";

import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewerList = getInterviewersForDay(state, state.day);
  
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
      ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewes:all[2].data}))
    })
  }, []);

  const schedule = appointments.map((appointment) => {
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  const appointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
         key={appointment.id} 
         {...appointment} 
      />
    )
  });

  function bookInterview(id, interview) {
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

  function cancelInterview(id) {
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

  }

  


  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              value={state.day}
              onChange={setDays}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {interviewerList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
