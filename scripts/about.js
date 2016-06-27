$(function () {
  // Confirm box
  var confirmBg  = document.querySelector('[data-hook="confirmBg"]')
  var confirmBox = document.querySelector('[data-hook="confirmBox"]')

  confirmBg.style.display  = 'block'
  confirmBox.style.display = 'block'
  confirmBg.style.height = window.innerHeight + 'px'

  document.querySelector('[data-hook="disclaimer"]').innerHTML =
    'This website contains an \'F\' word, two \'S\' words and I believe I may have even' +
    ' used the \'E\' word (entrepreneur) <br/><br/>You cool with this?'

  var noButton  = document.querySelector('[data-hook="noButton"]')
  var yesButton = document.querySelector('[data-hook="yesButton"]')

  noButton.addEventListener('click', function () {
    document.body.style.transition = '1s'
    document.body.style.opacity = 0

    setTimeout(function () {
      window.location.href = 'http://www.nocussing.com'
    }, 600)
  })

  yesButton.addEventListener('click', function () {
    confirmBg.classList.add('conceal')

    setTimeout(function () {
      confirmBox.style.display = 'none'
      confirmBg.style.display  = 'none'
    }, 1000)
  })


  // Kern header
  $('#ux, #dev').lettering()


  // Panes
  var container = $('#lax')
  var panes = container.find('section.pane')
  var docBody = document.body
  var itemHeight = panes.eq(0).closest('li').height()
  var diffHeight = panes.eq(0).height() - itemHeight
  var i, l, pane, li, offset, scroll, top

  var render = function () {
    top = docBody.scrollTop

    for (i = 0, l = panes.length; i < l; i ++) {
      // get single pane
      pane = panes[i]
      // get parent li
      li = pane.parentNode
      // get offset from top
      offset = $(pane).offset().top
      // calculate scroll amount
      scroll = Math.round(((top - offset) / itemHeight) * diffHeight)
      // apply scroll amount
      pane.style.webkitTransform = 'translate3d(0px, '+ scroll +'px, 0px)'
    }
  }

  !function loop() {
    requestAnimationFrame(loop)
    render()
  }()

  $(window).bind('scroll', function () {
    var sp = $(window).scrollTop()
    $('#fix').css('top', (0 - (sp * 0.3)) + 'px')
  })


  // Info flip
  $('#info').on('click', function () {
    $(this).closest('.wrap').addClass('flip').on('mouseleave', function () {
      $(this).removeClass('flip')
    })
  })
})


var map
var directionsDisplay
var directionsService
var icon1 = 'images/truck.jpg'
var icon2 = 'images/unibow.jpg'
var denver = { lat: 39.737567, lng: -104.984718 }
var palo   = { lat: 37.441883, lng: -122.143019 }

function mapInit() {
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers:true })
  directionsService = new google.maps.DirectionsService()

  var request = {
    origin: 'denver, co',
    destination: 'palo alto',
    waypoints: [
      { location: 'salt lake city, ut' },
      { location: 'reno, nv' },
      { location: 'sacramento, ca' },
    ],
    travelMode: google.maps.TravelMode.DRIVING
  }

  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK)
      directionsDisplay.setDirections(response)
  })

  var mapOptions = {
    zoom: 6,
    center: { lat: 38, lng: -112 },
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false,
  }

  var startMarker = new google.maps.Marker({
    position: denver,
    icon: icon1,
    map: map,
  })

  var finishMarker = new google.maps.Marker({
    position: palo,
    icon: icon2,
    map: map,
  })

  var styles = [
    {
      stylers: [
        { saturation: 40 },
        { gamma: 0.40 },
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: '#84afaa' },
        { lightness: 50 },
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { visibility: 'simplified' },
      ],
    }
  ]

  map = new google.maps.Map(document.getElementById('map'), mapOptions).getMap()
  console.log('map', map)

  startMarker.setMap(map)
  finishMarker.setMap(map)
  map.setOptions({ styles: styles })
  directionsDisplay.setMap(map)
}

!function loadMapScript() {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src  = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=mapInit'
  document.body.appendChild(script)
}()

var emails = document.getElementsByClassName('email')
for (var i = 0, l = emails.length; i < l; i ++)
  emails[i].setAttribute('href', 'mailto:hi@djv.io')

function fader(id) {
  $('#about section').hide()
  $(id).fadeIn(700)
}

