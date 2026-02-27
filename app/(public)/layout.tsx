
import {Navbar} from "./_components/Navbar";
import {Footer} from "./_components/Footer";

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 md:px-6 lg:px-8 mb-32 flex-1">{children}</main>
            <Footer/>
        </div>
    )
}
