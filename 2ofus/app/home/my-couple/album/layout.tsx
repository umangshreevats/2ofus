import AlbumTopSec from "@/components/couple-profile/album/AlbumTopSec";

export default async function AlbumLayout({ children }: { children: React.ReactNode }) {


    return <section className="w-full">
        <AlbumTopSec />
        {children}
    </section>
}