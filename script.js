
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
if(toggle){
  toggle.addEventListener("click",()=>links.classList.toggle("open"));
}
document.querySelectorAll(".nav-links a").forEach(a=>{
  a.addEventListener("click",()=>links?.classList.remove("open"));
});

const motionTargets = document.querySelectorAll(
  ".hero-copy > *, .hero-photo, .page-head > *, .page .grid-2 > *, .page .edu-grid > *, .page .contact-grid > *, .page .timeline > .job, .page .philosophy > *, .page .resp-grid > *, .page .foundation-flow > *, .page .foundation-notes > *, .page .capability-grid > *, .page .stats > *, .page .site-footer-nav > *"
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reducedMotion && "IntersectionObserver" in window){
  const motionObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("motion-visible");
        motionObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -5% 0px"});
  motionTargets.forEach((element,index)=>{
    const direction = element.matches(".hero-photo") ? "bottom" : index % 2 ? "right" : "left";
    element.classList.add("motion-reveal",`motion-from-${direction}`);
    element.style.setProperty("--motion-delay",`${Math.min(index % 7,5)*75}ms`);
    motionObserver.observe(element);
  });
}else{
  motionTargets.forEach(element=>element.classList.add("motion-visible"));
}

const welcomeBubble = document.createElement("aside");
welcomeBubble.className = "welcome-bubble";
welcomeBubble.id = "welcome-bubble";
welcomeBubble.setAttribute("role", "status");
welcomeBubble.hidden = true;
const welcomeMessage = document.createElement("span");
welcomeMessage.textContent = "Halo, saya Rizki. Selamat datang di Website ku.";
const welcomeTrigger = document.createElement("button");
welcomeTrigger.className = "welcome-trigger";
welcomeTrigger.type = "button";
welcomeTrigger.setAttribute("aria-label", "Tampilkan sapaan");
welcomeTrigger.setAttribute("aria-controls", welcomeBubble.id);
welcomeTrigger.setAttribute("aria-expanded", "false");
welcomeTrigger.textContent = "Halo";
const closeWelcome = document.createElement("button");
closeWelcome.className = "welcome-close";
closeWelcome.type = "button";
closeWelcome.setAttribute("aria-label", "Tutup sapaan");
closeWelcome.title = "Tutup sapaan";
closeWelcome.textContent = "×";
const setWelcomeVisible = visible => {
  welcomeBubble.hidden = !visible;
  welcomeTrigger.setAttribute("aria-expanded", String(visible));
  welcomeBubble.classList.toggle("is-visible", visible);
};
welcomeTrigger.addEventListener("click", () => setWelcomeVisible(welcomeBubble.hidden));
closeWelcome.addEventListener("click", () => setWelcomeVisible(false));
welcomeBubble.append(welcomeMessage, closeWelcome);
document.body.append(welcomeBubble, welcomeTrigger);

if(window.parent !== window){
  document.querySelectorAll('a[href$=".html"]').forEach(link=>{
    link.target = "portfolio-content";
  });
}

