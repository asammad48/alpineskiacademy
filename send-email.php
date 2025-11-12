<?php
/**
 * Contact Form Email Handler
 * Sends form data to reservas@alpineskiacademy.com
 */

// Enable error reporting for debugging (comment out in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response headers
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? htmlspecialchars($_POST['telefono']) : 'No proporcionado';
$fecha = isset($_POST['fecha']) ? htmlspecialchars($_POST['fecha']) : 'No especificada';
$tipoClase = isset($_POST['tipoClase']) ? htmlspecialchars($_POST['tipoClase']) : 'No especificado';
$nivel = isset($_POST['nivel']) ? htmlspecialchars($_POST['nivel']) : 'No especificado';
$personas = isset($_POST['personas']) ? htmlspecialchars($_POST['personas']) : '1';
$mensaje = isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : 'Sin mensaje adicional';

// Validate required fields
if (empty($nombre) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Por favor, completa los campos obligatorios (Nombre y Email).']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Por favor, ingresa un email válido.']);
    exit;
}

// Email configuration
$to = 'reservas@alpineskiacademy.com';
$subject = "Nueva Consulta de Clases - $nombre";
$headers = "From: noreply@alpineskiacademy.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Priority: 3\r\n";

// Format email body (escaped for security)
$nombreSafe = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$emailSafe = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$telefonoSafe = htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8');
$fechaSafe = htmlspecialchars($fecha, ENT_QUOTES, 'UTF-8');
$tipoClaseSafe = htmlspecialchars($tipoClase, ENT_QUOTES, 'UTF-8');
$nivelSafe = htmlspecialchars($nivel, ENT_QUOTES, 'UTF-8');
$personasSafe = htmlspecialchars($personas, ENT_QUOTES, 'UTF-8');
$mensajeSafe = nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'));
$dateNow = date('d/m/Y H:i:s');

$emailBody = <<<EMAIL
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2a5298; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8f9fa; padding: 20px; }
        .section { margin-bottom: 20px; padding: 15px; background-color: white; border-left: 4px solid #2a5298; }
        .label { font-weight: bold; color: #2a5298; }
        .footer { margin-top: 20px; padding: 20px; background-color: #f1f1f1; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nueva Consulta de Clases</h2>
        </div>
        <div class='content'>
            <div class='section'>
                <h3>👤 Información de Contacto</h3>
                <p><span class='label'>Nombre:</span> $nombreSafe</p>
                <p><span class='label'>Email:</span> $emailSafe</p>
                <p><span class='label'>Teléfono:</span> $telefonoSafe</p>
            </div>
            <div class='section'>
                <h3>🎿 Detalles de la Clase</h3>
                <p><span class='label'>Fecha Deseada:</span> $fechaSafe</p>
                <p><span class='label'>Tipo de Clase:</span> $tipoClaseSafe</p>
                <p><span class='label'>Nivel:</span> $nivelSafe</p>
                <p><span class='label'>Número de Personas:</span> $personasSafe</p>
            </div>
            <div class='section'>
                <h3>💬 Mensaje</h3>
                <p>$mensajeSafe</p>
            </div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de Alpine Ski Academy.</p>
            <p>Fecha de envío: $dateNow</p>
        </div>
    </div>
</body>
</html>
EMAIL;

// Send email
$mailSent = mail($to, $subject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Consulta enviada con éxito!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Hubo un problema al enviar tu consulta. Por favor, intenta nuevamente.']);
}
?>

