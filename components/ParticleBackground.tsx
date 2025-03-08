"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useTheme } from "next-themes";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

//   const options: ISourceOptions = useMemo(
//     () => ({
//       background: {
//         color: {
//           value: "#000000",
//         },
//       },
//       fpsLimit: 120,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: "push",
//           },
//           onHover: {
//             enable: true,
//             mode: "attract",
//           },
//         },
//         modes: {
//           push: {
//             quantity: 4,
//           },
//           attract: {
//             distance: 200,
//             duration: 0.4,
// 			factor: 3
//           },
//         },
//       },
//       particles: {
//         color: {
//           value: "#ffffff",
//         },
//         links: {
//           color: "#ffffff",
//           distance: 150,
//           enable: true,
//           opacity: 0.5,
//           width: 1,
//         },
//         move: {
//           direction: MoveDirection.none,
//           enable: true,
//           outModes: {
//             default: OutMode.out,
//           },
//           random: false,
//           speed: 6,
//           straight: false,
//         },
//         number: {
//           density: {
//             enable: true,
//           },
//           value: 100,
//         },
//         opacity: {
//           value: 0.5,
//         },
//         shape: {
//           type: "circle",
//         },
//         size: {
//           value: { min: 1, max: 5 },
//         },
//       },
//       detectRetina: true,
//     }),
//     [],
//   );
const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: theme === "dark" ? "#000000" : "#ffffff",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,  // Enable mouse hover interaction
            mode: "attract", // Use attract mode
          },
        },
        modes: {
          attract: {
            distance: 100,  // Attraction range
            duration: 0.3,  // Smooth movement
            factor: 3,      // Strength of attraction
          },
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: false,
            value_area: 800,
          },
        },
        color: {
          value: theme === "dark" ? "#ffffff" : "#000000",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 1,
          random: true,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 300, // Adjust rotation attraction
            rotateY: 300,
          },
        },
      },
      detectRetina: true,
    }),
    [theme],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticleBackground;