import React from "react";
import axios from "axios";

const useApplicationData = function () {


  const bookInterview = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  const cancelInterview = function() {
    transition(DELETING, true);
    props
    .deleteInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  };








  return {state, setDay, bookInterview, cancelInterview};
};