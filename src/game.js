export function generate_secret() {
    let secret = ''
    while (secret.length < 4) {
        let temp = Math.floor(Math.random() * 10);
        if (!secret.includes(temp)) {
            secret = secret + temp;
        }
    }

    return secret;
}

export function checkguess(guesses, guess, secret){
    let bulls = 0;
    let bullvalues =[];
    let cows = 0;

    for (let i=0; i < secret.length; i++) {
        if(secret[i] === guess[i]) {
            bulls += 1;
            bullvalues.push(secret[i]);
        }
    }

    for (let i=0; i < secret.length; i++) {
        if ((guess.includes(secret[i])) && (!bullvalues.includes(secret[i]))){
            cows+= 1;
        }
    }

    guesses[guess]= bulls + "Bulls" + cows + "Cows ";
    return guesses;
}