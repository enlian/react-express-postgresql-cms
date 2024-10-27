// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL); // 使用环境变量连接数据库

let User;

if (!sequelize.models.User) {
    User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true, 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 新增权限字段
        permissions: {
            type: DataTypes.JSON, // 使用 JSON 字段来存储权限信息
            allowNull: false,
            defaultValue: {
                articleManagement: false,
                categoryManagement: false,
            },
        },
    }, {
        timestamps: false, 
        tableName: 'users' // 自定义表名为小写
    });

    // 同步模型到数据库
    User.sync();
} else {
    User = sequelize.models.User;
}

module.exports = User;
