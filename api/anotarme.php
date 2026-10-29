<?php
// Lista de espera viajecitos 2027: guarda el anotado, avisa por mail a contacto@ y por WhatsApp al número de El Gran Viajecito.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$cfg = @include dirname(__DIR__) . '/egv-privado/config.php';   // carpeta bloqueada por .htaccess
if (!is_array($cfg)) $cfg = [];
$MAIL_TO   = $cfg['mail_to']   ?? 'contacto@elgranviajecito.com';
$WA_PHONE  = $cfg['wa_phone']  ?? '';   // ej. 59899244227
$WA_APIKEY = $cfg['wa_apikey'] ?? '';   // apikey de CallMeBot
$DATA_DIR  = dirname(__DIR__) . '/egv-privado';

$in = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$clean = function ($v, $max) { $v = trim(strip_tags((string)$v)); $v = preg_replace('/[\r\n\t]+/', ' ', $v); return mb_substr($v, 0, $max); };
$nombre = $clean($in['nombre'] ?? '', 80);
$pais   = $clean($in['pais'] ?? '', 40);
$wa     = $clean($in['whatsapp'] ?? '', 30);
$mail   = $clean($in['mail'] ?? '', 120);
$trampa = $clean($in['web'] ?? '', 50);

if ($trampa !== '') { echo '{"ok":true}'; exit; }            // bot: se descarta en silencio
if ($nombre === '' || $pais === '' || !preg_match('/^[+0-9 ()-]{7,}$/', $wa) || !filter_var($mail, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); echo '{"ok":false,"error":"datos"}'; exit;
}

// límite simple: 5 envíos por IP por hora
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (!is_dir($DATA_DIR)) @mkdir($DATA_DIR, 0750, true);
$rl = $DATA_DIR . '/rl_' . md5($ip . date('YmdH'));
$n = (int)@file_get_contents($rl);
if ($n >= 5) { http_response_code(429); echo '{"ok":false}'; exit; }
@file_put_contents($rl, $n + 1);

$fecha = (new DateTime('now', new DateTimeZone('America/Montevideo')))->format('Y-m-d H:i');

// 1) planilla CSV (se abre con Excel / Google Sheets)
$csv = $DATA_DIR . '/anotados-2027.csv';
$nuevo = !file_exists($csv);
if ($fh = @fopen($csv, 'a')) {
  if ($nuevo) { fwrite($fh, "\xEF\xBB\xBF"); fputcsv($fh, ['Fecha', 'Nombre', 'País', 'WhatsApp', 'Mail']); }
  fputcsv($fh, [$fecha, $nombre, $pais, $wa, $mail]);
  fclose($fh);
}

// 2) mail a contacto@
$asunto = '=?UTF-8?B?' . base64_encode('Nuevo anotado viajecitos 2027 · ' . $nombre) . '?=';
$cuerpo = "Se anotó alguien en la pantalla de entrada de elgranviajecito.com\n\n"
        . "Nombre: $nombre\nPaís: $pais\nWhatsApp: $wa\nMail: $mail\nFecha: $fecha\n\n"
        . "WhatsApp directo: https://wa.me/" . preg_replace('/\D/', '', $wa) . "\n";
$headers = "From: El Gran Viajecito <contacto@elgranviajecito.com>\r\nReply-To: $mail\r\nContent-Type: text/plain; charset=UTF-8\r\n";
@mail($MAIL_TO, $asunto, $cuerpo, $headers, '-fcontacto@elgranviajecito.com');

// 3) WhatsApp al número de El Gran Viajecito (CallMeBot)
if ($WA_PHONE !== '' && $WA_APIKEY !== '') {
  $txt = "🌍 Nuevo anotado viajecitos 2027\n$nombre ($pais)\nWhatsApp: $wa\nMail: $mail\nhttps://wa.me/" . preg_replace('/\D/', '', $wa);
  $url = 'https://api.callmebot.com/whatsapp.php?phone=' . urlencode($WA_PHONE) . '&text=' . urlencode($txt) . '&apikey=' . urlencode($WA_APIKEY);
  $ctx = stream_context_create(['http' => ['timeout' => 8]]);
  @file_get_contents($url, false, $ctx);
}

echo '{"ok":true}';
