const Notification = ({ errorMessage, notificationMessage  }) => {
//exercise 5.4
  if(errorMessage === 'Wrong credentials'){
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  } else if(notificationMessage !== null){
    return (
      <div className='notification'>
        {notificationMessage}
      </div>
    )
  }
  else{
    return null
  }
}
export default Notification