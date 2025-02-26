"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EASE } from "@/utils/Ease";
import BezierEasing from "bezier-easing";
import { useTempus } from "tempus/react";
import { useLoaded } from "@/lib/useLoader";

// @ts-expect-error: Hls.js module does not have type declarations
import Hls from "hls.js";
import useMobileDetect from "@/lib/DetectScreen";

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

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
  vimeoLink: {
    hls: string;
    mp4: string;
  };
  coverImageUrl: string;
  videoZoom: number;
};

export default function FilmControls({
  title,
  informations,
  vimeoLink,
  coverImageUrl,
  videoZoom,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isMobile } = useMobileDetect();
  const [mobile, setMobile] = useState(false);
  const playButtonRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useTempus(() => {
    if (lineProgressRef.current && videoRef.current) {
      lineProgressRef.current.style.transform = `scaleX(${videoRef.current.currentTime / videoRef.current.duration})`;
      if (progressTimeRef.current && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const totalMilliseconds = Math.floor(currentTime * 1000);
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
        if (mobile) {
          progressTimeRef.current.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        } else {
          progressTimeRef.current.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
        }
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

  const setInactiveState = useCallback(
    (
      overlayEl: HTMLDivElement | null,
      controlsEl: HTMLDivElement | null,
      infoEl: HTMLDivElement | null,
    ) => {
      if (videoRef.current?.paused) return;
      gsap.to(overlayEl, {
        opacity: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1,
      });
      gsap.to(controlsEl, {
        opacity: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1,
      });
      if (mobile) return;
      gsap.to(infoEl, { opacity: 0, ease: (t) => EASE["o6"](t), duration: 1 });
    },
    [mobile],
  );

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
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => {
      setIsPlaying(true);
      if (playButtonRef.current) playButtonRef.current.innerText = "Pause";
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (playButtonRef.current) playButtonRef.current.innerText = "Play";
    };
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === filmRef.current) {
        if (videoRef.current) {
          if (!isPlaying) {
            videoRef.current.play().catch((error) => {
              if (error.name !== "AbortError")
                console.error("Error playing video:", error);
            });
          } else {
            videoRef.current.pause();
          }
        }
      }
    },
    [isPlaying],
  );

  useEffect(() => {
    if (!vimeoLink.hls) return;
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
        if (videoRef.current?.paused) {
          videoRef.current.play().catch((error) => {
            if (error.name !== "AbortError")
              console.error("Error playing video:", error);
          });
        } else {
          videoRef.current?.pause();
        }
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

    const handleMouseMove = (e: MouseEvent) => {
      if (playButtonRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        playButtonRef.current.style.left = `${20 + x}px`;
        playButtonRef.current.style.top = `${window.scrollY + y}px`;
      }
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
  }, [controls, setInactiveState, vimeoLink.hls]);

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
        delay: 0.2,
      });
      gsap.to("#mute", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.75,
        delay: 0.9,
      });
      gsap.to("#full", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.75,
        delay: 1,
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
        delay: 0.75,
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
        duration: 1.75,
        delay: 0.85,
        stagger: 0.1,
      });
      gsap.to(".film__header__informations_value", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.75,
        delay: 0.9,
        stagger: 0.075,
      });
      gsap.to(".film__header__informations_title", {
        y: 0,
        ease: (t) => EASE["o6"](t),
        duration: 1.75,
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
    if (!vimeoLink.hls) return;
    let hls: Hls | undefined;
    if (!mobile) {
      if (Hls.isSupported() && videoRef.current) {
        hls = new Hls({
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: false,
        });
        hls.loadSource(vimeoLink.hls);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const levelIndex = hls.levels.findIndex(
            (level: { height: number }) => level.height >= 720,
          );
          if (levelIndex !== -1) {
            hls.currentLevel = levelIndex;
          }
        });
      } else if (videoRef.current) {
        videoRef.current.src = vimeoLink.hls;
      }
    } else {
      if (videoRef.current) {
        videoRef.current.src = vimeoLink.mp4;
      }
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [vimeoLink, mobile]);

  const extendedDocument = document as ExtendedDocument;
  const isFullscreen =
    document.fullscreenElement ||
    extendedDocument.webkitFullscreenElement ||
    extendedDocument.mozFullScreenElement ||
    extendedDocument.msFullscreenElement;

  return (
    <div ref={filmRef} className="film__header" onClick={togglePlay}>
      <div ref={playButtonRef} className="__oh w__play__btn">
        <p id="play" onClick={togglePlay} className="controls__buttons_text">
          Play
        </p>
      </div>
      <div className="w__film__video">
        <video
          ref={videoRef}
          className="film__video"
          autoPlay
          muted
          poster={coverImageUrl}
          controls={false}
          playsInline
          style={{
            scale: videoZoom && !isFullscreen ? videoZoom : 1,
          }}
        />
        <div className="film__video__overlay" ref={overlayRef}></div>
      </div>
      <div
        style={{
          visibility: vimeoLink.hls ? "visible" : "hidden",
        }}
        ref={headerControlsRef}
        className="film__header__controls"
      >
        <div onClick={clickOnLineProgress} className="w__film__video__progress">
          <p ref={progressTimeRef} className="progressTime">
            00:00:00
          </p>
          <div className="under_lineprogress"></div>
          <div ref={lineProgressRef} className="lineprogress"></div>
        </div>
        <div className="w__controls__buttons">
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
                  if (videoRef.current) {
                    if (videoRef.current.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    } else {
                      // Using optional chaining to safely invoke the function if it exists
                      (
                        videoRef.current as ExtendedHTMLVideoElement
                      ).webkitEnterFullscreen?.();
                    }
                  }
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
