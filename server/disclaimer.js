const cookie ={
    checkCookies: function(data){
        try {
            if(data.cookie != "true"){
                return this.Disclaimer();
            }
        } catch (error) {
            console.log(error);
        }
    },
    Disclaimer: function(){
           let disclaimer = `
           <div class="disclaimer" id="disclaimer">
                <p>
                    Deze website maakt gebruik van functionele en analytische cookies. Door verder te gaan op deze website ga je akkoord met het gebruik van cookies.
                </p>
                <button onclick="acceptCookie()" class="disclaimer-button">Akkoord</button>
            </div>
           `
        return disclaimer;
    }
}

module.exports = cookie;