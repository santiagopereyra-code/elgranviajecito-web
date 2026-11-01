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

// 2) mail a contacto@ (por SMTP con el buzón, así no cae en spam; si no hay contraseña, usa mail())
$asunto = 'Nuevo anotado viajecitos 2027 · ' . $nombre;
$cuerpo = "Se anotó alguien en la pantalla de entrada de elgranviajecito.com\n\n"
        . "Nombre: $nombre\nPaís: $pais\nWhatsApp: $wa\nMail: $mail\nFecha: $fecha\n\n"
        . "WhatsApp directo: https://wa.me/" . preg_replace('/\D/', '', $wa) . "\n";
$SMTP_USER = $cfg['smtp_user'] ?? 'contacto@elgranviajecito.com';
$SMTP_PASS = $cfg['smtp_pass'] ?? '';
$enviado = false;
if ($SMTP_PASS !== '' && $SMTP_PASS !== 'PEGAR_ACA_LA_CONTRASEÑA') {
  $enviado = egv_smtp($SMTP_USER, $SMTP_PASS, $MAIL_TO, $mail, $asunto, $cuerpo);
}
if (!$enviado) {
  $headers = "From: El Gran Viajecito <contacto@elgranviajecito.com>\r\nReply-To: $mail\r\nContent-Type: text/plain; charset=UTF-8\r\n";
  @mail($MAIL_TO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $cuerpo, $headers, '-fcontacto@elgranviajecito.com');
}

// 3) WhatsApp al número de El Gran Viajecito (CallMeBot)
if ($WA_PHONE !== '' && $WA_APIKEY !== '') {
  $txt = "🌍 Nuevo anotado viajecitos 2027\n$nombre ($pais)\nWhatsApp: $wa\nMail: $mail\nhttps://wa.me/" . preg_replace('/\D/', '', $wa);
  $url = 'https://api.callmebot.com/whatsapp.php?phone=' . urlencode($WA_PHONE) . '&text=' . urlencode($txt) . '&apikey=' . urlencode($WA_APIKEY);
  $ctx = stream_context_create(['http' => ['timeout' => 8]]);
  @file_get_contents($url, false, $ctx);
}

// 4) Telegram (token y chat en egv-privado/telegram.php)
$tg = @include $DATA_DIR . '/telegram.php';
if (is_array($tg) && !empty($tg['tg_token']) && !empty($tg['tg_chat'])) {
  $t = "🌍 Nuevo anotado viajecitos 2027\n\nNombre: $nombre\nPaís: $pais\nWhatsApp: $wa\nMail: $mail\n\nWhatsApp directo: https://wa.me/" . preg_replace('/\D/', '', $wa);
  $c = stream_context_create(['http' => ['method' => 'POST', 'timeout' => 8, 'header' => "Content-Type: application/json\r\n",
    'content' => json_encode(['chat_id' => $tg['tg_chat'], 'text' => $t, 'disable_web_page_preview' => true])]]);
  @file_get_contents('https://api.telegram.org/bot' . $tg['tg_token'] . '/sendMessage', false, $c);
}

echo '{"ok":true}';

function egv_smtp($user, $pass, $to, $replyTo, $subject, $body) {
  $fp = @stream_socket_client('ssl://smtp.hostinger.com:465', $errno, $errstr, 10);
  if (!$fp) return false;
  stream_set_timeout($fp, 10);
  $read = function () use ($fp) { $out = ''; while (($l = fgets($fp, 515)) !== false) { $out .= $l; if (isset($l[3]) && $l[3] === ' ') break; } return $out; };
  $cmd = function ($c, $ok) use ($fp, $read) { fwrite($fp, $c . "\r\n"); $r = $read(); return strpos($r, (string)$ok) === 0; };
  $read();
  $host = 'elgranviajecito.com';
  $ok = $cmd("EHLO $host", 250) && $cmd('AUTH LOGIN', 334) && $cmd(base64_encode($user), 334) && $cmd(base64_encode($pass), 235)
     && $cmd("MAIL FROM:<$user>", 250) && $cmd("RCPT TO:<$to>", 250) && $cmd('DATA', 354);
  if ($ok) {
    $h = 'Date: ' . date('r') . "\r\n"
       . 'Message-ID: <' . bin2hex(random_bytes(12)) . "@$host>\r\n"
       . "From: El Gran Viajecito <$user>\r\nTo: <$to>\r\nReply-To: <$replyTo>\r\n"
       . 'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\n"
       . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
       . chunk_split(base64_encode($body));
    $ok = $cmd($h . "\r\n.", 250);
  }
  @fwrite($fp, "QUIT\r\n"); @fclose($fp);
  return $ok;
}
