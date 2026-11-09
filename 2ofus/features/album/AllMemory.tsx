"use client";
import Suggestion from "@/components/couple-profile/album/Suggestion";
import Button from "@/components/commons/Button";
import { useState } from "react";
import { useAuth } from "@/app/auth-provider";
import Popups from "@/components/commons/Popups";
import MemoryHolder from "@/components/couple-profile/album/MemoryHolder";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import AlbumData from "@/components/couple-profile/album/AlbumData";
import XScaleScroller from "@/components/commons/XScaleScroller";

const AllMemory = ({ albumData }: { albumData: unknown | null }) => {
    if (!albumData || !Array.isArray(albumData) || albumData.length === 0) {

        return <Suggestion />;
    }


    const { coupleData } = useAuth();
    const [pinnedData, setPinnedData] = useState(albumData.filter(d => d.is_pinned));
    const [albumImages, setAlbumImages] = useState(albumData.filter(d => d.content_type === "image" && !d.is_pinned));
    const [imgLoading, setImgLoading] = useState(false);
    const [imgSkip, setImgSkip] = useState(albumImages.length);
    const [noMoreImages, setNoMoreImages] = useState(false);
    const [albumNotes, setAlbumNotes] = useState(albumData.filter(d => d.content_type === "note" && !d.is_pinned));
    const [noteLoading, setNoteLoading] = useState(false);
    const [noteSkip, setNoteSkip] = useState(albumNotes.length);
    const [noMoreNotes, setNoMoreNotes] = useState(false);

    const [choosenOne, setChoosenOne] = useState<any>(null);
    const [show, setShow] = useState(false);


    const getMoreMemory = async (m: string) => {
        if (m === "image") {
            setImgLoading(true);
        } else if (m === "note") {
            setNoteLoading(true);
        }
        try {

            const response = await fetch(`/api/couple/album/${coupleData.id}?limit=20&skip=${m === "image" ? imgSkip : noteSkip}&m=${m}`);

            const result = await response.json();

            if (!response.ok) {
                toast.error("Something went wrong" + result.message);
                return;
            }

            if (m === "image") {
                setAlbumImages(prev => [...prev, ...result.memoryData]);
                setImgSkip(result.skip);
                setNoMoreImages(result.memoryData.length === 0);
            } else if (m === "note") {
                setAlbumNotes(prev => [...prev, ...result.memoryData]);
                setNoteSkip(result.skip);
                setNoMoreNotes(result.memoryData.length === 0);
            }
        } catch (err) {

            if (err instanceof Error) {
                toast.error("Something went wrong" + err.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            if (m === "image") {
                setImgLoading(false);
            } else if (m === "note") {
                setNoteLoading(false);
            }
        }
    }

    const handleChoosenOne = (memory: any) => {
        setChoosenOne(memory);
        setShow(true);
    }

    return <section className="w-full flex flex-col gap-5">

        <section className="relative w-full flex flex-col gap-2">

            {albumData && albumData.length > 0 && <><h4 className="text-2xl font-bold font-comfortaa">
                Pinned
            </h4>
                <div className="w-full">
                    {pinnedData.length === 0 ? <div className="w-full rounded-md p-10 border-2 border-dashed border-primary-text flex items-center justify-center">
                        You haven't pinned anything.</div> :
                        <XScaleScroller>
                            <div className="relative w-max min-w-full pt-10">

                                {/* Timeline */}
                                <div className="absolute top-10 left-0 right-0 border-t-2 border-secondary-text" />

                                <div className="flex flex-nowrap gap-3 w-max">
                                    {pinnedData.map((pin) => (
                                        <div key={pin.id} className="relative shrink-0">
                                            <div className="h-10 absolute left-10 top-0 border-l-2 border-secondary-text" />

                                            <AlbumData
                                                data={pin}
                                                dataType={pin.content_type}
                                                marginTop={1}
                                                handleChoosenOne={handleChoosenOne}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </XScaleScroller>}
                </div>
            </>}

            <h4 className="text-2xl font-bold font-comfortaa">
                Photos
            </h4>
            <div className="w-full">
                {albumImages.length === 0 ? <div className="w-full rounded-md p-10 border-2 border-dashed border-primary-text flex items-center justify-center">
                    You haven't uploaded any images yet.</div> :
                    <XScaleScroller>
                        <div className="relative w-max min-w-full pt-10">

                            {/* Timeline */}
                            <div className="absolute top-10 left-0 right-0 border-t-2 border-secondary-text" />

                            <div className="flex flex-nowrap gap-3 w-max">
                                {albumImages.map((image) => (
                                    <div key={image.id} className="relative shrink-0">
                                        <div className="h-10 absolute left-10 top-0 border-l-2 border-secondary-text" />

                                        <AlbumData
                                            data={image}
                                            dataType="image"
                                            marginTop={1}
                                            handleChoosenOne={handleChoosenOne}
                                        />
                                    </div>
                                ))}

                                {noMoreImages ? (
                                    <div className="shrink-0 mt-20 font-light text-sm">
                                        Memory End!
                                    </div>
                                ) : (
                                    <div className="shrink-0 mt-20">
                                        <Button
                                            onClick={() => getMoreMemory("image")}
                                            className={imgLoading ? "animate-spin" : ""}
                                            icon={Plus}
                                            text=""
                                            type="button"
                                            disabled={imgLoading}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </XScaleScroller>}
            </div>
        </section>


        <section className="relative w-full flex flex-col gap-2">
            <h4 className="text-2xl font-bold font-comfortaa">
                Notes
            </h4>

            <div className="w-full">
                {albumNotes.length === 0 ? <div className="w-full rounded-md border-2 p-10 border-dashed border-primary-text flex items-center justify-center">
                    You haven't uploaded any notes yet.</div> :
                    <XScaleScroller>
                        <div className="relative w-max min-w-full pt-10">

                            {/* Timeline */}
                            <div className="absolute top-10 left-0 right-0 border-t-2 border-secondary-text" />

                            <div className="flex flex-nowrap gap-3 w-max">
                                {albumNotes.map((note) => (
                                    <div key={note.id} className="relative shrink-0">
                                        <div className="h-10 absolute left-10 top-0 border-l-2 border-secondary-text" />

                                        <AlbumData
                                            data={note}
                                            dataType="note"
                                            marginTop={1}
                                            handleChoosenOne={handleChoosenOne}
                                        />
                                    </div>
                                ))}

                                {noMoreNotes ? (
                                    <div className="shrink-0 mt-20 font-light text-sm">
                                        Memory End!
                                    </div>
                                ) : (
                                    <div className="shrink-0 mt-20">
                                        <Button
                                            onClick={() => getMoreMemory("note")}
                                            className={noteLoading ? "animate-spin" : ""}
                                            icon={Plus}
                                            text=""
                                            type="button"
                                            disabled={noteLoading}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </XScaleScroller>}
            </div>
            <Popups open={show} setOpen={setShow}>
                <MemoryHolder memoryInfo={choosenOne} />
            </Popups>
        </section>
    </section>
}

export default AllMemory;