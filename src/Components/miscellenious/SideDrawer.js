import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  //Handle empty search
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Enter something to search",
        description: "Atleast have this much of common sense",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    //API call for searching the user
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user/?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the requested query",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    //Header begins⤵
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#C6F6D5"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Chats" hasArrow placement="bottom-end">
          <Button variant="ghost" borderRadius="19px" onClick={onOpen}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "green" }}
            ></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize="3xl"
          fontWeight="thin"
          fontFamily="Shrikhand"
          color="green.400"
        >
          tap-Me
        </Text>

        <div>
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl" marginRight="16px" />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          {/* Profile dropdown menu⤵ */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      {/* Drawer Here ⤵ */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search By Name or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button backgroundColor="green.200" onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

//Tooltip-->Shows the label on hover over the search input
//base --> Means in smaller screens md--> medium screens
//MenuList --> Shows the notifications list dropdown
