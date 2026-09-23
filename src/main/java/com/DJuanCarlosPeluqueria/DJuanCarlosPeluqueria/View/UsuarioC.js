const API_URL = "http://localhost:8080/api/usuarios";

async function crearUsuario(event) {
    if (event) event.preventDefault();

    const tipoDocumento = document.getElementById("TipoDocumento").value;
    const numDocumento = Number(document.getElementById("numDocumento").value);
    const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const telefono = Number(document.getElementById("telefono").value);
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const contrasenia = document.getElementById("contrasenia").value.trim();
    const genero = document.getElementById("genero").value;
    const idRolFK = Number(document.getElementById("idRolFK").value);

    const estado = document.getElementById("estado").value || "Activo";
    const cargo = document.getElementById("cargo").value || "Cliente";

    if (!numDocumento || !nombreCompleto || !email || !contrasenia || !idRolFK) {
        alert("Por favor complete todos los campos obligatorios.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tipoDocumento: tipoDocumento,
                numDocumento: numDocumento,
                nombreCompleto: nombreCompleto,
                telefono: telefono,
                email: email,
                direccion: direccion,
                contrasenia: contrasenia,
                genero: genero,
                cargo: cargo,
                estado: estado,
                idRolFK: idRolFK
            })
        });

        if (response.ok) {
            alert("Usuario creado correctamente");
            document.getElementById("userForm").reset();

            // Si existe la función de consultar la ejecuta, de lo contrario redirige al listado
            if (typeof consultarUsuarios === "function") {
                consultarUsuarios();
            } else {
                window.location.href = "ListadoU.html";
            }
        } else {
            alert("Error al guardar el usuario. Verifique los datos ingresados.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor Spring Boot");
    }
}

/* Lógica del Sidebar y Menú Lateral */
const menusItemsDropDown = document.querySelectorAll('.menu-item-dropdown');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const menusitemsStactic = document.querySelectorAll('.menu-item-static');
const sidebarBtn = document.getElementById('sidebar-btn');

if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-hidden');
    });
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('minimize');
    });
}

menusItemsDropDown.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        const subMenu = menuItem.querySelector('.sub-menu');
        const isActive = menuItem.classList.toggle('sub-menu-toggle');
        if (subMenu) {
            if (isActive) {
                subMenu.style.height = `${subMenu.scrollHeight + 20}px`;
                subMenu.style.padding = '0.2rem 0';
            } else {
                subMenu.style.height = '0';
                subMenu.style.padding = '0';
            }
        }
        menusItemsDropDown.forEach((item) => {
            if (item !== menuItem) {
                const otherSubmenu = item.querySelector('.sub-menu');
                if (otherSubmenu) {
                    item.classList.remove('sub-menu-toggle');
                    otherSubmenu.style.height = "0";
                    otherSubmenu.style.padding = "0";
                }
            }
        });
    });
});

menusitemsStactic.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('minimize')) return;

        menusItemsDropDown.forEach((item) => {
            const otherSubmenu = item.querySelector('.sub-menu');
            if (otherSubmenu) {
                item.classList.remove('sub-menu-toggle');
                otherSubmenu.style.height = "0";
                otherSubmenu.style.padding = "0";
            }
        });
    });
});

function checkWindowsSize() {
    if (sidebar) {
        sidebar.classList.remove('minimize');
    }
}
checkWindowsSize();

// Lógica para mostrar/ocultar el panel de "Modo de Uso"
document.addEventListener("DOMContentLoaded", () => {
    const btnInstrucciones = document.getElementById("btnInstrucciones");
    const contenidoInstrucciones = document.getElementById("contenidoInstrucciones");
    const iconoFlecha = document.getElementById("iconoFlecha");

    if (btnInstrucciones && contenidoInstrucciones) {
        btnInstrucciones.addEventListener("click", () => {
            // Alterna la clase 'abierto' en el contenedor del contenido
            contenidoInstrucciones.classList.toggle("abierto");

            // Rota la flecha según el estado
            if (iconoFlecha) {
                iconoFlecha.classList.toggle("rotar");
            }
        });
    }
});