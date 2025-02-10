"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EASE } from "@/utils/Ease";
import BezierEasing from "bezier-easing";
import { useTempus } from "tempus/react";
import ReactHlsPlayer from "react-hls-player";
import { useLoaded } from "@/lib/useLoader";
import Hls from "hls.js";

const lineProgress = BezierEasing(0.55, 0.1, 0.1, 1.0);

type FilmControlsType = {
  title: string;
  informations: [
    {
      information: {
        information_name: string;
        information_value: string;
      };
    },
  ];
  vimeoLink: string;
  coverImageUrl: string;
};

export default function FilmControls({
  title,
  informations,
  vimeoLink,
  coverImageUrl,
}: FilmControlsType) {
  const filmRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lineProgressRef = useRef<HTMLDivElement | null>(null);
  const progressTimeRef = useRef<HTMLParagraphElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headerControlsRef = useRef<HTMLDivElement | null>(null);
  const headerInformationsRef = useRef<HTMLDivElement | null>(null);
  const loaded = useLoaded();

  const [isMuted, setIsMuted] = useState(true);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useTempus(() => {
    if (lineProgressRef.current && videoRef.current) {
      lineProgressRef.current.style.transform = `scaleX(${videoRef.current.currentTime / videoRef.current.duration})`;
      if (progressTimeRef.current && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const totalMilliseconds = Math.floor(currentTime * 1000);
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
        progressTimeRef.current.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
        progressTimeRef.current.style.left = `${(currentTime / videoRef.current.duration) * 100}%`;
      }
    }
  });

  function setActiveState(
    overlayEl: HTMLDivElement | null,
    controlsEl: HTMLDivElement | null,
    infoEl: HTMLDivElement | null,
    timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
    setInactiveState: () => void,
  ) {
    gsap.to(overlayEl, {
      opacity: 0.5,
      ease: (t) => EASE["o6"](t),
      duration: 1.25,
    });
    gsap.to(controlsEl, {
      opacity: 1,
      ease: (t) => EASE["o6"](t),
      duration: 1.25,
    });
    gsap.to(infoEl, { opacity: 1, ease: (t) => EASE["o6"](t), duration: 1.25 });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setInactiveState();
    }, 2000);
  }

  function setInactiveState(
    overlayEl: HTMLDivElement | null,
    controlsEl: HTMLDivElement | null,
    infoEl: HTMLDivElement | null,
  ) {
    if (videoRef.current?.paused) return;
    gsap.to(overlayEl, { opacity: 0, ease: (t) => EASE["o6"](t), duration: 1 });
    gsap.to(controlsEl, {
      opacity: 0,
      ease: (t) => EASE["o6"](t),
      duration: 1,
    });
    gsap.to(infoEl, { opacity: 0, ease: (t) => EASE["o6"](t), duration: 1 });
  }

  const playVideo = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current.play().catch((error) => {
        if (error.name !== "AbortError")
          console.error("Error playing video:", error);
      });
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, []);

  const controls = useMemo(
    () => ({ playVideo, pauseVideo, toggleMute }),
    [playVideo, pauseVideo, toggleMute],
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setActiveState(
          overlayRef.current,
          headerControlsRef.current,
          headerInformationsRef.current,
          inactivityTimerRef,
          () => {
            setInactiveState(
              overlayRef.current,
              headerControlsRef.current,
              headerInformationsRef.current,
            );
          },
        );
        if (videoRef.current?.paused) videoRef.current?.play();
        else videoRef.current?.pause();
      } else if (e.key === "m") {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(videoRef.current.muted);
          setActiveState(
            overlayRef.current,
            headerControlsRef.current,
            headerInformationsRef.current,
            inactivityTimerRef,
            () => {
              setInactiveState(
                overlayRef.current,
                headerControlsRef.current,
                headerInformationsRef.current,
              );
            },
          );
        }
      } else if (e.key === "ArrowRight") {
        if (videoRef.current) {
          videoRef.current.currentTime += 5;
          setActiveState(
            overlayRef.current,
            headerControlsRef.current,
            headerInformationsRef.current,
            inactivityTimerRef,
            () => {
              setInactiveState(
                overlayRef.current,
                headerControlsRef.current,
                headerInformationsRef.current,
              );
            },
          );
        }
      } else if (e.key === "ArrowLeft") {
        if (videoRef.current) {
          videoRef.current.currentTime -= 5;
          setActiveState(
            overlayRef.current,
            headerControlsRef.current,
            headerInformationsRef.current,
            inactivityTimerRef,
            () => {
              setInactiveState(
                overlayRef.current,
                headerControlsRef.current,
                headerInformationsRef.current,
              );
            },
          );
        }
      }
    };

    const handleMouseMove = () => {
      setActiveState(
        overlayRef.current,
        headerControlsRef.current,
        headerInformationsRef.current,
        inactivityTimerRef,
        () => {
          setInactiveState(
            overlayRef.current,
            headerControlsRef.current,
            headerInformationsRef.current,
          );
        },
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls]);

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.to(".under_lineprogress", {
        scaleX: 1,
        ease: (t) => lineProgress(t),
        duration: 1.75,
        delay: 0.25,
      });
      gsap.to("#play", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.5,
        delay: 0.15,
      });
      gsap.to("#pause", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.5,
        delay: 0.15,
      });
      gsap.to("#mute", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.5,
        delay: 0.75,
      });

      gsap.to("#full", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.5,
        delay: 0.9,
        onStart: () => {
          gsap.to(".progressTime", {
            opacity: 1,
            ease: (t) => EASE["o4"](t),
            duration: 1,
          });
        },
      });
      gsap.to(".film__video__overlay", {
        opacity: 0,
        ease: (t) => EASE["o4"](t),
        duration: 2,
        delay: 0.7,
        onComplete: () => {
          setInactiveState(
            overlayRef.current,
            headerControlsRef.current,
            headerInformationsRef.current,
          );
        },
      });
      gsap.to(".film__header__informations_name", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 2,
        delay: 0.9,
        stagger: 0.1,
      });
      gsap.to(".film__header__informations_value", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 2,
        delay: 0.9,
        stagger: 0.075,
      });
      gsap.to(".film__header__informations_title", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.5,
        delay: 0.75,
      });
      gsap.to(videoRef.current, { opacity: 1, ease: "linear", duration: 1 });
    },
    { scope: filmRef, dependencies: [loaded] },
  );

  const clickOnLineProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = videoRef.current.duration * percentage;
    }
  };

  useEffect(() => {
    let hls: Hls | undefined;
    if (Hls.isSupported() && videoRef.current) {
      hls = new Hls({
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        lowLatencyMode: false,
      });
      hls.loadSource(vimeoLink);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log(hls.levels);
        const levelIndex = hls.levels.findIndex((level) => level.height >= 720);
        if (levelIndex !== -1) {
          hls.currentLevel = levelIndex;
        }
      });
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [vimeoLink]);

  console.log(coverImageUrl);

  return (
    <div ref={filmRef} className="film__header">
      <div className="w__film__video">
        <video
          ref={videoRef}
          className="film__video"
          autoPlay
          muted
          poster={coverImageUrl}
          controls={false}
          playsInline
        />
        <div className="film__video__overlay" ref={overlayRef}></div>
      </div>
      <div ref={headerControlsRef} className="film__header__controls">
        <div onClick={clickOnLineProgress} className="w__film__video__progress">
          <p ref={progressTimeRef} className="progressTime">
            00:00:00
          </p>
          <div className="under_lineprogress"></div>
          <div ref={lineProgressRef} className="lineprogress"></div>
        </div>
        <div className="w__controls__buttons">
          <div className="film__inline_controls">
            <div className="__oh">
              <p
                id="play"
                onClick={() => videoRef.current?.play()}
                className="controls__buttons_text"
              >
                {"Play"}
              </p>
            </div>
            <div className="__oh">
              <p
                id="pause"
                onClick={() => videoRef.current?.pause()}
                className="controls__buttons_text"
              >
                {"Pause"}
              </p>
            </div>
          </div>
          <div className="controls__buttons__inline">
            <div className="__oh">
              <p
                onClick={controls.toggleMute}
                id="mute"
                className="controls__buttons_text"
              >
                {isMuted ? "Unmute" : "Mute"}
              </p>
            </div>
            <div className="__oh">
              <p
                onClick={() => {
                  if (videoRef.current && videoRef.current.requestFullscreen)
                    videoRef.current.requestFullscreen();
                }}
                id="full"
                className="controls__buttons_text"
              >
                Fullscreen
              </p>
            </div>
          </div>
        </div>
      </div>
      <div ref={headerInformationsRef} className="film__header__informations">
        <div className="__oh">
          <p className="film__header__informations_title">{title}</p>
        </div>
        <div className="film__header__informations__inline">
          {informations.map((data, index) => (
            <div key={index}>
              <div className="__oh">
                <p className="film__header__informations_name">
                  {data.information.information_name}
                </p>
              </div>
              <div className="__oh">
                <p className="film__header__informations_value">
                  {data.information.information_value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