if(window.top === window){
  const segmentStart = 66;
  const audio = new Audio("Naruto Shippuden OST - Departure To The Front Lines.mp3");
  audio.preload = "auto";
  audio.volume = 0.72;

  const musicWidget = document.createElement("aside");
  musicWidget.className = "music-widget";
  const musicPanel = document.createElement("div");
  musicPanel.className = "music-panel";
  musicPanel.hidden = true;
  const musicDisc = document.createElement("span");
  musicDisc.className = "music-disc";
  musicDisc.setAttribute("aria-hidden", "true");
  const musicInfo = document.createElement("div");
  musicInfo.className = "music-info";
  const musicLabel = document.createElement("small");
  musicLabel.className = "music-label";
  musicLabel.textContent = "PORTFOLIO SOUNDTRACK";
  const musicTitle = document.createElement("strong");
  musicTitle.className = "music-title";
  musicTitle.textContent = "Departure To The Front Lines";
  const musicTiming = document.createElement("span");
  musicTiming.className = "music-timing";
  musicTiming.textContent = "01:06 / --:-- · LOOP";
  musicInfo.append(musicLabel, musicTitle, musicTiming);

  const musicActions = document.createElement("div");
  musicActions.className = "music-actions";
  const toggleMusic = document.createElement("button");
  toggleMusic.className = "music-toggle";
  toggleMusic.type = "button";
  toggleMusic.setAttribute("aria-label", "Putar musik");
  toggleMusic.title = "Putar atau jeda musik";
  toggleMusic.textContent = "▶";
  const closeMusic = document.createElement("button");
  closeMusic.className = "music-close";
  closeMusic.type = "button";
  closeMusic.setAttribute("aria-label", "Sembunyikan pemutar musik");
  closeMusic.title = "Sembunyikan pemutar musik";
  closeMusic.textContent = "×";
  musicActions.append(toggleMusic, closeMusic);
  musicPanel.append(musicDisc, musicInfo, musicActions);

  const reopenMusic = document.createElement("button");
  reopenMusic.className = "music-reopen";
  reopenMusic.type = "button";
  reopenMusic.setAttribute("aria-label", "Buka pemutar musik");
  reopenMusic.title = "Buka pemutar musik";
  reopenMusic.textContent = "♫";
  reopenMusic.hidden = false;
  musicWidget.append(musicPanel, reopenMusic);
  document.body.append(musicWidget);

  let segmentPositioned = false;
  let playbackFailed = false;
  const formatTime = seconds=>{
    if(!Number.isFinite(seconds)) return "--:--";
    const minutes = Math.floor(seconds / 60).toString().padStart(2,"0");
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2,"0");
    return `${minutes}:${remainingSeconds}`;
  };
  const updateMusicState = ()=>{
    const isPlaying = !audio.paused;
    musicWidget.classList.toggle("is-playing",isPlaying);
    toggleMusic.textContent = isPlaying ? (audio.muted ? "♫" : "Ⅱ") : "▶";
    toggleMusic.setAttribute("aria-label",isPlaying ? (audio.muted ? "Aktifkan suara musik" : "Jeda musik") : "Putar musik");
    if(!playbackFailed){
      const playbackStatus = isPlaying && audio.muted ? "SENYAP · SENTUH UNTUK SUARA" : "LOOP";
      musicTiming.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)} · ${playbackStatus}`;
    }
  };
  const showPlaybackFailure = ()=>{
    playbackFailed = true;
    musicTiming.textContent = "GAGAL MEMUTAR · COBA LAGI";
    updateMusicState();
  };
  const startMusic = ()=>{
    playbackFailed = false;
    if(!segmentPositioned){
      const seekToStart = ()=>{
        if(audio.duration > segmentStart) audio.currentTime = segmentStart;
        segmentPositioned = true;
        updateMusicState();
      };
      if(audio.readyState >= HTMLMediaElement.HAVE_METADATA) seekToStart();
      else audio.addEventListener("loadedmetadata",seekToStart,{once:true});
    }
    audio.play().catch(showPlaybackFailure);
  };
  audio.addEventListener("play",()=>{playbackFailed = false;updateMusicState();});
  audio.addEventListener("pause",updateMusicState);
  audio.addEventListener("timeupdate",updateMusicState);
  audio.addEventListener("loadedmetadata",updateMusicState);
  audio.addEventListener("ended",()=>{
    if(audio.duration > segmentStart){
      audio.currentTime = segmentStart;
      audio.play().catch(updateMusicState);
    }
  });
  audio.addEventListener("error",()=>{playbackFailed = true;musicTiming.textContent = "FILE AUDIO TIDAK DAPAT DIPUTAR";});
  toggleMusic.addEventListener("click",()=>{
    if(audio.paused){audio.muted = false;startMusic();}
    else if(audio.muted){audio.muted = false;updateMusicState();}
    else audio.pause();
  });
  closeMusic.addEventListener("click",()=>{
    musicPanel.hidden = true;
    reopenMusic.hidden = false;
  });
  reopenMusic.addEventListener("click",()=>{
    musicPanel.hidden = false;
    reopenMusic.hidden = true;
  });

  const entryCta = document.querySelector(".entry-cta");
  entryCta?.addEventListener("click",event=>{
    event.preventDefault();
    const contentFrame = document.createElement("iframe");
    contentFrame.className = "site-viewport";
    contentFrame.name = "portfolio-content";
    contentFrame.title = "Portfolio Rizki Nugraha";
    contentFrame.src = entryCta.href;
    document.body.classList.add("site-entered");
    document.body.append(contentFrame);
    musicPanel.hidden = true;
    reopenMusic.hidden = false;
    startMusic();
  });
}
