import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
