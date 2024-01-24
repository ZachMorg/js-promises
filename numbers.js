//base function for getting api returns from promises

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

get('http://numbersapi.com/25?json')
    // .then(res => {
    //     console.log(res)
    //     return get('http://numbersapi.com/25?json')
    // })
    .then(res => console.log(res))
    .catch(err => console.log(err))


//Part 2:
const factListTwo = document.getElementById("factListTwo");
let factsHtml = document.createElement("p");

get('http://numbersapi.com/25..30?json')
    .then(res => {
        console.log(res)
        const listOfFacts = Object.getOwnPropertyNames(res.data)
        let factText = ''
        for(let i = 0; i < listOfFacts.length; i++){
            factText += res.data[listOfFacts[i]]+'\n'
        }
        return factListTwo.append(factsHtml.innerText = factText)})
    .catch(err => console.log(err))


//Part 3:

const factListThree = document.getElementById("factListThree");
let otherFactsHtml = document.createElement("p");
let listOfFacts = [];

get('http://numbersapi.com/25?json')
    .then(res => {
        console.log(res)
        listOfFacts.push(res.data['text'])
        return get('http://numbersapi.com/25?json')
            .then(res => {
                console.log(res)
                listOfFacts.push(res.data['text'])
                return get('http://numbersapi.com/25?json')
                    .then(res => {
                        console.log(res)
                        listOfFacts.push(res.data['text'])
                        return get('http://numbersapi.com/25?json')
                    })
            })
    })
    .then(res => {
        console.log(res)
        listOfFacts.push(res.data['text'])
        listOfFacts = listOfFacts.join('\n')
        return factListThree.append(otherFactsHtml.innerText = listOfFacts)
    })
    .catch(err => console.log(err))