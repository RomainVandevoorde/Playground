// let url = window.location.href;
// console.log(url);
// let url_obj = new URL(url);
// console.log(url_obj);

let url = new URL(window.location.href);
let params = new URLSearchParams(url.search.slice(1));

let keys = [];
let values = [];

for(let pair of params.entries()) {
  console.log(pair[0]+ ': '+ pair[1]);
  // keys.push(pair[0]);
  // values.push(pair[1]);
  switch (pair[0]) {
    case "bg":
      console.log("Background defined: "+pair[1]);
      break;
    case "lng":
      console.log("Language defined: "+pair[1]);
      break;
    default:
      console.log("Huh ?");
  }
}

let assocLangues = {"AFRIKAANS": "dankie","ALBANIAN": "faleminderit","ARABIC": "shukran","ARMENIAN": "norakaloutioun","BOSNIAN": "hvala (HVAH-lah)","BULGARIAN": "благодаря","CATALAN": "gràcies","CANTONESE": "M̀h’gōi","CROATIAN": "hvala","CZECH": "děkuji","DANISH": "tak","DUTCH": "dank u","ESTONIAN": "tänan","FINNISH": "kiitos","FRENCH": "merci","GERMAN": "danke","GREEK": "ευχαριστώ","HAWAIIAN": "mahalo (ma-HA-lo)","HEBREW": ".תודה todah (toh-DAH)","HINDI": "dhanyavād shukriya","HUNGARIAN": "köszönöm (KØ-sø-nøm)","ICELANDIC": "takk (tahk)",
"INDONESIAN": "terima kasih. (tuh-REE-mah KAH-see)","ITALIAN": "grazie (GRAHT-tsyeh)","JAPANESE": "arigatô (ah-ree-GAH-toh)","KOREAN": "감사합니다 (gamsahamnida)","LATVIAN": "paldies (PUHL-dyehs)","LEBANESE": "choukrane","LITHUANIAN": "ačiū (AH-choo)","MACEDONIAN": "Благодарам blagodaram (blah-GOH-dah-rahm)","MALAY": "terima kasih (TREE-muh KAH-seh)","MALTESE": "grazzi (GRUTS-ee)","MANDARIN": "Xièxiè","MONGOLIAN": "Баярлалаа (bayarlalaa)","NORWEGIAN": "takk","POLISH": "dziękuję (Jenkoo-yen) ","PORTUGUESE": "obrigado","ROMANIAN": "mulţumesc (mool-tzoo-MESK)","RUSSIAN": "спасибо (spuh-SEE-buh)","SERBIAN": "xвала hvala (HVAH-lah)","SLOVAK": "Ďakujem (JAH-koo-yehm)","SLOVENIAN": "hvala (HVAA-lah)","SPANISH": "gracias (GRAH-syahs)","SWEDISH": "tack","TAMIL": "nandri","THAI": "kop khun","TURKISH": "teşekkür ederim (teh shek uer eh der eem)","UKRAINIAN": "Дякую (DYAH-koo-yoo)","WELSH": "diolch (DEE-ol’ch)","YIDDISH": "a dank","ZULU": "ngiyabonga"}

// console.log(assocLangues);
window.onload = () => {

  const lngSelect = document.getElementById('select-lng');
  const bgColor = document.getElementById('bg-color');
  const bgRange = document.getElementById('bg-alpha');
  const textColor = document.getElementById('text-color');

  const display = document.getElementsByTagName('h1')[0];
  const form = document.getElementsByTagName('form')[0];

  lngSelect.addEventListener('change', function(e) {
    console.log(lngSelect.value);
    display.innerHTML = assocLangues[lngSelect.value];
  });

  bgColor.addEventListener('change', function(e) {
    document.body.style.backgroundColor = bgColor.value;
  });

  textColor.addEventListener('change', function() {
    display.style.color = textColor.value;
  });

  bgRange.addEventListener('change', function() {
    console.log(bgRange.value/100);
  });

  document.addEventListener('keyup', function(e) {
    console.log(e);
    if(e.key === "m" && form.style.display !== "none") form.style.display = "none";
    else form.style.display = "block";
  });




}
