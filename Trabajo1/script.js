document.addEventListener('DOMContentLoaded', () => {
    // Mostrar/Ocultar cookies
    const cookiesDialog = document.getElementById('cookies-dialog');
    if (!localStorage.getItem('cookiesAccepted')) {
        cookiesDialog.showModal();
    }
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', true);
        cookiesDialog.close();
    });

    // Función para inicializar P5.js
    new p5((p) => {
        let canvas;

        p.setup = () => {
            canvas = p.createCanvas(600, 400);
            canvas.parent('canvas-holder');
        };

        p.draw = () => {
            p.background(220);
            p.fill(0);
            p.ellipse(p.mouseX, p.mouseY, 50, 50);
        };
    });

    // Crear cards dinámicamente
    const products = [
        { title: 'Iphone 16 Pro', description: 'Titanio Negro, 256 GB, 5G, 6.3 pulgadas', image: 'descarga.jpeg' },
        { title: 'KTM 300 TPI', description: 'Moto enduro', image: 'descarga2.jpg' },
    ];

    const template = document.getElementById('card-template').content;
    const cardGrid = document.querySelector('.card-grid');

    products.forEach(product => {
        const clone = document.importNode(template, true);
        clone.querySelector('.product-image').src = product.image;
        clone.querySelector('.product-title').textContent = product.title;
        clone.querySelector('.product-description').textContent = product.description;
        cardGrid.appendChild(clone);
    });
});

// Mostrar/Ocultar contraseña
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

// Registrar usuario
document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const birthYear = document.getElementById("birth-year").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection("users").doc(user.uid).set({
            name,
            email,
            address,
            birthYear,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Registro exitoso.");
        window.location.href = "login.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Login
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection("logins").add({
            uid: user.uid,
            email: user.email,
            loginAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Inicio de sesión exitoso.");
        window.location.href = "index.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});