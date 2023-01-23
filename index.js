function delay (ms) {
    return new Promise ( (res, rej) => {
        setTimeout(res, ms);
    } );
};

delay(5000).then( () => console.log('lolololololol') );