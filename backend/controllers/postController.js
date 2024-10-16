import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text)
      return res
        .status(400)
        .json({ message: "PostedBy and Text Fields are required" });

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ message: "User not Found For Post" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "You are unauthorized to create post for another user",
      });
    }
    const maxLength = 500;
    if (text.maxLength > maxLength) {
      return res.status(400).json({
        message: `Text length must be less than ${maxLength} characters`,
      });
    }

    const newPost = new Post({
      postedBy,
      text,
      img,
    });

    await newPost.save();

    res.status(201).json({ message: "Post Created Successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in creation of post", error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getting post", error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Unauthorized to delete the post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deleting post", error.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in liking/unliking post", error.message);
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
      return res.status(400).json({ message: "Text Field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "Replied Added Successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in replying to post", error.message);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    const following = user.following;

    const feedPosts = await Post.find({
      postedBy: { $in: following },
    }).sort({ createdAt: -1 });
    res.status(200).json({ feedPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getting feed post", error.message);
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
};
