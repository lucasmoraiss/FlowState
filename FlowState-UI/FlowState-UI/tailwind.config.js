module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
    "./src/main.tsx",
    "./src/index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais
        primary: {
          50: "#f5f3ff", // Roxo muito claro
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa", // Roxo médio (principal)
          500: "#8b5cf6", // Roxo vibrante
          600: "#7c3aed", // Roxo mais saturado
          700: "#6d28d9", // Roxo escuro
          800: "#5b21b6",
          900: "#4c1d95", // Roxo muito escuro
          950: "#2e1065", // Roxo quase preto
        },

        // Cores secundárias
        secondary: {
          100: "#e0f2fe", // Azul claro
          400: "#38bdf8", // Azul médio
          600: "#0284c7", // Azul escuro
        },

        // Cores de apoio
        accent: {
          100: "#fce7f3", // Rosa claro
          400: "#f472b6", // Rosa médio
          600: "#db2777", // Rosa escuro
        },

        // Tons neutros modernos
        neutral: {
          50: "#fafafa", // Branco suave
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4", // Cinza claro
          400: "#a3a3a3", // Cinza médio
          500: "#737373",
          600: "#525252", // Cinza escuro
          700: "#404040",
          800: "#262626", // Quase preto
          900: "#171717",
        },

        // Estados e feedback
        success: {
          100: "#dcfce7",
          400: "#4ade80",
          600: "#16a34a",
        },
        warning: {
          100: "#fef9c3",
          400: "#facc15",
          600: "#ca8a04",
        },
        danger: {
          100: "#fee2e2",
          400: "#f87171",
          600: "#dc2626",
        },

        // Gradientes especiais
        gradient: {
          purple: "linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)",
          midnight: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)",
        },
      },

      // Extensões de animação
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 6s infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // Bordas personalizadas
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      // Sombra moderna
      boxShadow: {
        soft: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(139, 92, 246, 0.5)",
      },
    },
  },
  plugins: [],
};
