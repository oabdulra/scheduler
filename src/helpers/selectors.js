//returns a list of appointments for that day
export function getAppointmentsForDay(state, day) {
  
  let appointmentList = [];

  for(let appointmentDay of state.days) {

    if (appointmentDay.name === day) {
      appointmentDay.appointments.forEach(appointment => appointmentList.push(state.appointments[appointment]));
    }

  };

  return appointmentList;
  
};

//gets interview
export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  let selectedInterviewer = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  
  return selectedInterviewer;

};

//gets interviewers for a specific day
export function getInterviewersForDay(state, day) {

  let interviewerList = [];
  
  for(let appD of state.days) {

    if (appD.name === day) {
      appD.interviewers.forEach(interviewP => interviewerList.push(state.interviewers[interviewP]));
    }

  };

  return interviewerList;

};