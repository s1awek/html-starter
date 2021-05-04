//Import here whatever you need from Bootstrap JS
//Also added lightbox and datapicker libraries

// import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';
import GLightbox from 'glightbox';
import datepicker from 'js-datepicker';

document.addEventListener('DOMContentLoaded', function () {
    //Bootstrap breakpoints detection
    const smDevices = window.matchMedia("(min-width: 576px)");
    const mdDevices = window.matchMedia("(min-width: 768px)");
    const lgDevices = window.matchMedia("(min-width: 992px)");
    const xlDevices = window.matchMedia("(min-width: 1200px)");
    const xxlDevices = window.matchMedia("(min-width: 1400px)");

    //Usage:

    /*
    function handleTabletChange(e) {
    // Check if the media query is true
    if (e.matches) {
        // Then log the following message to the console
        console.log('Media Query Matched!')
    }
    }

    // Register event listener
    mdDevices.addListener(handleTabletChange)

    // Initial check
    handleTabletChange(mdDevices)

    */

    //More: https://css-tricks.com/working-with-javascript-media-queries/


    //nice select - select/option styling
    //let options = {searchable: true};
    document.querySelectorAll(".form-select").forEach(function (item) {
        NiceSelect.bind(item);
    });
    
});