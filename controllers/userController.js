import User from "../models/userModel.js";
import {publisher,publisherUpdate,publisherEmail} from "../rabbitmq/publisher.js";

export const getUsers = async (req, res) => {
  try {
    const users= await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: "GET isteği hatalı",
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message:"GET BY ID İstek Hatalı",
    });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    await publisher(newUser);
    await publisherEmail(newUser);
    res.status(201).json({ newUser,msg: 'Kayıt ,Mesaj ve Mail İşleminiz Başarılı.' });
  } catch (error) {
    res.status(409).json({
      message: "POST isteği hatalı",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
    await publisherUpdate(updatedUser);
    res.json({ updatedUser,msg: 'Güncelleme ve Kuyruk İşleminiz Başarılı.' });
  } catch (error) {
    res.status(409).json({
      message:"UPDATE isteği hatalı",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deletedUser = await User.findByIdAndRemove(_id);
    res.json(deletedUser);
  } catch (error) {
    res.status(409).json({
      message: "DELETE isteği hatalı",
    });
  }
};