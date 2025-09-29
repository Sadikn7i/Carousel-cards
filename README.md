# Interactive Web Carousel with 3D Animated Background

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

A visually stunning, responsive card carousel layered on top of a dynamic, high-performance `three.js` animated background. This project showcases modern web technologies to create an immersive and interactive user experience.
![Carousel Screenshot](https://raw.githubusercontent.com/Sadikn7i/Carousel-cards/master/pic.png)
---

## ✨ Features

* **Interactive Card Carousel:** A smooth, horizontally scrolling carousel to display content.
* **Advanced `three.js` Background:** A beautiful, generative background animation featuring thousands of rotating 3D objects.
* **High Performance:** Uses `InstancedMesh` for efficient rendering of a large number of objects, ensuring the animation runs smoothly.
* **Modern UI:** A clean interface with a frosted-glass effect (`backdrop-filter`) on the carousel cards, allowing the background animation to be subtly visible.
* **Responsive Design:** The layout is designed to be functional and visually appealing on different screen sizes.

---

## 🛠️ Tech Stack

This project was built using the following technologies:

* **HTML5:** For the core structure of the web page.
* **CSS3:** For styling the carousel, cards, and layout. Uses modern features like Flexbox and CSS Variables.
* **JavaScript (ES6 Modules):** For all the interactivity, including the carousel logic and the `three.js` animation.
* **[Three.js](https://threejs.org/):** A powerful 3D graphics library for creating and displaying the animated background.

---

## 🚀 Setup and Installation

To run this project on your local machine, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```

3.  **Run with a local server:**
    This project uses ES6 modules, which require a server to run correctly due to CORS policy. The easiest way to do this is with the **Live Server** extension in Visual Studio Code.
    * Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
    * Right-click on the `index.html` file.
    * Select **"Open with Live Server"**.

    The project will automatically open in your default web browser.

---

## 🎨 Customization

You can easily customize the background animation by changing the values in the `script.js` file:

```javascript
// --- Settings for three.js ---
const OBJECT_COUNT_PER_TYPE = 2000; // Change the number of objects per shape
const DYNAMIC_COUNT_PER_TYPE = 500;  // Change how many objects are actively rotating
