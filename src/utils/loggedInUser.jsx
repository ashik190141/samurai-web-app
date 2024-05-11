import React from 'react';

const loggedInUser = () => {
    let loggedInUser = null;
    if (localStorage.getItem("email")) {
      loggedInUser = localStorage.getItem("email");
    }
    return loggedInUser
};

export default loggedInUser;