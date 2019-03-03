function createNode(element){
    return document.createElement(element); //Create the type of element you pass in the parameters
}

function append(parent, el){
    return parent.appendChild(el); //Append the second parameter to the first one
}
const ul = document.getElementById('all-parties');
const url = 'https://politico-final.herokuapp.com/api/v2/parties';

fetch(url)
.then((resp) => resp.json()) //convert data into json
.then(function(data) {
    let parties = data.results; //Get the results (parties)
    return parties.map(function(party){//map through the results and for each run the code below
        let li = createNode('li'), //create the elements we need
            span1 = createNode('span'),
            span2 = createNode('span'),
            span3 = createNode('span');
        span1.innerHTML = `${party.party_name}`;//Make the HTML of this span to be the party name
        span2.innerHTML = `${party.hqAddress}`;
        span3.innerHTML = `${party.logoUrl}`;
        append(li, span1);// Append all elements
        append(li, span2);
        append(li, span3);
        append(ul, li);
    })
})
.catch(function(error){
    console.log(error)
}); 