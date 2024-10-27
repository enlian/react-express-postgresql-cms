import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./../contexts/AuthContext";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '', email: '' });
  const navigate = useNavigate(); // 使用 useNavigate 进行导航跳转
  const auth = useContext(AuthContext);

  const validateForm = () => {
    let valid = true;
    let usernameError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let emailError = '';

    // 用户名验证
    if (username.length < 4) {
      usernameError = '用户名必须至少包含 4 个字符';
      valid = false;
    }

    // 密码验证
    if (password.length < 6) {
      passwordError = '密码必须至少包含 6 个字符';
      valid = false;
    }

    // 确认密码验证
    if (password !== confirmPassword) {
      confirmPasswordError = '两次输入的密码不匹配';
      valid = false;
    }

    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = '邮箱格式无效';
      valid = false;
    }

    setErrors({ username: usernameError, password: passwordError, confirmPassword: confirmPasswordError, email: emailError });
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // 清除之前的消息

    if (!validateForm()) {
      return; // 如果表单无效，不继续
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('用户注册成功');
        
        // 假设 API 返回的 token 是 data.token
        const token = data.token;
        localStorage.setItem('token', token); // 保存 token 到 localStorage

       // 调用 context 中的 login 方法
       auth?.login(data.user);
        
       // 延迟 1 秒后跳转到首页
       setTimeout(() => {
         navigate("/"); // 跳转到首页
       }, 1000);
      } else {
        setMessage(data.message || '注册失败');
      }
    } catch (error) {
      setMessage('服务器错误');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container
      maxWidth="sm"
      sx={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
      }}
    >
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          注册
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="用户名"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="邮箱"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="密码"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="切换密码可见性"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="确认密码"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="切换密码可见性"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={3} mb={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : '注册'}
            </Button>
          </Box>
        </form>
        {message && (
          <Alert severity={message.includes('成功') ? 'success' : 'error'}>{message}</Alert>
        )}
      </Box>
    </Container>
  );
};

export default Register;
