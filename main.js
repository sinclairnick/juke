const { app, BrowserWindow, Menu } = require('electron');
const rimraf = require('rimraf');
const path = require('path');
let win;

const template = [
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'togglefullscreen' },
            { role: 'toggledevtools' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    // Edit menu
    template[1].submenu.push(
        { type: 'separator' },
        {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        }
    )
}

const menu = Menu.buildFromTemplate(template);

function createWindow() {

    Menu.setApplicationMenu(menu)

    BrowserWindow.addDevToolsExtension(path.join('.vue-devtools', '4.1.4_0'));

    win = new BrowserWindow({
        width: 1080,
        minWidth: 1080,
        height: 720,
        minHeight: 720,
        show: false,
        backgroundColor: '#1d1d1d',
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'img', 'icon.ico')
    })

    win.on('close', () => {
        rimraf.sync(path.join(__dirname, 'tmp', 'torrents/*'), {});
    })

    win.on('closed', () => {
        win = null;
    })

    win.on('ready-to-show', () => {
        win.show();
    })

    win.webContents.toggleDevTools();


    win.loadFile(path.join('.', 'index.html'));
}

app.on('ready', createWindow);