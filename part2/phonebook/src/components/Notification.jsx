const Notification = ({ isItError, message }) => {
  const notificationStyle = {
    color: `${isItError ? "red" : "green"}`,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
