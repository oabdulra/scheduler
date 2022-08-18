import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";


export default function InterviewerList(props) {
console.log("IL line 7", props);
  const interviewerList = props.interviewers.map(interviewer => {
  console.log("IL Line 9", interviewer);
    return(
        <InterviewerListItem
          key = {interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer= {() => props.onChange(interviewer.id)}
        />
    )

  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
};