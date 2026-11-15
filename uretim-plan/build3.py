import subprocess,sys,json
C="c3/"
OFF={'A1':2.04,'A2':1.51,'A3':0.3,'E1':0.3,'E2':0.24,'G1':0.09,'G2':1.04,'G3':2.16,'M1':0.3,'M2':0.17,'S1':0.42,'S2':3.27}
DUR={}
for k in list(OFF)+['R','P1','P2','L1','A4','P3','E3','M3','S4','S3','N2','P4','P5','S5','P6','E4','A5','M4','P7','N3']:
    DUR[k]=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'vo_w/{k}.wav'],capture_output=True,text=True).stdout)
def lip(k,pre=0.45,post=0.4):
    s=max(0,OFF[k]-pre);e=min(5.04,OFF[k]+DUR[k]+post);return ("L_"+k,round(s,2),round(e,2),[(k,OFF[k]-s)])
E=[("t27_storm",0,5.17,[("R",1.2)]),("t01_cave",0,5.17,[]),("t21_walk",0.5,4.5,[("P5",0.3)]),("t02_palm",1.2,5.17,[]),("t30_eyes",0.5,5.17,[("S5",0.6)]),
lip("G1"),lip("A1",0.9),lip("G2"),
("t03_orb",0.3,5.17,[("P1",0.6)]),("t29_scan",0,4.2,[("P6",0.9)]),
("t04_collapse",0,5.17,[("E4",1.2)]),("t17_lunge",0.3,5.17,[]),("t05_creatures",0,5.17,[("A5",0.8)]),
lip("E1"),("t28_charge",0,4.6,[("S4",0.5)]),("t06_run",0.5,5.17,[("E3",0.9)]),("t19_bridge",0,4.6,[("M3",0.7)]),lip("S1"),("t20_head",0.5,3.6,[]),lip("M1"),
("t07_wave",0,5.17,[("A4",0.3)]),("t35_shards",0,4.2,[]),("t18_orbfly",0,3.8,[("P3",0.4)]),("t26_aval",0.5,5.17,[("M4",0.5)]),
("t09_islands",0,5.17,[("S3",1.4)]),lip("S2"),lip("A2",0.9),("t22_palm",0.5,4.2,[]),lip("M2"),("t31_bridge",0,3.0,[]),lip("E2"),("t11_laugh",0,3.5,[]),
("t23_wave",0,5.17,[("P2",0.3)]),("t25_caps",0,5.17,[("L1",0.5)]),("t33_panel",0,4.2,[("P7",0.4)]),("t14_capsules",0,3.5,[]),lip("A3"),
("t13_fortress",0,5.17,[("N2",0.6)]),("t32_corr",0,4.2,[]),("t24_gates",0.3,4.6,[("P4",0.4)]),("t34_light",0,4.5,[("N3",0.3)]),("t15_tower",0,5.17,[]),lip("G3",0.5,0.8)]
T=0.35;ET=1.0;END=10.0
n=len(E);DL=[e-s for _,s,e,_ in E];ST=[sum(DL[:i])-i*T for i in range(n)]
vlen=sum(DL)-(n-1)*T;total=vlen-ET+END
idx={E[i][0]:i for i in range(n)}
vo=[(nm,ST[i]+t) for i,(f,s,e,evs) in enumerate(E) for nm,t in evs]
json.dump({"E":E,"ST":ST,"vo":vo,"dur":DUR,"total":total},open("edl3.json","w"))
print("sure",round(total,2))
if len(sys.argv)<2: sys.exit()
MUS=[("../b01/cues/sakin_acilis.wav",0.0,0.26,24),
     ("../b01/cues/doruk_heyecan.wav",ST[idx["t04_collapse"]]+0.2,0.24,38),
     ("../b01/cues/yukselis.wav",ST[idx["t23_wave"]]+0.3,0.16,16),
     ("../b01/cues/kapanis.wav",vlen-ET-1.0,0.5,END+1.5)]
