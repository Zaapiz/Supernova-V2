import { loadBasic } from '@tsparticles/basic'
import { tsParticles } from '@tsparticles/engine'

export async function startParticles() {
  const options = {
    background: {
      color: {
        value: '#000000',
      },
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    fpsLimit: 45,
    particles: {
      color: {
        value: [
          '#00ffff', // Cyan
          '#4169e1', // Royal Blue
          '#ffd700', // Gold
          '#ff4500', // Orange Red
          '#ff0000', // Pure Red
          '#77ccff', // Light Blue
          '#ff8800', // Dark Orange
          '#6600cc', // Deep Purple
          '#9933ff', // Bright Purple
          '#0000cc', // Deep Blue
          '#cc33ff', // Light Purple
          '#0066ff', // Blue
          '#00ccff', // Light Blue
          '#ccffff', // Light Cyan
        ],
      },
      groups: {
        stars: {
          number: {
            value: 320,
          },
          opacity: {
            value: { min: 0.3, max: 1 },
          },
          size: {
            value: { min: 1, max: 4 },
          },
          twinkle: {
            enable: true,
            frequency: 0.2,
            opacity: 1,
          },
          position: {
            x: 50,
            y: 50,
            radius: 20,
          },
        },
      },
      number: {
        value: 400,
        density: {
          enable: true,
          area: 800,
        },
      },
      move: {
        enable: true,
        speed: { min: 0.2, max: 2 },
        direction: 'outside',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
        },
        attract: {
          enable: false,
        },
        center: {
          x: 50,
          y: 50,
          radius: 80,
        },
      },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          minimumValue: 0.1,
        },
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          minimumValue: 0.5,
        },
      },
    },

    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    detectRetina: true,
  }

  await loadBasic(tsParticles)
  await tsParticles.load({
    id: 'particles-js',
    options: options,
  })
}
