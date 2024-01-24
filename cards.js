function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      request.onload = function () {
        if (request.readyState !== 4) return;
  
        // Check status code
        if (request.status >= 200 && request.status < 300) {
          resolve({
            data: JSON.parse(request.response),
            status: request.status,
            request: request,
          })
        } else {
          reject({
            msg: 'Server Error',
            status: request.status,
            request: request
          })
        }
      }
      request.onerror = function handleError() {
        reject({
          msg: 'NETWORK ERROR!'
        })
      };
    request.open('GET', url);
    request.send();
  })
}


//Part 1:

get('https://deckofcardsapi.com/api/deck/new/draw')
    .then(res => console.log(res.data.cards[0].value+' of '+res.data.cards[0].suit))
    .catch(err => console.log(err))


//Part 2:

get('https://deckofcardsapi.com/api/deck/new/draw')
    .then(res => {
        console.log(res.data.cards[0].value+' of '+res.data.cards[0].suit)
        console.log(res)
        let deckId = res.data.deck_id
        return get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
    })
    .then(res => console.log(res.data.cards[0].value+' of '+res.data.cards[0].suit))
    .catch(err => console.log(err))


//Part 3:

const cardButton = document.getElementById("drawCard")
cardButton.addEventListener("click", drawCard);
const totalCardDiv = document.getElementById('cardDiv');

let permDeckId;
let cardCount = 0;

function drawCard(){
    let cardText = document.createElement('p');
    let cardImg = document.createElement('img');
    let singleCardDiv = document.createElement('div');
    if(permDeckId == null){
        get('https://deckofcardsapi.com/api/deck/new/draw')
            .then(res => {
                cardText.innerText = res.data.cards[0].value+' of '+res.data.cards[0].suit
                permDeckId = res.data.deck_id
                cardImg.src = res.data.cards[0].image
                singleCardDiv.append(cardText)
                singleCardDiv.append(cardImg)
                totalCardDiv.append(singleCardDiv)
                cardCount++
            })
            .catch(err => console.log(err))
    }
    else{
        get(`https://deckofcardsapi.com/api/deck/${permDeckId}/draw`)
            .then(res => {
                cardText.innerText = res.data.cards[0].value+' of '+res.data.cards[0].suit
                cardImg.src = res.data.cards[0].image
                singleCardDiv.append(cardText)
                singleCardDiv.append(cardImg)
                totalCardDiv.append(singleCardDiv)
                cardCount++
                console.log(cardCount)
                if(cardCount == 52){
                    cardButton.style.display = 'none';
                }
            })
            .catch(err => console.log(err))
    }
}


