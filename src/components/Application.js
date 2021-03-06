import React, {useState , useEffect} from "react";
import axios from "axios";

import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interview = getInterview(state, appointment.interview);
  const interviewer = getInterviewersForDay(state, state.day);
  
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }


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
    return (
      <Appointment 
         key={appointment.id} 
         {...appointment} 
      />
    )
  });



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
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
