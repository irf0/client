//UserListItem --> how the list will show when someone search on the search box

import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#C6F6D5",
        color: "white",
      }}
      display="flex"
      width="100%"
      alignItems="center"
      color="black"
      borderRadius="lg"
      px={3}
      py={2}
      mb={2}
    >
      <Avatar mr={2} size="sm" name={user.name} src={user.pic} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email :</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
