import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function DefaultLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow  bg-bg-grey py-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
