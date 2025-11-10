import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LSOForm from "./LSOForm";
import logo from "@/assets/logo-rua.png";
import { useModal } from "@/contexts/ModalContext";

const Hero = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { setShowContactModal, setShowTestimonialsModal } = useModal();
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef<any>(null);

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSecondChance = () => {
    document.getElementById("segunda-oportunidad")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        playerRef.current = new (window as any).YT.Player('video-player', {
          videoId: 'fOW8Y09GVek',
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'fOW8Y09GVek',
            controls: 0,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            mute: 1,
          },
          events: {
            onReady: (event: any) => {
              // Player is ready
            },
          },
        });
      }
    };

    if ((window as any).YT) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const togglePause = () => {
    if (playerRef.current) {
      if (isPaused) {
        playerRef.current.playVideo();
        setIsPaused(false);
      } else {
        playerRef.current.pauseVideo();
        setIsPaused(true);
      }
    }
  };

  return (
    <>
      {showQuestionnaire && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="max-w-2xl w-full my-8">
            <LSOForm onClose={() => setShowQuestionnaire(false)} />
          </div>
        </div>
      )}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted pt-20">
        {/* Video de fondo */}
        <div className="absolute inset-0 top-0 w-full h-screen overflow-hidden">
          <div className="relative w-full h-full">
            <div
              id="video-player"
              style={{ width: '100%', height: '100%' }}
              className="absolute top-0 left-0"
            ></div>
            {/* Overlay oscuro para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        {/* Contenido sobre el video */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <img 
              src={logo} 
              alt="RÚA ABOGADOS" 
              className="w-full max-w-lg mx-auto mb-12 drop-shadow-lg"
            />
            
            {/* Video controls */}
            <div className="flex gap-2 justify-center mb-8">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleMute}
                className="bg-black/50 hover:bg-black/70 text-white border-none"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={togglePause}
                className="bg-black/50 hover:bg-black/70 text-white border-none"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            </div>
            
            <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl mx-auto font-semibold drop-shadow-md">
              50 años de experiencia. Más de 100.000 clientes. Millones de euros recuperados.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ahora también te ayudamos a empezar de cero con la Ley de Segunda Oportunidad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                onClick={() => setShowContactModal(true)}
                className="text-base bg-primary hover:bg-primary/90"
              >
                ¿Hablamos?
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToSecondChance}
                className="text-base text-black border-white hover:bg-white/10"
              >
                Conoce la Ley
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => setShowQuestionnaire(true)}
                className="text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                📋 CUESTIONARIO LSO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
