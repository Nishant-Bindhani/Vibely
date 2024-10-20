import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);

  const showToast = useShowToast();
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]); //showToast might be required
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />;
      </Flex>
    );
  }
  if (!user && !loading) return <h1>User Not Found</h1>;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1230}
        replies={1442}
        postImg="/post1.png"
        postTitle="Let's talk about threads"
      />
      <UserPost
        likes={123}
        replies={142}
        postImg="/post2.png"
        postTitle="Nice tutorial"
      />
      <UserPost
        likes={230}
        replies={142}
        postImg="/post3.png"
        postTitle="Let's discuss about my post"
      />
      <UserPost
        likes={9230}
        replies={140}
        postImg="/post4.png"
        postTitle="My first post"
      />
    </>
  );
};

export default UserPage;
