const Notification = ({ message }) => {

  const confirm = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorMsg = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

    if (message === null) {
      return null
    }

    if (message.length > 50) {
      return (
        <div style={errorMsg}>
          {message}
        </div>
      )    
    }else{
      return (
        <div style={confirm}>
          {message}
        </div>
      )
    }
  
   
  }

  export default Notification;