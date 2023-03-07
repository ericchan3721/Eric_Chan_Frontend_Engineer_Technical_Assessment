import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // console.log('Mode:', mode);
  return defineConfig({
    plugins: [
      react(),
      EnvironmentPlugin(
        { ...loadEnv(mode, process.cwd()) },
        { defineOn: 'import.meta.env' },
      ),
    ],
  });
};