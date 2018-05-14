module.exports = {
    root: './public',
    BROWSER_SYNC_RELOAD_DELAY: 750,
    autoprefixerConfig: {
        browsers: ['last 2 version', '> 1%'],
        cascade: false
    },
    cssunitConfig: {
        type: 'px-to-rem',
        rootSize: 16
    },
    imageminJpegRecompressConfig: {
        progressive: true,
        max: 95,
        min: 90
    },
    imageminPngquantConfig: {
        quality: '90-95'
    }
};