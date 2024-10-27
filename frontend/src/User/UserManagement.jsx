import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// 示例接口URL，需替换为实际后端API的URL
const API_URL = "/api/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // 用户数据
  const [loading, setLoading] = useState(false); // 加载状态
  const [errorMessage, setErrorMessage] = useState(""); // 错误消息
  const [successMessage, setSuccessMessage] = useState(""); // 成功消息
  const [openDialog, setOpenDialog] = useState(false); // 是否显示对话框
  const [selectedUser, setSelectedUser] = useState(null); // 选中的用户（编辑/新增）
  const [permissions, setPermissions] = useState({
    articleManagement: false,
    categoryManagement: false,
  }); // 权限
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar 状态

  // 初始化时从 API 获取用户数据
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data); // 确保设置的是一个数组
      } else {
        setErrorMessage("数据格式错误，无法获取用户列表");
        setSnackbarOpen(true); // 显示错误提示
      }
    } catch (error) {
      setErrorMessage("获取用户数据失败");
      setSnackbarOpen(true); // 显示错误提示
    } finally {
      setLoading(false);
    }
  };

  // 打开新增用户或编辑用户的对话框
  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setPermissions({
        articleManagement: user.permissions.articleManagement,
        categoryManagement: user.permissions.categoryManagement,
      });
    } else {
      setSelectedUser({ name: "", permissions: {} });
      setPermissions({ articleManagement: false, categoryManagement: false });
    }
    setOpenDialog(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  // 关闭 Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // 保存或更新用户
  const handleSaveUser = async () => {
    if (!selectedUser.name) {
      setErrorMessage("用户名不能为空");
      setSnackbarOpen(true);
      return;
    }

    const userData = {
      name: selectedUser.name,
      permissions,
    };

    try {
      setLoading(true);
      let response;
      if (selectedUser.id) {
        // 更新用户
        response = await fetch(`${API_URL}/${selectedUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } else {
        // 新增用户
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }
      if (response.ok) {
        setSuccessMessage(selectedUser.id ? "用户更新成功" : "用户创建成功");
        setSnackbarOpen(true);
        fetchUsers();
        handleCloseDialog();
      } else {
        setErrorMessage("操作失败");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setErrorMessage("操作失败");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // 删除用户
  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccessMessage("用户删除成功");
        setSnackbarOpen(true);
        fetchUsers();
      } else {
        setErrorMessage("删除失败");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setErrorMessage("删除失败");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // 处理权限的切换
  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  // 将权限转化为逗号分隔的字符串
  const formatPermissions = (permissions) => {
    const permList = [];
    if (permissions.articleManagement) permList.push("文章管理");
    if (permissions.categoryManagement) permList.push("栏目管理");
    return permList.join(", ");
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        新增人员
      </Button>

      {loading ? <CircularProgress /> : null}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>用户名</TableCell>
              <TableCell>权限</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{formatPermissions(user.permissions)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 用户编辑/新增对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser?.id ? "编辑用户" : "新增用户"}</DialogTitle>
        <DialogContent>
          <TextField
            label="用户名"
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <div>
            <label>文章管理权限</label>
            <Checkbox
              name="articleManagement"
              checked={permissions.articleManagement}
              onChange={handlePermissionChange}
            />
          </div>
          <div>
            <label>栏目管理权限</label>
            <Checkbox
              name="categoryManagement"
              checked={permissions.categoryManagement}
              onChange={handlePermissionChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSaveUser} color="primary">
            {loading ? <CircularProgress size={24} /> : "保存"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage ? "success" : "error"}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserManagement;
