/**
 * Contact Form Handler
 * Submits form data to reservas@alpineskiacademy.com via Formspree
 */

(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    });

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || 'No proporcionado',
            fecha: document.getElementById('fecha').value || 'No especificada',
            tipoClase: document.getElementById('tipoClase').value || 'No especificado',
            nivel: document.getElementById('nivel').value || 'No especificado',
            personas: document.getElementById('personas').value,
            mensaje: document.getElementById('mensaje').value || 'Sin mensaje adicional'
        };

        // Validate required fields
        if (!formData.nombre || !formData.email) {
            showAlert('error', 'Por favor, completa los campos obligatorios (Nombre y Email).');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';

        // Send form data to PHP script
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('telefono', formData.telefono);
        formDataToSend.append('fecha', formData.fecha);
        formDataToSend.append('tipoClase', formData.tipoClase);
        formDataToSend.append('nivel', formData.nivel);
        formDataToSend.append('personas', formData.personas);
        formDataToSend.append('mensaje', formData.mensaje);
        
        fetch('send-email.php', {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => {
            // Check if response is ok
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            // Try to parse JSON
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    console.error('Response text:', text);
                    throw new Error('Respuesta inválida del servidor. Verifica que PHP esté funcionando correctamente.');
                }
            });
        })
        .then(data => {
            if (data && data.success) {
                // Show success message
                showAlert('success', '¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto. Gracias por contactarnos.');
                resetForm(contactForm);
            } else {
                throw new Error(data && data.error ? data.error : 'Error en el envío');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            // Show error message
            showAlert('error', error.message || 'Hubo un problema al enviar tu consulta. Por favor, intenta nuevamente o contáctanos por WhatsApp al +34 669 911 342.');
        })
        .finally(() => {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    }

    function formatEmailBody(data) {
        return `Nueva Consulta de Clases de Esquí/Snowboard

--- INFORMACIÓN DE CONTACTO ---
Nombre: ${data.nombre}
Email: ${data.email}
Teléfono: ${data.telefono}

--- DETALLES DE LA CLASE ---
Fecha Deseada: ${data.fecha}
Tipo de Clase: ${data.tipoClase}
Nivel: ${data.nivel}
Número de Personas: ${data.personas}

--- MENSAJE ---
${data.mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de Alpine Ski Academy.
Fecha de envío: ${new Date().toLocaleString('es-ES')}`;
    }

    function resetForm(form) {
        form.reset();
    }

    function showAlert(type, message) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.contact-form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-dismissible fade show contact-form-alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`;
        alertDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert alert before the form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alertDiv, form);

        // Auto-remove alert after 5 seconds
        setTimeout(function() {
            alertDiv.remove();
        }, 5000);
    }

})();

