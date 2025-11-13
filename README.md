# 🌿 Greenstack

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/)

Greenstack is a full-stack web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project is deployed and live at [https://greenstack.vercel.app/](https://greenstack.vercel.app/).

---

## ✨ Features

- **MERN Stack:** Utilizes MongoDB, Express.js, React.js, and Node.js.  
- **Vercel Deployment:** Easily deployable, serverless-ready, and currently live.  
- **Modular Structure:** Separation of client and server for flexibility and maintainability.  
- **RESTful API:** Well-structured backend with RESTful best practices.  
- **Responsive UI:** Modern and interactive interface built with React.  

---

## 🚀 Live Demo

🌐 **Live Site:** [https://greenstack.vercel.app/](https://greenstack.vercel.app/)

---

## ⚙️ Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Cloud or Local)

---

### 📥 Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Neeraj7275/Greenstack.git
    cd Greenstack
    ```

2. **Server Setup:**
    ```bash
    cd server
    npm install
    ```

    Create a `.env` file inside the `server` directory and add your MongoDB URI and other environment variables:
    ```
    MONGO_URI=your_mongo_uri
    PORT=5000
    ```

    Then run:
    ```bash
    npm run dev
    ```

3. **Client Setup (in a new terminal):**
    ```bash
    cd ../client
    npm install
    npm start
    ```

4. **Visit:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---


---

## 🌐 Deployment

The project is live on [Vercel](https://vercel.com/).  

### To deploy your own version:
1. Push your code to GitHub.  
2. Import your repository into **Vercel**.  
3. Add the required environment variables (e.g. `MONGO_URI` for the backend).  
4. Deploy and go live! 🎉  

> **Note:**  
> For a persistent backend server, deploy the **server** (API) separately on platforms like:
> - [Render](https://render.com/)
> - [Railway](https://railway.app/)
> - [Cyclic](https://www.cyclic.sh/)
>
> Then, update your frontend (client) to use that backend URL.

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repository.  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/YourFeature


## 📁 Folder Structure

