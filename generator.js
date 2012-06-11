'use strict';
(function(){

function mod(x, y) {
    var r = x % y;
    if (r < 0)
        return r + y;
    else
        return r;
}


function at(dicts, key) {
    for (var i in dicts) {
        var dict = dicts[i];
        if (key in dict)
            return dict[key];
    }
}

function oneOf(vocab, prng) {
    var r = prng.next();
    if (typeof vocab === 'string')
        return vocab;
    else
        return vocab[mod(r, vocab.length)];
}

function generate(vocab, dicts, prng) {
    var str = oneOf(vocab, prng);
    console.log(str);
    return str.replace(/\$([A-Za-z]+)/g, function(_, ckey) {
        var key = ckey.toLowerCase();
        var capitalize = key !== ckey;
        var subvocab = at(dicts, key);
        console.log('replace', key, capitalize, subvocab);
        if (!subvocab)
            return '<undefined ' + key + '>';
        else {
            var substr = generate(subvocab, dicts, prng);
            console.log('with', substr);
            if (capitalize)
                return substr.charAt(0).toUpperCase() + substr.slice(1);
            else
                return substr;
        }
    });
}

window.Generator = {
    generate: generate};

})();
