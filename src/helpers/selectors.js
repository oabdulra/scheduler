//returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  
  let appointmentList = [];

  for(let appointmentDay of state.days) {

    if (appointmentDay.name === day) {
      appointmentDay.appointments.forEach(appointment => appointmentList.push(state.appointments[appointment]));
    }

  };

  return appointmentList;
  
};