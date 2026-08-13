/**
 * App Component - Root application component
 */
import { AuthProvider } from './core/context/AuthContext';
import { ContentProvider } from './core/context/ContentContext';
import { SiteProvider } from './core/context/SiteContext';
import { AppRouter } from './core/router/AppRouter';
import { GDGCursor } from './cursor/GDGCursor';
import './styles/globals.css';

function App() {
    return (
        <AuthProvider>
            <ContentProvider>
                <SiteProvider>
                    <GDGCursor />
                    <AppRouter />
                </SiteProvider>
            </ContentProvider>
        </AuthProvider>
    );
}

export default App;

