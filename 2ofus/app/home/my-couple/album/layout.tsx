import AlbumTopSec from "@/components/couple-profile/album/AlbumTopSec";

interface PageProps {
    children: React.ReactNode;
}

export default async function AlbumLayout({ children }: PageProps) {

    return <section className="w-full">
        <AlbumTopSec />
        {children}
    </section>
}