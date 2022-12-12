import React, { useEffect } from "react";
import { Box, Container, Text, Tabs } from "@chakra-ui/react";
import { TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={4}
        bg={"white"}
        width="100%"
        margin="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Tap-Me
        </Text>
      </Box>
      <Box
        bg="white"
        padding={4}
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box
        d="flex"
        justifyContent="center"
        p={4}
        bg={"white"}
        width="100%"
        margin="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
      >
        <Text fontSize="1xl" fontFamily="Work sans">
          This app is made with 💖 by M Irfan
        </Text>
      </Box>
    </Container>
  );
}

export default Home;
