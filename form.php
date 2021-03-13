<?php

if( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
  die;
}

// Sanitize form fields
$name = filter_var( $_POST['name'], FILTER_SANITIZE_STRING );
$email = filter_var( $_POST['email'], FILTER_SANITIZE_EMAIL );
$message = nl2br( trim( htmlentities( $_POST['message'], ENT_QUOTES, 'UTF-8' ) ) );
$message = preg_replace( "/(<br>\s*|<br \/>\s*){3,}/i", "<br>\n<br>\n", $message );

// Check empty form fields
if( ! $name || ! $email || ! $message ) {
  die( 'incomplete' );
}

// Validate email
if( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
  die( 'invalid_email' );
}

// Headers
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From:  Sebastian Honert <hello@sebastianhonert.com>' . " \r\n" .
            'Reply-To: hello@sebastianhonert.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

// Signature
$signature = "\r\n" . '<p>--<br>';
$signature .= 'Dr. Sebastian Honert<br>';
$signature .= 'Lutzstraße 58<br>';
$signature .= 'D-86157 Augsburg<br>';
$signature .= '+49 (0) 179 9739851<br>';
$signature .= '<a href="mailto:hello@sebastianhonert.com">hello@sebastianhonert.com</a></p>';

// Send emails
$mail = '<p>Hallo ' . $name . ',</p>';
$mail .= '<p>vielen Dank für Ihre Nachricht. Ich habe Ihre Anfrage erhalten und werde mich zeitnah bei Ihnen melden.</p>';
$mail .= '<p><strong>Ihr Name:</strong></p><p>' . $name . '</p>';
$mail .= '<strong>Ihre E-Mail-Adresse:</strong></p><p>' . $email . '</p>';
$mail .= '<p><strong>Ihre Nachricht:</strong></p><p>' . $message . '</p>';
$mail .= $signature;

mail( $email, 'Ihre Anfrage', $mail, $headers );
mail( 'hello@sebastianhonert.com', 'Neue Anfrage', $mail, $headers );

// Response
$html = '<h2>Vielen Dank für Ihre Nachricht.</h2>';
$html .= '<p>Ich habe Ihre Anfrage erhalten und werde mich zeitnah bei Ihnen melden.</p>';
$html .= '<p class="less-margin"><strong>Name</strong></p><p>' . $name . '</p>';
$html .= '<p class="less-margin"><strong>E-Mail-Adresse</strong></p><p>' . $email . '</p>';
$html .= '<p class="less-margin"><strong>Nachricht</strong></p><p class="last">' . $message . '</p>';

echo $html;

die;
