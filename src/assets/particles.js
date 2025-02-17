import { loadBasic } from '@tsparticles/basic'
import { tsParticles } from '@tsparticles/engine'

export async function startParticles() {
  const options = {
    background: {
      color: {
        value: '#000000'  // Deep space blue
      }
    },
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    fpsLimit: 60,
    particles: {
      groups: {
        stars: {
          number: {
            value: 200
          },
          color: {
            value: ['#ffffff', '#77ccff', '#ff8800', '#ffff00']  // Different star colors
          },
          opacity: {
            value: { min: 0.1, max: 1 }
          },
          size: {
            value: { min: 1, max: 3 }
          },
          twinkle: {
            enable: true,
            frequency: 0.05,
            opacity: 1
          }
        },
        // nebula: {
        //   number: {
        //     value: 20
        //   },
        //   color: {
        //     value: ['#ff77ff', '#77ffff', '#ffff77']  // Nebula colors
        //   },
        //   shape: {
        //     type: 'circle'
        //   },
        //   opacity: {
        //     value: { min: 0.05, max: 0.2 }
        //   },
        //   size: {
        //     value: { min: 15, max: 50 }
        //   },
        //   move: {
        //     enable: true,
        //     speed: 0.2,
        //     direction: 'none',
        //     random: true,
        //     straight: false,
        //     outModes: 'bounce'
        //   },
        //   blur: {
        //     enable: true,
        //     value: 5
        //   }
        // }
      },
      number: {
        value: 220,  // Total particles
        density: {
          enable: true,
          area: 800
        }
      },
      move: {
        enable: true,
        speed: { min: 0.1, max: 0.5 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: {
          enable: true,
          speed: 0.3,
          sync: false,
          minimumValue: 0.1
        }
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          minimumValue: 0.5
        }
      },
      links: {
        enable: false
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble'
        }
      },
      modes: {
        bubble: {
          distance: 200,
          size: 4,
          duration: 2,
          opacity: 0.8
        }
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    detectRetina: true
  }

  await loadBasic(tsParticles)
  await tsParticles.load({
    id: 'particles-js',
    options: options
  })
}
