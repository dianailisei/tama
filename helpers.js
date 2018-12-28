var addLink = function (url) {
    var link = document.createElement('link');
    link.href = url;
    link.media = "screen";
    link.rel = 'stylesheet';
    link.type = 'text/css'; 
    document.getElementsByTagName('head')[0].appendChild(link); 
};

function addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
  }