import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const getConfigurations = ({ mode }) => {
	return defineConfig({
		base: mode === 'development' ? 'appsail/AppSail/' : '',
		plugins: [react()]
	});
};
export default getConfigurations;
