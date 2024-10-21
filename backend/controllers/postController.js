import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res
        .status(400)
        .json({ error: "PostedBy and Text Fields are required" });

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not Found For Post" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "You are unauthorized to create post for another user",
      });
    }
    const maxLength = 500;
    if (text.maxLength > maxLength) {
      return res.status(400).json({
        error: `Text length must be less than ${maxLength} characters`,
      });
    }

    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img);
      img = uploadResponse.secure_url;
    }

    const newPost = new Post({
      postedBy,
      text,
      img,
    });

    await newPost.save();

    res.status(201).json({ message: "Post Created Successfully", newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in creation of post", err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in getting post", err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Unauthorized to delete the post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in deleting post", err.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }

    //checling if user liked the post or not by checking the likes array
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      //if post is liked , unlike it
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post Unliked Successfully" });
    } else {
      //like it
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked Successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in liking/unliking post", err.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: postId } = req.params;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text) {
      return res.status(400).json({ error: "Text Field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in replying to post", err.message);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    const following = user.following;

    const feedPosts = await Post.find({
      postedBy: { $in: following },
    }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err in getting feed post", err.message);
  }
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
};
