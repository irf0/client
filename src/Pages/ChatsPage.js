import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/miscellenious/SideDrawer";
import MyChats from "../Components/MyChats";
import { ChatState } from "../Context/chatProvider";

const ChatsPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatsPage;
