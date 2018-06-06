<?php

$text = "AFRIKAANS – dankie
ALBANIAN – faleminderit
ARABIC – shukran
ARMENIAN – norakaloutioun
BOSNIAN – hvala (HVAH-lah)
BULGARIAN – благодаря
CATALAN – gràcies
CANTONESE – M̀h’gōi
CROATIAN – hvala
CZECH – děkuji
DANISH – tak
DUTCH – dank u
ESTONIAN – tänan
FINNISH – kiitos
FRENCH – merci
GERMAN – danke
GREEK – ευχαριστώ
HAWAIIAN – mahalo (ma-HA-lo)
HEBREW – .תודה   todah (toh-DAH)
HINDI – dhanyavād  shukriya
HUNGARIAN – köszönöm (KØ-sø-nøm)
ICELANDIC – takk (tahk)
INDONESIAN – terima kasih. (tuh-REE-mah KAH-see)
ITALIAN – grazie (GRAHT-tsyeh)
JAPANESE – arigatô (ah-ree-GAH-toh)
KOREAN – 감사합니다 (gamsahamnida)
LATVIAN – paldies (PUHL-dyehs)
LEBANESE – choukrane
LITHUANIAN – ačiū (AH-choo)
MACEDONIAN – Благодарам  blagodaram (blah-GOH-dah-rahm)
MALAY – terima kasih (TREE-muh KAH-seh)
MALTESE – grazzi (GRUTS-ee)
MANDARIN – Xièxiè
MONGOLIAN – Баярлалаа (bayarlalaa)
NORWEGIAN – takk
POLISH – dziękuję (Jenkoo-yen)
PORTUGUESE – obrigado
ROMANIAN – mulţumesc (mool-tzoo-MESK)
RUSSIAN – спасибо (spuh-SEE-buh)
SERBIAN – xвала  hvala (HVAH-lah)
SLOVAK – Ďakujem (JAH-koo-yehm)
SLOVENIAN – hvala (HVAA-lah)
SPANISH – gracias (GRAH-syahs)
SWEDISH – tack
TAMIL – nandri
THAI – kop khun
TURKISH – teşekkür ederim (teh shek uer eh der eem)
UKRAINIAN – Дякую (DYAH-koo-yoo)
WELSH – diolch (DEE-ol’ch)
YIDDISH – a dank
ZULU – ngiyabonga";

$exp_1 = explode("\n", $text);

$final_array = array();

foreach($exp_1 as $lang) {
    $exp_2 = explode(" – ", $lang);
    $final_array []= $exp_2;
}

$html = "";
$js = "";

foreach($final_array as $lng) {
    $html .= "<option value=\"".$lng[0]."\">".$lng[0]."</option>\n";
    $js .= '"'.$lng[0].'": "'.$lng[1].'",';
}

var_dump($html);
var_dump($js);
