

// War Card Game

let suit = ["Hearts", "Spades", "Clubs", "Diamonds"];
let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
let players = [[],[]];          //multi-dimensional array of players
let firstHand = true;           // to check if this is the first hand, if true, the game will start
let gameover = false;
let timer;
let r = 0; 

 

warButton = addEventListener('click', warGame);               //warButton is one click for one round of gameplay
// roundButton = addEventListener('click',function(){         //roundButton is one clock for thirty rounds of gameplay
//   rounds(30);
// });


//           function rounds(a){
//             r=a;
//             timer = setInterval(function(){
//               warGame()
//             },100);
//           }

          function warGame(){                               //Actual gampeplay functions being played out each game

            // if(timer){
            //   r--;
            //   if(r<1){
            //     window.clearInterval(timer);
            //   }

            // }

            if (firstHand){
              firstHand = false;
              buildDeck();                                  //buildDeck function below
              shuffleArray(cards);                          //shuffle cards array before dealing cards to each player
              dealCards(cards);                             //deals cards evenly between two players

            }
              gameplay();                                    //gameplay function 
          }

          function gameplay(){
            if(!gameover){                                    //if game is not over, run gameplay loop
              let card1 = players[0].shift();                 //pulling them out of the players deck and into play
              let card2 = players[1].shift();                 //pulling them out of the players deck and into play
              let cardPile = [card1,card2];                   //adding each players card to cardPile and in play
              checkWinner(card1,card2,cardPile);              //run checkwinner function after cards are dealt to each player
            }
            else{
              console.log("Game Over");
            }
          }

          function checkWinner(card1,card2,cardPile){         //created checkWinner function to pass through gameplay variables as parameters
            console.log(card1,card2);                         //revealing each players card value in the console log
            if((players[0].length <= 4)||(players[1].length <= 4)){
              gameover = true;                                //checks to see if a player has enough cards (4) to do war
              return;
            }
            if(card1.cardValue > card2.cardValue){            //checking if each player 1's card is larger than player 2's
              console.log("Player 1 wins");                   //console log if Player 1 wins
              players[0] = players[0].concat(cardPile);       //concat - merging player 1's card into the card pile
            }
            else if(card1.cardValue < card2.cardValue){       //checking if each player 1's card is larger than player 2's
              console.log("Player 2 wins");                   //console log if Player 1 wins
              players[1] = players[1].concat(cardPile);       //concat - merging player 2's card into the card pile
            }
            else{
              warmode(cardPile);                              //run war if each players card has drawn a tie
              console.log("War!");                            // console logs a War instance
              console.log(card1,card2);
            }
              console.log(players);
          }


          function warmode(cardPile){                         //cardPile = card1,card2
            let card1,card2;                                  //initiate card1 and card2

            if((players[0].length < 4)||(players[1].length < 4)){       
              return;                                         //checks to see if a player has enough cards (4) to do war              
            }
            else{
              for(let i = 0; i < 4; i++){                     //looping out three + one card
                card1 = players[0].shift();                   //taking cards from players deck and shift top card off
                cardPile = cardPile.concat(card1);            //concatenating cards won into the cardPile
              }
              for(let i = 0; i < 4; i++){                     //looping out three + one card
                card2 = players[1].shift();                   //taking cards from players deck and shift top card off
                cardPile = cardPile.concat(card2);            //concatenating cards won into the cardPile
            }
            checkWinner(card1,card2,cardPile);                //lopping back checkWinner after war mode has ended
            }
          }

                                          
          function buildDeck(){                               // Builds 52 cards 
            cards = [];                                       // clear out cards array
            for(s in suit){                                   //loop through all the "s" values in suit array
              let suitNew = suit[s][0];                       //string that shows the first letter of each suit
              for(n in rank){                                 // loop through card ranks              
                
                let card = {                                  // --card object created--
                  suit:suit[s],                               //pulling information from suit with every value that has an (s)
                  num:rank[n],                                //num is the string of the rank array
                  cardValue:parseInt(n) +2,                   //parseInt n into a usable number +2 for two players(2 players)
                                                              //cardValue is now the integer version of the card value
                }               
                cards.push(card);                             // loops through each suit and each card number, pushing cards value into card object
              }
            }
            console.log(cards);                               //console logs cards being played by each player in the deck

          }

          function dealCards(array){                          //loop through all value in cards array
            for(i = 0; i < array.length; i++){                //deals ard to first and second player
              let m = i % 2;                                  //modulus: takes right-hand value and puts it into the left-hand value, gives remainder
              players[m].push(array[i]);                      //variable [m] is pushing cards array evenly between two people 
            }
            console.log(players);
          }

          function shuffleArray(array){
            for(let i = array.length -1; i > 0; i--){         //grabbing cards array length and going backwards from array
              let ii = Math.floor(Math.random() * (i+1));     //Math random generates random number
                                                              //Math floor rounds down to nearest whole number
                                                              //i+1 - to not start from 0
              let temp = array[i];                            //overwrite with random selection              
              array[i] = array[ii];                           
              array[ii] = temp;                               //overwrite with temp storage
            }
            console.log(array);                               //shows cards are shuffled
            return array;                                     //passing back array into the object
          }
          