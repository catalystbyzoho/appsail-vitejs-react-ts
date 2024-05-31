import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const getConfigurations = () => {
	return defineConfig({
		plugins: [react()]
	});
};
export default getConfigurations;
