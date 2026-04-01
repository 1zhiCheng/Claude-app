# Task Manager API

一个基于 Express 和 React 的任务管理应用。

## 安装

```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd client && npm install
```

## 运行

```bash
# 启动后端服务器（端口 3000）
npm start

# 启动前端应用（端口 3001）
cd client && npm start
```

## 测试

```bash
npm test
```

## API 端点

### GET /tasks
获取所有任务

**响应示例：**
```json
[
  {
    "id": 1,
    "title": "任务标题",
    "description": "任务描述",
    "completed": 0
  }
]
```

### POST /tasks
创建新任务

**请求体：**
```json
{
  "title": "任务标题",
  "description": "任务描述"
}
```

**响应示例：**
```json
{
  "id": 1,
  "title": "任务标题",
  "description": "任务描述",
  "completed": 0
}
```

### GET /tasks/:id
获取单个任务

**响应示例：**
```json
{
  "id": 1,
  "title": "任务标题",
  "description": "任务描述",
  "completed": 0
}
```

### PATCH /tasks/:id
标记任务为完成

**响应示例：**
```json
{
  "success": true
}
```

### DELETE /tasks/:id
删除任务

**响应示例：**
```json
{
  "success": true
}
```

## 技术栈

- **后端：** Node.js, Express, SQLite (better-sqlite3)
- **前端：** React
- **测试：** Jest, Supertest
