import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";

// fullScreen: {
//   enable: true,
//   zIndex: -1,
// },

export async function startParticles() {
  const options = {
    background: {
      color: { value: "#000000" },
    },
    fullScreen: {
      enable: true,
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        enable: true,
        speed: 2,
        direction: "right",
        outModes: {
          default: "out",
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 200,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Smaller particles for star effect
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      links: {
        enable: false, // Disable links for a more star-like appearance
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  };

  await loadBasic(tsParticles);
  await tsParticles.load({
    id: "particles-js",
    options: options,
  });
}
