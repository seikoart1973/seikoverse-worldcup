const FLAG = {
    BRA:"BRA",
    JPN:"JPN",
    GER:"GER",
    PAR:"PAR",
    FRA:"FRA",
    SWE:"SWE",
    RSA:"RSA",
    CAN:"CAN",
    NED:"NED",
    MAR:"MAR",
    POR:"POR",
    CRO:"CRO",
    ESP:"ESP",
    AUT:"AUT",
    USA:"USA",
    BIH:"BIH",
    BEL:"BEL",
    SEN:"SEN",
    CIV:"CIV",
    NOR:"NOR",
    MEX:"MEX",
    ECU:"ECU",
    ENG:"ENG",
    COD:"COD",
    ARG:"ARG",
    CPV:"CPV",
    AUS:"AUS",
    EGY:"EGY",
    SUI:"SUI",
    ALG:"ALG",
    COL:"COL",
    GHA:"GHA"
};

const NAME = {
    BRA:"Brazil",
    JPN:"Japan",
    GER:"Germany",
    PAR:"Paraguay",
    FRA:"France",
    SWE:"Sweden",
    RSA:"South Africa",
    CAN:"Canada",
    NED:"Netherlands",
    MAR:"Morocco",
    POR:"Portugal",
    CRO:"Croatia",
    ESP:"Spain",
    AUT:"Austria",
    USA:"USA",
    BIH:"Bosnia",
    BEL:"Belgium",
    SEN:"Senegal",
    CIV:"Ivory Coast",
    NOR:"Norway",
    MEX:"Mexico",
    ECU:"Ecuador",
    ENG:"England",
    COD:"DR Congo",
    ARG:"Argentina",
    CPV:"Cape Verde",
    AUS:"Australia",
    EGY:"Egypt",
    SUI:"Switzerland",
    ALG:"Algeria",
    COL:"Colombia",
    GHA:"Ghana"
};
const picks =
    JSON.parse(
        localStorage.getItem("wc-picks")
    ) || {};
const R32 = [

{id:'a0',A:'GER',B:'PAR',date:'Jun 29'},
{id:'a1',A:'FRA',B:'SWE',date:'Jun 30'},
{id:'a2',A:'RSA',B:'CAN',date:'Jun 28'},
{id:'a3',A:'NED',B:'MAR',date:'Jun 30'},

{id:'a4',A:'POR',B:'CRO',date:'Jul 1'},
{id:'a5',A:'ESP',B:'AUT',date:'Jun 28'},
{id:'a6',A:'USA',B:'BIH',date:'Jul 2'},
{id:'a7',A:'BEL',B:'SEN',date:'Jul 1'},

{id:'b0',A:'BRA',B:'JPN',date:'Jun 29'},
{id:'b1',A:'CIV',B:'NOR',date:'Jun 30'},
{id:'b2',A:'MEX',B:'ECU',date:'Jul 1'},
{id:'b3',A:'ENG',B:'COD',date:'Jul 1'},

{id:'b4',A:'ARG',B:'CPV',date:'Jun 27'},
{id:'b5',A:'AUS',B:'EGY',date:'Jun 28'},
{id:'b6',A:'SUI',B:'ALG',date:'Jun 29'},
{id:'b7',A:'COL',B:'GHA',date:'Jun 27'}

];
function savePicks(){
    localStorage.setItem(
        "wc-picks",
        JSON.stringify(picks)
    );
}
function choose(matchId, team){

    if(picks[matchId] === team){
        delete picks[matchId];
    }
    else{
        picks[matchId] = team;
    }

    savePicks();

    render();
}
function resetAll(){

    localStorage.removeItem("wc-picks");

    Object.keys(picks).forEach(
        k => delete picks[k]
    );

    render();
}
function get(id){
    return picks[id] || null;
}
function prune(id,a,b){

    const current = picks[id];

    const valid = [a,b].filter(Boolean);

    if(current && !valid.includes(current)){
        delete picks[id];
    }
}
function teamRow(matchId,team){

    if(!team){
        return `
        <div class="tbd">
            TBD
        </div>`;
    }

    const chosen =
        picks[matchId] === team;

    return `
    <button
    class="team-btn ${chosen ? "chosen" : ""}"
    onclick="choose('${matchId}','${team}')">

        <span class="flag">
            ${FLAG[team]}
        </span>

        <span class="name">
            ${NAME[team]}
        </span>

    </button>`;
}
function matchCard(id,a,b,label){

    return `
    <div class="card">

        <div class="card-label">
            ${label}
        </div>

        ${teamRow(id,a)}

        <div class="card-div"></div>

        ${teamRow(id,b)}

    </div>`;
}
document.getElementById("bracket").innerHTML =
    "<h2 style='padding:40px'>Bracket Ready</h2>";
