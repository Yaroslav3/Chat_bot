import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

if (module.hot) {
    module.hot.accept();
}

AppRegistry.registerComponent(appName, () => App);

const rootTag = document.getElementById('app-root');
const root = createRoot(rootTag);
root.render(<App />);
