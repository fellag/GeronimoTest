
// mansory script pour ajuster les hauteurs

var container = document.querySelector('.main');
var msnry = new Masonry( container, {
    columnWidth: 285,
    itemSelector: '.item'
});

// livereload script pour l'integration

document.write('<script src="http://'
    + '192.168.1.181'
    + ':35729/livereload.js"></'
    + 'script>') ;