
let assocLangues = {"AFRIKAANS": "dankie","ALBANIAN": "faleminderit","ARABIC": "shukran","ARMENIAN": "norakaloutioun","BOSNIAN": "hvala","BULGARIAN": "благодаря","CATALAN": "gràcies","CANTONESE": "M̀h’gōi","CROATIAN": "hvala","CZECH": "děkuji","DANISH": "tak","DUTCH": "dank u","ESTONIAN": "tänan","FINNISH": "kiitos","FRENCH": "merci","GERMAN": "danke","GREEK": "ευχαριστώ","HAWAIIAN": "mahalo","HEBREW": ".תודה ","HINDI": "dhanyavād shukriya","HUNGARIAN": "köszönöm ","ICELANDIC": "takk","INDONESIAN": "terima kasih","ITALIAN": "grazie","JAPANESE": "arigatô","KOREAN": "감사합니다 ","LATVIAN": "paldies ","LEBANESE": "choukrane","LITHUANIAN": "ačiū","MACEDONIAN": "Благодарам","MALAY": "terima kasih","MALTESE": "grazzi","MANDARIN": "Xièxiè","MONGOLIAN": "Баярлалаа","NORWEGIAN": "takk","POLISH": "dziękuję","PORTUGUESE": "obrigado","ROMANIAN": "mulţumesc","RUSSIAN": "спасибо","SERBIAN": "xвала","SLOVAK": "Ďakujem","SLOVENIAN": "hvala","SPANISH": "gracias","SWEDISH": "tack","TAMIL": "nandri","THAI": "kop khun","TURKISH": "teşekkür ederim","UKRAINIAN": "Дякую","WELSH": "diolch","YIDDISH": "a dank","ZULU": "ngiyabonga", "KINYARWANDA": "Murakoze"};
// console.log(assocLangues);
window.onload = () => {

  const lngSelect = document.getElementById('select-lng');
  const bgColor = document.getElementById('bg-color');
  const textColor = document.getElementById('text-color');

  const display = document.getElementsByTagName('h1')[0];
  const form = document.getElementsByTagName('form')[0];


  var select = document.getElementById("font");
  // var options = select.querySelector("option");
  var optionsTwo = select.querySelectorAll("option");
  var test = Array.from(optionsTwo);

  select.addEventListener("change", function() {
      var valeur = this.value;
      console.log(valeur, this)
      addingClass(display,valeur);
      console.log(display)
  });

  function addingClass(el,name){
    el.className = name;
  }


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

  document.addEventListener('keyup', function(e) {
    console.log(e);
    if(e.key === "m" && form.style.display !== "none") form.style.display = "none";
    else form.style.display = "block";
  });




}
