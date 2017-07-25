store = {teams: [], players: []}

function createTeams () {
  let id = 0

  return class {
    constructor(name, city){
      this.name = name
      this.city = city
      this.id = ++id
      store.teams.push(this)
    }

    makeTableRow(){
      return `<tr> <td> ${this.name} </td>  <td> ${this.city} </td> </tr>`
    }
  }
}

let Team = createTeams()
let Player = createPlayers()

$(document).ready( function() {
  renderTeams();
  renderPlayers();
  $('.make-team').on('submit', function(event) {
  	event.preventDefault()
  	let teamName = $('#team-name').val()
  	let city = $('#team-city').val()
  	let team = new Team(teamName, city)
  	renderTeams()
  })

  $('.make-player').on('submit', function(event) {
    event.preventDefault()
    let team = store.teams.filter((team) => {
      return team.name === $('#player-team').val()
    })[0]
    let name = $('#player-name').val()
    let touchdowns = $('#player-touchdowns').val()
    let twitter = $('#player-twitter').val()
    let player = new Player(name, twitter, touchdowns, team)
    renderPlayers();
  })

  $('body').on('click', '.player-info', function(){
    player = store.players.filter((player) =>{
        return player.id === parseInt(this.id[this.id.length - 1 ])
      })[0]
    $(this).parent().append(`<div class="p-info"> <td> name: ${player.name} </td> <td>touchdowns ${player.touchdowns} </td> <td>twitter: ${player.twitter}</td></div>`)
    $(this).removeClass('player-info')
    $(this).addClass("clicked-player-info")
  })

  $('body').on('click', '.clicked-player-info', function(){
    $(this).parent().find('div').remove()
    $(this).removeClass('clicked-player-info')
    $(this).addClass("player-info")
  })
})

function renderTeams() {
  $('#teams-go-here').empty();
  store.teams.forEach((team) =>{
    $('#teams-go-here').append(team.makeTableRow())
  })
}

function renderPlayers(){
  $('#players-go-here').empty();
  store.players.forEach((player) => {
    $('#players-go-here').append(player.makeTableRow());
  })
}

function createPlayers () {
  let id = 0

  return class {
    constructor(name, twitter, touchdowns, team){
      this.name = name
      this.twitter = twitter
      this.touchdowns = touchdowns
      this.id = id++
      this.teamId = team.id
      store.players.push(this)
    }
    makeTableRow(){
      return `<tr><td>${this.name}</td><td><button class="player-info" id="p-info-${this.id}">info</button></td></tr>`
    }
  }
}




giants = new Team('Giants', 'New York')
cowgirls = new Team('CowGirls', 'Dallas')
jets = new Team('Jets', 'New York')

odb = new Player ('Odell Beckham', '@odell', '99', giants)
ee = new Player ('Evan Engram', '@TE', '50', giants)
ss = new Player ('Sterling Shepard', '@sheprocks', '52', giants)
bm = new Player ('Brandon Marshall', '@bMarsh', '40', giants)
db = new Player ('Dez Bryant', '@Dez', '10', cowgirls)
zeke = new Player ('Ezikiel Elliot', '@Zeke', '12', cowgirls)
jetsdude = new Player ('jets player', '@jets', '10', jets)
