const handleErrorMessage = (err, setErrorMessage) => {
  try {
    const message = err.response.data.message;
    if (message) {
      setErrorMessage(message);
    }
  } catch (_) {
    setErrorMessage("There was an error, try again.");
  }
};

export {handleErrorMessage};