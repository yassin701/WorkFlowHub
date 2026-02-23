import Sidebar from './Sidebar'

export default function NavbarLayout({ children, onLogout }) {
    return (
        <div className="flex min-h-screen bg-transparent">
            <Sidebar onLogout={onLogout} />
            <main className="flex-1 ml-64 p-8 transition-all duration-300">
                {children}
            </main>
        </div>
    )
}
