# Ortak dizi müziği + anlatıcı yerleşimi (Bölüm 1-4)
import json, os, subprocess
M = "/home/claude/muzik/"

def mus(vlen, ET, END, peaks):
    """peaks: [(start, dur)] aksiyon bölgeleri. Geri kalan her yer sakin fon; sonunda final."""
    out = []; t = 0.0; endt = vlen - ET - 1.0
    for s, d in sorted(peaks):
        if s - t > 2.0:
            out.append((M + "sakin.wav", max(t - 1.0, 0), 0.30, min(s - t + 2.0, 88)))
        out.append((M + "yukselis.wav", max(s - 4.5, 0), 0.18, 5.5))
        out.append((M + "aksiyon.wav", s, 0.34, min(d, 70)))
        t = s + d
    if endt - t > 2.0:
        out.append((M + "sakin.wav", max(t - 1.0, 0), 0.30, min(endt - t + 2.0, 88)))
    out.append((M + "sakin.wav", endt - 2.0, 0.32, END + 4.0))
    out.append((M + "final.wav", endt - 1.0, 0.55, END + 2.0))
    return out

def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)

def nar(ep):
    p = f"/home/claude/nar_{ep}.json"
    return [(x[0],x[1]) for x in json.load(open(p))] if os.path.exists(p) else []
