# Üretim girdilerini GitHub Actions üzerinde alır (ElevenLabs TTS + MagicLight klip indirme).
# İstek dosyaları: uretim-plan/istek/*.json
#   {"tts": [{"out": "gelen/b07/R1.mp3", "voice": "Hasan", "text": "..."}],
#    "url": [{"out": "gelen/b07/B01.mp4", "url": "https://..."}]}
# Var olan çıktı yeniden üretilmez (kredi israfı yok).
import glob, json, os, sys, time, unicodedata, urllib.request, urllib.error

API = "https://api.elevenlabs.io"
KEY = os.environ.get("ELEVENLABS_API_KEY", "")
ALIAS = {  # lines.json konuşmacı adı -> ElevenLabs ses adının başı (karakterler.md)
    "hasan": "hasan yasin", "kael": "mahmut hoca", "gozde": "gozde arikan",
    "polat": "polat gunduz", "fatih": "fatih yildirim", "dilara": "dilara",
    "gamze - young": "gamze", "zehra": "zehra", "hale": "hale", "nil": "nil",
    "irem": "irem", "celil": "celil",
}

def norm(s):
    s = s.replace("İ", "I").replace("ı", "i")
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c)).casefold().strip()

def req(path, data=None, raw=False):
    h = {"xi-api-key": KEY, "Accept": "audio/mpeg" if raw else "application/json"}
    if data is not None:
        h["Content-Type"] = "application/json"
        data = json.dumps(data).encode()
    r = urllib.request.Request(API + path, data=data, headers=h, method="POST" if data else "GET")
    with urllib.request.urlopen(r, timeout=180) as resp:
        b = resp.read()
    return b if raw else json.loads(b)

items_tts, items_url = [], []
for f in sorted(glob.glob("uretim-plan/istek/*.json")):
    j = json.load(open(f, encoding="utf-8"))
    items_tts += [x for x in j.get("tts", []) if not os.path.exists(x["out"])]
    items_url += [x for x in j.get("url", []) if not os.path.exists(x["out"])]
print("yeni tts:", len(items_tts), "yeni indirme:", len(items_url))
rapor = {"tts": [], "url": []}

if items_tts:
    if not KEY:
        sys.exit("ELEVENLABS_API_KEY gizli anahtarı yok")
    models = req("/v1/models")
    want = norm(os.environ.get("EL_MODEL", "Eleven v4"))
    mm = [m for m in models if norm(m.get("name", "")) == want]
    if len(mm) != 1:
        sys.exit("model bulunamadı: " + str([m.get("name") + "=" + m["model_id"] for m in models]))
    model = mm[0]["model_id"]
    voices = req("/v1/voices")["voices"]
    vmap = {}
    for x in items_tts:  # önce hepsini doğrula, sonra üret
        a = ALIAS.get(norm(x["voice"]), norm(x["voice"]))
        c = [v for v in voices if norm(v["name"]).startswith(a)]
        if len(c) != 1:
            sys.exit(f"ses eşleşmedi: {x['voice']} -> {[v['name'] for v in c]} / tüm: {[v['name'] for v in voices]}")
        vmap[x["voice"]] = (c[0]["voice_id"], c[0]["name"])
    print("model", model, "sesler", vmap, "karakter", sum(len(x["text"]) for x in items_tts))
    for x in items_tts:
        vid, vname = vmap[x["voice"]]
        body = {"text": x["text"], "model_id": model, "language_code": "tr",
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}}
        for attempt in range(3):
            try:
                audio = req(f"/v1/text-to-speech/{vid}?output_format=mp3_44100_128", body, raw=True)
                break
            except urllib.error.HTTPError as e:
                msg = e.read().decode(errors="replace")
                print("HATA", e.code, x["out"], msg[:300])
                if e.code == 400 and "language" in msg and "language_code" in body:
                    body.pop("language_code"); continue
                if e.code in (429, 500, 502, 503) and attempt < 2:
                    time.sleep(10); continue
                raise
        os.makedirs(os.path.dirname(x["out"]), exist_ok=True)
        open(x["out"], "wb").write(audio)
        rapor["tts"].append({"out": x["out"], "voice": vname, "model": model, "bytes": len(audio)})
        print("ok", x["out"], vname, len(audio))

for x in items_url:
    r = urllib.request.Request(x["url"], headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(r, timeout=300) as resp:
        b = resp.read()
    os.makedirs(os.path.dirname(x["out"]), exist_ok=True)
    open(x["out"], "wb").write(b)
    rapor["url"].append({"out": x["out"], "bytes": len(b)})
    print("ok", x["out"], len(b))

os.makedirs("gelen", exist_ok=True)
json.dump(rapor, open(f"gelen/rapor_{int(time.time())}.json", "w"), ensure_ascii=False, indent=1)
