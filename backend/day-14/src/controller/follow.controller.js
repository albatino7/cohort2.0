const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");

async function followByUserIdController(req, res) {
  const userID = req.user.id;
  console.log("this req from toke id ::: " + userID);

  const { userid } = req.params;

  console.log("this req from userid params  :::" + userid);

  const follweeID = await userModel.findOne({ _id: userid });

  if (!follweeID) {
    return res.status(200).json({ message: "params user doesnot exist" });
  }

  const follwerID = await userModel.findOne({ _id: userID });

  if (!follwerID) {
    return res.status(409).json({ message: "token user doesnot exist " });
  }

  const userAlreadyFollow = await followModel.findOne({
    followee: follweeID,
    follower: follwerID,
  });

  if (userID == userid) {
    return res.status(409).json({
      message: "You cannot  follow YourSelf",
    });
  }

  if (userAlreadyFollow) {
    return res.status(409).json({
      message: "You AlreadY Follow this User",
    });
  }

  const request = await followModel.create({
    follower: follwerID,
    followee: follweeID,
    status: follweeID.acctype == "public" ? "accepted" : "pending",
  });

  res.status(200).json({
    message: "you sucessfully followed  user with id in params",
    request,
  });
}

async function acceptRequestController(req, res) {
  const userID = req.user.id;

  const { requestedid } = req.body;

  const tokenUser = await userModel.findOne({
    _id: userID,
  });

  if (!tokenUser) {
    return res.status(409).json({
      message: "Token User IS Not EXISTED",
    });
  }

  const user = await userModel.findOne({
    _id: requestedid,
  });

  if (!user) {
    return res.status(409).json({
      message: "requested user id Not EXisted",
    });
  }

  const final = await followModel.findOne({
    follower: userID,
    followee: user._id,
  });

  if (!final) {
    return res.status(409).json({
      message: "You donot Send The request ",
    });
  }

  if (final.status == "accepted") {
    return res.status(200).json({
      messaage: "You Already accept the request",
    });
  }

  final.status = "accepted";
  await final.save();

  res.status(200).json({
    message: "friend Request is Accepted ",
    final,
  });
}

async function unfollowUserController(req, res) {
  const userID = req.user.id;

  const { unfollowUserId } = req.body;

  const user = userModel.findOne({
    _id: userID,
  });

  if (!user) {
    return res.status(409).json({
      message: "Token User Is Not Existed",
    });
  }

  const unfollowUser = await userModel.findOne({
    _id: unfollowUserId,
  });

  if (!unfollowUser) {
    return res.status(409).json({
      message: "Unfollow user ID is not EXISTED ",
    });
  }

  const respone = await followModel.findOneAndDelete({
    follower: userID,
    followee: unfollowUserId,
  });

  res.status(200).json({
    message: "You Successfully Unfollow The User",
    respone,
  });
}

module.exports = {
  followByUserIdController,
  acceptRequestController,
  unfollowUserController,
};
