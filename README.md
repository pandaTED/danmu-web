# 实时弹幕墙

本项目基于 Next.js + Pusher 实现实时弹幕功能，支持弹幕1分钟自动消失，输入限制140字。

## 本地开发

1. 安装依赖
   ```bash
   npm install
   ```
2. 配置环境变量，复制 `.env.local` 并填写你的 Pusher 信息
Pusher的信息从 https://pusher.com/ 获取

3. 启动开发环境
   ```bash
   npm run dev
   ```

## 部署到 Vercel

1. 推送代码到 GitHub/GitLab
2. 在 [Vercel](https://vercel.com/) 新建项目，导入代码仓库
3. 在 Vercel 项目设置中配置环境变量（同 `.env.local`）
4. 一键部署即可

## 主要技术
- Next.js
- Pusher (Serverless 实时推送)

## 目录结构
- `pages/index.js`：主页面
- `pages/api/danmu.js`：弹幕API
- `components/DanmuList.js`：弹幕展示组件
- `utils/pusher.js`：Pusher服务端工具 