a=["ffmpeg","-y","-v","error"]
for f,s,e,_ in E:a+=["-ss",str(s),"-t",str(e-s),"-i",C+f+".mp4"]
a+=["-f","lavfi","-t",str(END),"-i","color=c=black:s=1920x1080:r=24"]
a+=["-f","lavfi","-t",str(total),"-i","anoisesrc=color=brown:amplitude=0.015:r=48000"]
base=n+2
for c,_,_,_ in MUS:a+=["-i",c]
vb=base+len(MUS)
for nm,t in vo:a+=["-i",f"vo_w/{nm}.wav"]
CROP={"L_G2":"crop=1280:676:0:22,","L_G3":"crop=1280:576:0:64,","L_M1":"crop=1280:608:0:48,","L_E1":"crop=1280:528:0:96,"}
F=[]
for i in range(n):
    F.append(f"[{i}:v]{CROP.get(E[i][0],'')}scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.5,eq=brightness=0.02:saturation=1.05,setsar=1,fps=24,format=yuv420p,trim=duration={DL[i]:.3f},setpts=PTS-STARTPTS[v{i}]")
font="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F.append(f"[{n}:v]format=yuv420p,drawtext=fontfile={font}:text='The Human Code\\: 2300':fontsize=78:fontcolor=white:x=(w-tw)/2:y=h/2-110,drawtext=fontfile={font}:text='Bölüm 4 — Kale':fontsize=46:fontcolor=0xff5a5a:x=(w-tw)/2:y=h/2+10,drawtext=fontfile={font}:text='Yakında':fontsize=34:fontcolor=white@0.8:x=(w-tw)/2:y=h/2+80,fade=t=in:st=0:d=1[vend]")
p="v0"
for i in range(1,n):
    F.append(f"[{p}][v{i}]xfade=transition=fade:duration={T}:offset={ST[i]:.3f}[x{i}]");p=f"x{i}"
F.append(f"[{p}][vend]xfade=transition=fade:duration={ET}:offset={vlen-ET:.3f},fade=t=in:st=0:d=1.2[vout]")
L=[]
for j,(nm,t) in enumerate(vo):
    ms=int(t*1000);fx=""
    if nm.startswith("G"): fx="asetrate=48000*0.9,aresample=48000,atempo=1.1111,aecho=0.8:0.6:70:0.22,"
    if nm=="L1": fx="highpass=f=350,lowpass=f=3200,acrusher=bits=10:mix=0.25,"
    F.append(f"[{vb+j}:a]aresample=48000,{fx}aformat=channel_layouts=stereo,adelay={ms}|{ms}[e{j}]");L.append(f"[e{j}]")
F.append(f"{''.join(L)}amix=inputs={len(L)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},volume=1.7,asplit=2[dlg][sc]")
ML=[]
for k,(c,t0,vol,dur) in enumerate(MUS):
    ms=int(max(t0,0)*1000);F.append(f"[{base+k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=duration={dur:.2f},afade=t=in:d=1.5,afade=t=out:st={max(dur-2.5,0.5):.2f}:d=2.5,volume={vol},adelay={ms}|{ms}[m{k}]");ML.append(f"[m{k}]")
F.append(f"{''.join(ML)}amix=inputs={len(ML)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f}[mus]")
F.append(f"[{n+1}:a]lowpass=f=400,aformat=channel_layouts=stereo[amb]")
F.append("[mus][amb]amix=inputs=2:normalize=0[bed]")
F.append("[bed][sc]sidechaincompress=threshold=0.05:ratio=2.5:attack=40:release=700[duck]")
F.append("[dlg][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
a+=["-filter_complex",";".join(F),"-map","[vout]","-map","[aout]","-c:v","libx264","-preset","medium","-crf","17","-pix_fmt","yuv420p","-ar","48000","-c:a","aac","-b:a","160k","-movflags","+faststart","-t",f"{total:.2f}",sys.argv[1]]
subprocess.run(a,check=True);print("ok")
