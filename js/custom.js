$(window).on("load",function(){
    "use strict";
    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');

    /*=========================================================================
        Custom Scrollbar
    =========================================================================*/
    $(".header-inner").mCustomScrollbar();

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
    });

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "Não tem mais trabalhos",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        },
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

/*=========================================================================
            Carousels
=========================================================================*/
$(document).on('ready', function() {
    "use strict";

    $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });

    $('.clients-wrapper').slick({
      dots: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            arrows: false,
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
          }
        }
      ]
    });

});

$(function(){
    "use strict";

    $('.menu-icon').on( 'click', function() {
        $('header.left').toggleClass('open');
        $('.mobile-header, main.content').toggleClass('push');
    });

    $('main.content, header.left button.close').on( 'click', function() {
        $('header.left').removeClass('open');
        $('.mobile-header, main.content').removeClass('push');
    });

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top-50
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
    $('.vertical-menu li a').addClass('nav-link');

    /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
    $("body").scrollspy({ target: ".scrollspy", offset: 50});

    /*=========================================================================
     Background Image with Data Attribute
     =========================================================================*/
    var bg_img = document.getElementsByClassName('background');

    for (var i = 0; i < bg_img.length; i++) {
      var src = bg_img[i].getAttribute('data-image-src');
      bg_img[i].style.backgroundImage="url('" + src + "')";
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    
    
    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 400);
    });

});
//Efeito Digitação
const c = (el) => {
  return document.querySelector(el);
}

function typeWriter(elemento){
const textArray = elemento.innerHTML.split('');
elemento.innerHTML = ''
textArray.forEach((letra, index)=>{
  setTimeout(() => elemento.innerHTML += letra, 90 * index)
});
}
const titulo = c('p')
typeWriter(titulo)



if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js").then(registration => {
  console.log("SW Registrado");
  console.log(registration);

}).catch(error => {
  console.log("SW Registro Falhou");
  console.log(error);
})
}


// Comunicação com Api do github
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const backButton = document.querySelector(".back");
const allReposContainer = document.querySelector(".repos");
const repoDataContainer = document.querySelector(".repo-data");
// const filterInput = document.querySelector(".filter-repos");
const ghUsername = "Jeffbeu";

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${ghUsername}`);
  const data = await userInfo.json();
  displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
//   const div = document.createElement("div");
//   div.classList.add("user-info");
//   div.innerHTML = `
//     <figure>
//       <img alt="user avatar" src=${data.avatar_url} />
//     </figure>
//     <div>
//       <p><strong>Usuario:</strong> ${data.name}</p>
//       <p><strong>Bio:</strong> ${data.bio}</p>
//       <p><strong>Localização:</strong> ${data.location}</p>
//       <p><strong>Numeros de Repositorios:</strong> ${data.public_repos}</p>
//     </div>
//   `;
//   overview.append(div);
  gitRepos(ghUsername);
};

const gitRepos = async function (ghUsername) {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  // Grab info about the GitHub user to display on left hand side of list
  // filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `
      <h3>${repo.name}</h3>
      <p>Main language: ${repo.language}</p>
      `;
    repoList.append(repoItem);
  }
};

// Click on a repo to see more details
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const reponame = e.target.innerText;
    getRepoInfo(reponame);
  }
});

const getRepoInfo = async function (reponame) {
  const fetchInfo = await fetch(
    `https://api.github.com/repos/${ghUsername}/${reponame}`
  );
  const repoData = await fetchInfo.json();

  // Grab languages
  const fetchLanguages = await fetch(repoData.languages_url);
  const languageData = await fetchLanguages.json();

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoData, languages);
};

const displayRepoInfo = function (repoData, languages) {
 
  repoDataContainer.innerHTML = "";
  repoDataContainer.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoData.name}</h3>
    <p>Description: ${repoData.description}</p>
    <p>Default Branch: ${repoData.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoData.html_url
    }" target="_blank" rel="noreferrer noopener">Visitar este repositorio</a>
  `;
  repoDataContainer.append(div);
};

// backButton.addEventListener("click", function () {
//   allReposContainer.classList.remove("hide");
//   repoDataContainer.classList.add("hide");
//   backButton.classList.add("hide");
// });

// Dynamic search
// filterInput.addEventListener("input", function (e) {
//   const searchText = e.target.value;
//   const repos = document.querySelectorAll(".repo");

//   for (const repo of repos) {
//     if (!repo.innerText.toLowerCase().includes(searchText.toLowerCase())) {
//       repo.classList.add("hide");
//     } else {
//       repo.classList.remove("hide");
//     }
//   }
// });
