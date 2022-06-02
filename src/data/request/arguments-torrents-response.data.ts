import TorrentInt from "../torrent.int.data";
import Arguments from "./arguments.data";

export interface ArgumentsTorrentsResponse extends Arguments {
    torrents: Array<TorrentInt>
}