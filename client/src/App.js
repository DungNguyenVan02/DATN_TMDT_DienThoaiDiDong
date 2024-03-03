import { useEffect, useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import routesApp from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { resizeScreen } from './redux/slice/appSlice';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    const setWidth = (e) => {
        setWidthScreen(e.target.innerWidth);
        dispatch(resizeScreen(e.target.innerWidth));
    };

    useEffect(() => {}, []);

    useEffect(() => {
        window.addEventListener('resize', setWidth);
        return () => {
            window.removeEventListener('resize', setWidth);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthScreen]);

    return (
        <Router>
            <div className="font-main">
                <Routes>
                    {routesApp.map((route, index) => {
                        const Page = route.component;
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
