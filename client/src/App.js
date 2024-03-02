import DefaultLayout from './layouts/DefaultLayout';
import routesApp from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {routesApp.map((route, index) => {
                        const Page = route.component;
                        console.log(route.path);
                        return (
                            <Route
                                key={index}
                                path={`/${route.path}`}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
