# 📘 Backend NodeJS Second Semester Examination Project

## 📰 Blogging API

### 📌 Question

You are required to build a blogging API. The general idea is that the API has a public endpoint that shows a list of articles created by different users. Anyone accessing this endpoint should be able to read any published blog, whether created by them or others.

---

### ✅ Requirements

#### 🔐 User Authentication

- Users should have:
  - `first_name`
  - `last_name`
  - `email`
  - `password`
  - _(You may add other relevant fields)_
- Users should be able to **sign up** and **sign in**.
- Use **JWT** as the authentication strategy.
  - Token should **expire after 1 hour**.

#### 📝 Blog Functionality

- A blog can exist in two states:
  - `draft`
  - `published`
- **Public access (logged in or not)**:
  - View a **paginated list of published blogs**.
  - View a **single published blog**.
- **Logged-in users**:
  - Can **create a blog** (defaults to `draft` state).
  - Can **update the blog's state** to `published`.
  - Can **edit** their blog (in both `draft` and `published` states).
  - Can **delete** their blog (in both `draft` and `published` states).
  - Can **get a list of their own blogs**.

#### 📄 Blog Data Model

Each blog should contain:

- `title`
- `description`
- `tags`
- `author`
- `timestamp`
- `state` (`draft` or `published`)
- `read_count`
- `reading_time`
- `body`

#### 📚 Blog List Endpoint

- Should be:
  - **Paginated** (default: 20 blogs per page)
  - **Filterable** by `state`
  - **Searchable** by `author`, `title`, and `tags`
  - **Orderable** by `read_count`, `reading_time`, and `timestamp`

#### 📊 Blog Details

- When a **single blog** is requested:
  - Return the blog along with **user (author) information**
  - **Increment** the blog's `read_count` by 1
- Implement an algorithm to calculate the `reading_time` of a blog.

---

### 🧪 Testing

- Write tests for **all endpoints**.

---

### 🧱 Architecture

- Follow the **MVC pattern**

---

### 🗄️ Database

- Use **MongoDB**

---

### 🧬 Data Models

#### 🧑‍💻 User

- `email` (required, **unique**)
- `first_name` (required)
- `last_name` (required)
- `password`

#### 📰 Blog / Article

- `title` (required, **unique**)
- `description`
- `author`
- `state`
- `read_count`
- `reading_time`
- `tags`
- `body` (required)
- `timestamp`

---

### 📤 Submission

- Push your code to **GitHub**
- Host your app on **PipeOps**, **Heroku**, or **Render**
- Share the **PipeOps/Heroku link** and the **GitHub repository link** using the  
  **AltSchool of Engineering Tinyuka Second Semester Project Submission (Node.js)** form

---

### 🔗 Helpful Links

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

**Best of luck! 💪**
