import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerName = props.name;
  const interviewerAvi = props.avatar;
  const selectedInterview = props.selected;
  const propsId = props.id;
  const interviewClass = classNames("interviewers__item", {"interviewers__item--selected":  selectedInterview});
  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(propsId)}>
    <img
    className="interviewers__item-image"
    src={interviewerAvi}
    alt={interviewerName}
    />
     {selectedInterview && interviewerName}
    </li>
  )
};