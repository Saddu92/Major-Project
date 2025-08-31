import Room from "../models/Room.js";
import User from "../models/User.js";


const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// CREATE ROOM CONTROLLER (UPDATED TO STORE DISPLAY_NAME + LAT/LON)

export const createRoom = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const userId = req.user.id; // from JWT middleware

    if (!source?.displayName || !destination?.displayName) {
      return res.status(400).json({ message: "Source and Destination details are required" });
    }

    // Generate random 6-digit code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = new Room({
      code,
      source: {
        displayName: source.displayName,
        lat: source.lat,
        lon: source.lon,
      },
      destination: {
        displayName: destination.displayName,
        lat: destination.lat,
        lon: destination.lon,
      },
      createdBy: userId,
      members: [userId],
    });
   


    await room.save();

    // also push room into user's joinedRooms if you maintain that
    await User.findByIdAndUpdate(userId, { $push: { joinedRooms: room._id } });

    return res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (err) {
    console.error("Room Creation Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};




export const joinRoom = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code)
      return res.status(400).json({ message: "Room code is required" });

    const room = await Room.findOne({ code });

    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if user already a member
    if (room.members.includes(req.user._id)) {
      return res.status(400).json({ message: "You already joined this room" });
    }

    // Add user to members
    room.members.push(req.user._id);
    await room.save();
  } catch (error) {
    res.status(500).json({ message: "Join room failed", error: error.message });
  }
};

export const getMyRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({
      $or: [{ createdBy: userId }, { members: userId }],
    })
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.status(200).json({ rooms });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch rooms", error: error.message });
  }
};

export const getRoomByCode = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const room = await Room.findOne({ code: roomCode }).populate("members", "username email");

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    console.error("Error fetching room:", err);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

