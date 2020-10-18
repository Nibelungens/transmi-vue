const PATH_SEPARATOR = '/';
const NOT_FOUND = -1;

function createFile(torrent, file, children, index, fileName) {
    let fileStat = torrent.fileStats[index];
    const tFile = {
        id: index,
        name: fileName !== undefined ? fileName : file.name,
        bytesCompleted: file.bytesCompleted,
        wanted: fileStat.wanted,
        priority: fileStat.priority,
        length: file.length
    }

    children.push(tFile);
}

function createPath(torrent, root) {
    const haveFolder = torrent.files
        .findIndex(file => file.name.includes(PATH_SEPARATOR));

    if (haveFolder > NOT_FOUND) {
        for (let index = 0; index < torrent.files.length; index++) {
            let file = torrent.files[index];
            let folders = file.name.split(PATH_SEPARATOR);
            let relativeFolder = root;

            for (let ii = 0; ii < (folders.length-1); ii++) {
                let length;

                const existFolder = relativeFolder.children
                    .findIndex(element => element.name === folders[ii]);

                if (existFolder === NOT_FOUND) {
                    const tFolder = {
                        name: folders[ii],
                        folder: true,
                        children: []
                    };

                    length = relativeFolder.children.push(tFolder);
                } else {
                    length = existFolder+1;
                }

                relativeFolder = relativeFolder.children[length-1];
            }
            const fileName = folders[folders.length-1];

            const exist = relativeFolder.children
                .findIndex(element => element.name === fileName);

            if (exist === NOT_FOUND) {
                createFile(torrent, file, relativeFolder.children, index, fileName);
            }
        }
    }
}

function postProcessWantedAndPriority(tPath) {
    let process = {
        wanted: null,
        priority: null
    };

    if (tPath.folder) {
        process.wanted = false;
        process.priority = undefined;

        for (const child of tPath.children) {
            let tmpWanted = postProcessWantedAndPriority(child);
            process.wanted = process.wanted || tmpWanted.wanted;


            if (process.priority === undefined) {
                process.priority = tmpWanted.priority;
            } else {
                process.priority = process.priority === tmpWanted.priority? tmpWanted.priority: null;
            }
        }

        tPath.wanted = process.wanted;
        tPath.priority = process.priority;
    } else {
        process.wanted = tPath.wanted;
        process.priority = tPath.priority;
    }

    return process;
}

const path = {
    /**
     * @typedef {Object} TFile
     * @property {number} bytesCompleted
     * @property {string} priority
     * @property {boolean} wanted
     * @property {number} length
     * @property {string} name
     * @property {number} id
     *
     * @typedef {Object} TPath
     * @property {array<TPath | TFile>} children
     * @property {string} priority
     * @property {boolean} folder
     * @property {boolean} wanted
     * @property {number} id
     *
     * @param {Torrent} torrent
     * @return {TPath}
     */
    toTPath(torrent) {
        const rootPath = {
            name: torrent.name,
            folder: true,
            children: []
        };

        for (let index = 0; index < torrent.files.length; index++) {
            let file = torrent.files[index];
            if (!file.name.includes(PATH_SEPARATOR)) {
                createFile(torrent, file, rootPath.children, index);
            } else {
                createPath(torrent, rootPath);
            }
        }
        postProcessWantedAndPriority(rootPath);
        return rootPath;
    }
}

export default path;