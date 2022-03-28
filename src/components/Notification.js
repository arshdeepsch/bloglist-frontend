const Notification = ({ message }) => {
  return (
    <div style={message.styleObj}>
      {message.message}
    </div>
  )
}

export default Notification