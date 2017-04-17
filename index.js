var differenceInDays = require('date-fns/difference_in_calendar_days')
var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')

css('tachyons')
var bgBlue = css`:host { background-color: #63E6D4 }`
var coolOutline = css`:host { text-shadow: 5px 5px pink }`
var lessCoolOutline = css`:host { text-shadow: 3px 3px pink }`

var app = choo()
app.route('/', mainView)
app.use(etaStore)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body class="vh-100 ${bgBlue} flex items-center">
      <main class="measure-wide center tc">
        <h1 class="measure white f1 f-subheadline-ns ${coolOutline}">
          ETA till LRNLLNA arrives in BERLZ
        </h1>
        <h2 class="white f1 f-subheadline-ns ${lessCoolOutline} i underline">
          ✨ ${state.eta} ✨
        </h2>
      </main>
    </body>
  `
}

function etaStore (state, emitter) {
  var target = new Date(2017, 3, 28, 0, 0)
  state.eta = calc()

  emitter.on('DOMContentLoaded', function () {
    setInterval(function () {
      state.eta = calc()
      emitter.emit('render')
    }, 60 * 1000) // 1 minute
  })

  function calc () {
    var diff = differenceInDays(target, Date.now())
    diff = diff < 0 ? 0 : diff // let's not get to negative dates
    diff = diff === 1 ? diff + ' day' : diff + ' days'
    return diff
  }
}
