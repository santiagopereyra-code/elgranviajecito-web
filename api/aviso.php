<?php
// Aviso por Telegram de los formularios de la web (pie, consultas, reservas, chat).
// Token y chat en egv-privado/telegram.php (carpeta bloqueada): return ['tg_token'=>'...','tg_chat'=>'...'];
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
$orig = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($orig !== '' && !preg_match('#^https://(www\.)?elgranviajecito\.com(/|$)#', $orig)) { http_response_code(403); echo '{"ok":false}'; exit; }

$DIR = dirname(__DIR__) . '/egv-privado';
$tg = @include $DIR . '/telegram.php';
if (!is_array($tg) || empty($tg['tg_token']) || empty($tg['tg_chat'])) { echo '{"ok":false,"error":"sin_config"}'; exit; }

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) { http_response_code(400); echo '{"ok":false}'; exit; }
if (!empty($in['web'])) { echo '{"ok":true}'; exit; }   // trampa para bots

// límite: 10 avisos por IP por hora
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (!is_dir($DIR)) @mkdir($DIR, 0750, true);
$rl = $DIR . '/rla_' . md5($ip . date('YmdH'));
$n = (int)@file_get_contents($rl);
if ($n >= 10) { http_response_code(429); echo '{"ok":false}'; exit; }
@file_put_contents($rl, $n + 1);

$clean = function ($v, $max) { $v = trim(strip_tags((string)$v)); return mb_substr($v, 0, $max); };
$tipos = ['nl' => '📩 Avisame de nuevas salidas', 'consulta' => '💬 Consulta web', 'reserva' => '✈️ Pedido de reserva', 'chat' => '🤖 Lead del chat'];
$tipo = $tipos[$in['tipo'] ?? ''] ?? '📝 Formulario web';
$txt = $tipo . "\n";
$wa = '';
foreach ((array)($in['datos'] ?? []) as $k => $v) {
  $k = $clean($k, 30); $v = $clean($v, $k === 'Conversacion' ? 1500 : 400);
  if ($k === '' || $v === '') continue;
  $txt .= "\n$k: $v";
  if ($wa === '' && preg_match('/whats|^wa$|tel/i', $k)) $wa = preg_replace('/\D/', '', $v);
}
if (strlen($wa) >= 7) $txt .= "\n\nWhatsApp directo: https://wa.me/$wa";
$txt = mb_substr($txt, 0, 3900);

$ctx = stream_context_create(['http' => ['method' => 'POST', 'timeout' => 8, 'header' => "Content-Type: application/json\r\n",
  'content' => json_encode(['chat_id' => $tg['tg_chat'], 'text' => $txt, 'disable_web_page_preview' => true])]]);
$r = @file_get_contents('https://api.telegram.org/bot' . $tg['tg_token'] . '/sendMessage', false, $ctx);
echo ($r && strpos($r, '"ok":true') !== false) ? '{"ok":true}' : '{"ok":false,"error":"telegram"}';
