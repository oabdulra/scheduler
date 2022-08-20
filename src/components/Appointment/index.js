import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";


/*Index component container for appointments, puts the appointment component together */
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";


  //mode set functions imported in from Hooks
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //saves an interview when "save" is clicked and sends a request to update DB
  const save = function(name, interviewer) {
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  };

  //deletes an appointment when "delete" is clicked and confirmed, then sends a request to update DB
  const destroy = function() {
    transition(DELETING, true);
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };

  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not save appointment" }
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === CONFIRM && (
        <Confirm
         message='Are you sure you would like to delete?' 
         onCancel={() => back()}
         onConfirm={destroy}
         />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      
    </article>
  );
};