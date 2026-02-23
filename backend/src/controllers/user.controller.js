import { prisma } from "../config/prisma.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      data: newUser,
    });

  } catch (error) {
    res.status(500).json({ message: "User gagal dibuat, email sudah digunakan." });
  }
};

// PATCH USER
export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        message: "Minimal satu field harus diisi.",
      });
    }

    // Kita hanya update name saja
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        // email sengaja tidak dimasukkan kalau memang tidak boleh diganti
      },
    });

    // Logic response message
    let message = "";

    if (name && !email) {
      message = "Nama berhasil di ganti.";
    } else if (!name && email) {
      message = "Email berhasil di ganti.";
    } else if (name && email) {
      message = "Nama dan Email berhasil di ganti.";
    }

    res.json({
      message,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(200).json({ message: "User tidak ditemukan." });
  }
};