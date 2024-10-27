const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// 路由配置，加上 /users 前缀
router.get('/users', getAllUsers); // 获取所有用户
router.get('/users/:id', getUserById); // 获取单个用户
router.post('/users', createUser); // 创建用户
router.put('/users/:id', updateUser); // 更新用户
router.delete('/users/:id', deleteUser); // 删除用户

module.exports = router;