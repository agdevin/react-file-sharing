const emailValid = (email) => {
    const valid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
    return valid; 
  }

export default emailValid;