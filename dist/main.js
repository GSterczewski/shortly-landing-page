





const API = (store) => {
    const API_URL = "https://api.shrtco.de/v2/";
    const API_ERRORS = {
        1 : "URL not specified",
        2: "Invalid URL",
        3 : "Rate limit reached",
        4 : "IP blocked, terms of services violated",
        5: "shrtcode (slug) already in use",
        6: "Unknown",
        7 : "No code specified ('code' parameter empty)",
        8: "Invalid code submitted",
        9 : "Missing required parameters",
        10: "Dissalowed link"
    }
    const createShortenURI = link => `${API_URL}shorten?url=${link}`
    
    const mapError = code => API_ERRORS[code] || "API Error"
    
    const handleError = ({error_code}) => ({
        status : false,
        reason : mapError(error_code)
    })  
    
    const handleResponse = ({code,full_short_link}) => {
        store.save({code,full_short_link})
        return full_short_link
    }

    const getShortenURL = async url => {
        let response = await fetch(createShortenURI(url))
        let result = await response.json()
        
        return result
    }
    const shortenURL = async (url) => {
        let response = await getShortenURL(url)
        return response.ok ? handleResponse(response.result) : handleError(response)
    }
    return {
        shortenURL
    }   
}


const api = API(Store())

const test = async () => {
    let result = await  api.shortenURL("https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G")
    console.log(result)
}



const nodes = {
    menuBtn : document.getElementById("js-menu-btn"),
    nav : document.getElementById("js-mobile-nav")
}

const navActiveClass = "mobile-navigation--active";
const btnActiveClass = "menu-btn--active";
const toggleNav = () => nodes.nav.classList.contains(navActiveClass) ? nodes.nav.classList.remove(navActiveClass) : nodes.nav.classList.add(navActiveClass);
const toggleMenuBtn = () => nodes.menuBtn.classList.contains(btnActiveClass) ? nodes.menuBtn.classList.remove(btnActiveClass) : nodes.menuBtn.classList.add(btnActiveClass);

window.onload = () => {
    nodes.menuBtn.addEventListener("click", () => {
        toggleNav()
        toggleMenuBtn()
    })
}
