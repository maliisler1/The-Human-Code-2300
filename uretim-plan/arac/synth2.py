import numpy as np, wave
from scipy.signal import lfilter, fftconvolve
SR=48000;np.random.seed(11)
nf=lambda m:440*2**((m-69)/12)
def t(d): return np.arange(int(d*SR))/SR
def lp(x,a): return lfilter([a],[1,-(1-a)],x)
def env(n,a,r):
    e=np.ones(n);A=int(a*SR);R=int(r*SR)
    if A: e[:A]=np.linspace(0,1,A)
    if R: e[-R:]*=np.linspace(1,0,R)
    return e
def saw(f,tt,ph=0): return 2*((tt*f+ph)%1)-1
def supersaw(f,tt,n=5,det=0.012):
    return sum(saw(f*(1+det*(k-(n-1)/2)/((n-1)/2)),tt,np.random.rand()) for k in range(n))/n
def reverb(x,dec=2.5,mix=0.3):
    n=int(dec*SR);ir=np.random.randn(n)*np.exp(-np.linspace(0,6,n));ir[:200]=0
    L=fftconvolve(x,ir)[:len(x)];R=fftconvolve(x,np.roll(ir,331))[:len(x)]
    s=np.max(np.abs(x))+1e-9;L*=s/(np.max(np.abs(L))+1e-9);R*=s/(np.max(np.abs(R))+1e-9)
    return np.stack([x*(1-mix)+L*mix,x*(1-mix)+R*mix],1)
def write(name,st):
    st=st/(np.max(np.abs(st))+1e-9)*0.9
    with wave.open(name,'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype(np.int16).tobytes())
PROG=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]  # Am F C G
def pad(dur,chdur,vol=1,cut=0.03):
    N=int(dur*SR);x=np.zeros(N)
    for k in range(int(np.ceil(dur/chdur))):
        i=int(k*chdur*SR);tt=t(chdur+1.5);ch=PROG[k%4]
        s=sum(supersaw(nf(m-12),tt) for m in ch)+0.6*supersaw(nf(ch[0]-24),tt,3)
        s=lp(s*env(len(tt),0.8,1.4),cut);x[i:i+len(s)]+=s[:N-i]
    return x*vol
def kick(): tt=t(0.4);return np.sin(2*np.pi*np.cumsum(45+140*np.exp(-tt*30))/SR)*np.exp(-tt*8)
def snare():
    tt=t(0.3);n=np.random.randn(len(tt))*np.exp(-tt*16);return 0.6*(n-lp(n,0.08))+0.5*np.sin(2*np.pi*190*tt)*np.exp(-tt*20)
def taiko(): tt=t(0.6);return np.sin(2*np.pi*(70+40*np.exp(-tt*12))*tt)*np.exp(-tt*5)+0.2*lp(np.random.randn(len(tt)),0.05)*np.exp(-tt*10)
def hat(): tt=t(0.06);n=np.random.randn(len(tt));return (n-lp(n,0.6))*np.exp(-tt*70)
# ---- AKSİYON 72s @140 ----
bpm=140;b=60/bpm;dur=72;N=int(dur*SR);x=np.zeros(N)
x+=0.5*pad(dur,8*b,cut=0.05)
K,S,T,H=kick(),snare(),taiko(),hat()
def put(sig,st,g):
    i=int(st*SR)
    if i<N: x[i:i+len(sig)]+= g*sig[:N-i]
bars=int(dur/(4*b))
for bar in range(bars):
    ch=PROG[(bar//2)%4];root=ch[0]-24
    inten=0 if bar<4 else (1 if bar<8 else 2)
    if bar in (22,23): inten=0  # breakdown
    for s in range(16):
        st=bar*4*b+s*b/4
        tt=t(b/4*0.85);note=root+(12 if s%4==2 else 0)+(7 if s%8==6 else 0)
        sig=lp(supersaw(nf(note),tt,3)*env(len(tt),0.002,0.03),0.12+0.1*inten);put(sig,st,0.33)
        if inten>=1 and s in (0,6,10): put(K,st,0.9)
        if inten>=1 and s in (4,12): put(S,st,0.45)
        if inten>=2 and s%2==1: put(H,st,0.15)
        if s in (0,8) and (bar%2==0 or inten==2): put(T,st,0.5)
        # arpeggio
        if inten>=1:
            m=ch[s%3]+12+(12 if s>=8 else 0);tt=t(b/4*0.7)
            put(lp(saw(nf(m),tt)*np.exp(-tt*12),0.3),st,0.10)
    if inten==2 and bar%4==0:  # brass hits
        tt=t(b*2);s=sum(supersaw(nf(m),tt) for m in ch)*env(len(tt),0.03,0.8);put(lp(s,0.18),bar*4*b,0.30)
    if bar in (6,7,20,21):  # riser
        tt=t(4*b);r=np.random.randn(len(tt))*np.linspace(0,1,len(tt))**2;put(lp(r,0.15),bar*4*b,0.05 if bar%2==0 else 0.12)
x*=env(N,0.3,2.5);write('aksiyon.wav',reverb(x,1.6,0.2))
# ---- SAKİN 90s ----
dur=90;N=int(dur*SR);x=0.6*pad(dur,7.5,cut=0.018)
for k in range(46):
    st=2+k*1.875+np.random.rand()*0.1;i=int(st*SR);ch=PROG[int(st/7.5)%4]
    m=ch[k%3]+24 if k%4!=3 else ch[0]+31;tt=t(3)
    s=(np.sin(2*np.pi*nf(m)*tt)+0.25*np.sin(4*np.pi*nf(m)*tt))*np.exp(-tt*1.8)*0.16
    x[i:i+len(s)]+=s[:N-i]
x+=0.1*np.sin(2*np.pi*nf(33)*t(dur))*(0.6+0.4*np.sin(2*np.pi*0.05*t(dur)))
x*=env(N,3,4);write('sakin.wav',reverb(x,3.5,0.4))
# ---- YÜKSELİŞ 32s ----
dur=32;N=int(dur*SR);tt=t(dur);g=np.linspace(0.2,1,N)**2
x=pad(dur,4,cut=0.04)*g
for k in range(int(dur/0.5)):
    T=taiko();put_i=int(k*0.5*SR);s=T*(0.2+0.8*k/(dur/0.5));x[put_i:put_i+len(s)]+=0.5*s[:N-put_i]
x+=0.15*lp(np.random.randn(N),0.1)*g
x*=env(N,1,1.5);write('yukselis.wav',reverb(x,2.5,0.3))
# ---- FINAL 16s ----
dur=16;N=int(dur*SR);tt=t(dur);x=np.zeros(N)
x+=0.25*lp(sum(supersaw(nf(m),tt) for m in [33,40,45,48]),0.05)*np.linspace(0,1,N)**2
x+=0.07*np.sin(2*np.pi*nf(84)*tt)*(0.5+0.5*np.sin(2*np.pi*11*tt))*np.linspace(0,1,N)
i=int(11.5*SR);bt=t(4.5);boom=np.sin(2*np.pi*(38+70*np.exp(-bt*8))*bt)*np.exp(-bt*1.0);x[i:i+len(boom)]+=boom[:N-i]
x[int(12*SR):]*=np.linspace(1,0,N-int(12*SR));write('final.wav',reverb(x,3,0.35))
print('ok')
