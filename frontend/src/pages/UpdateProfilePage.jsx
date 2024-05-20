import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";

export default function UpdateProfilePage() {
  const showToast = useShowToast();
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    profilePic: user.profilePic,
    bio: user.bio,
  });
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/users//update/:id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
    } catch (error) {
      console.log(error);
      showToast("Error", error, "error");
    }
  };

  const fileRef = useRef(null);

  const { handleImageChange } = usePreviewImg();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.dark")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Update User Profile
        </Heading>
        <FormControl>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                border={useColorModeValue("1px solid white", "1px solid black")}
                size="xl"
                src={user.profilePic}
              />
            </Center>
            <Center w="full">
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="Emmanuel Olagunju"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            value={inputs.name}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="mlo_olagunju"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            value={inputs.username}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="mlo@mlo.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="Your bio"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            value={inputs.bio}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={useColorModeValue("gray.600", "gray.700")}
            color={"white"}
            w="full"
            _hover={{
              bg: useColorModeValue("gray.700", "gray.800"),
            }}
            onClick={handleUpdateProfile}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
