const User = require('../models/User');

// 获取所有用户
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // 使用 Sequelize 的 findAll() 方法
    console.log("Users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
};

// 获取单个用户
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // 使用 Sequelize 的 findByPk() 方法
    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
};

// 创建用户
exports.createUser = async (req, res) => {
  const { name, email, password, permissions } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: '请提供完整的用户信息' });
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password, // 在生产环境中应加密密码
      permissions,
    });
    res.status(201).json(newUser); // 返回创建的用户
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: '创建用户失败', error: error.message });
  }
};

// 更新用户
exports.updateUser = async (req, res) => {
  const { name, email, permissions } = req.body;

  try {
    const user = await User.findByPk(req.params.id); // 使用 findByPk() 查找用户
    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.permissions = permissions || user.permissions;

    await user.save(); // 保存更新
    res.json(user); // 返回更新后的用户信息
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: '更新用户失败', error: error.message });
  }
};

// 删除用户
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // 使用 findByPk() 查找用户
    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }

    await user.destroy(); // 使用 destroy() 删除用户
    res.json({ message: '用户已删除' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: '删除用户失败', error: error.message });
  }
};
