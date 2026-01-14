"use client";
import { updatePlaylist } from "@/actions/playlist";
export default function UpdatePlaylistPage(props: {
  playlistID: number;
  playlistName: string;
}) {
  return (
    <div>
      <button
        onClick={() => {
          document.querySelector(".editik")?.classList.toggle("hidden");
        }}
      >
        Edit
      </button>
      <div className="editik hidden">
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <p className="text-2xl font-bold">
              Update Playlist: {props.playlistName}
            </p>
            <form action={updatePlaylist}>
              <input
                type="text"
                name="playlistId"
                value={props.playlistID}
                hidden
                readOnly
              />
              <input
                className="input"
                type="text"
                name="playlistName"
                defaultValue={props.playlistName}
              />
              <input className="btn" type="submit" value="Update" />
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
