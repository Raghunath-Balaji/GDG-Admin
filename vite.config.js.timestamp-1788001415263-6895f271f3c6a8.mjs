// vite.config.js
import { defineConfig } from "file:///C:/Users/user/Desktop/CIT%20Projects/GDG-Admin-main/GDG-Admin-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Desktop/CIT%20Projects/GDG-Admin-main/GDG-Admin-main/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3e3,
    host: "0.0.0.0",
    allowedHosts: true,
    headers: {
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
    }
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion": ["framer-motion"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcQ0lUIFByb2plY3RzXFxcXEdERy1BZG1pbi1tYWluXFxcXEdERy1BZG1pbi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcQ0lUIFByb2plY3RzXFxcXEdERy1BZG1pbi1tYWluXFxcXEdERy1BZG1pbi1tYWluXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0Rlc2t0b3AvQ0lUJTIwUHJvamVjdHMvR0RHLUFkbWluLW1haW4vR0RHLUFkbWluLW1haW4vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgICAgYWxsb3dlZEhvc3RzOiB0cnVlLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNyb3NzLU9yaWdpbi1PcGVuZXItUG9saWN5XCI6IFwidW5zYWZlLW5vbmVcIixcbiAgICAgICAgICAgIFwiQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeVwiOiBcInVuc2FmZS1ub25lXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgICAgICAgICAgICAnbW90aW9uJzogWydmcmFtZXItbW90aW9uJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrWSxTQUFTLG9CQUFvQjtBQUMvWixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNMLDhCQUE4QjtBQUFBLE1BQzlCLGdDQUFnQztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ0osY0FBYztBQUFBLFVBQ1YsZ0JBQWdCLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ3pELFVBQVUsQ0FBQyxlQUFlO0FBQUEsUUFDOUI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
