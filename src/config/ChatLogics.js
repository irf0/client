export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 && //if this is last the msg
    (messages[i + 1].sender._id != m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
  //User is not the same loggedin user if all this condns satisfy
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 && //last mesg
    messages[messages.length - 1].sender._id !== userId && //is of opposite sender not of loggedin user
    messages[messages.length - 1].sender._id //last msg actually exists!
  );
};

//isSameSenderMargin--> To determine sender msg and reciever msg position
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 && //if this is last the msg
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[1].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

//Checking if the last msg was of the same user
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
