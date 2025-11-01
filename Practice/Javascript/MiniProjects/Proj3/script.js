const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "Do what you can, with what you have, where you are. – Theodore Roosevelt",
  "It always seems impossible until it's done. – Nelson Mandela",
  "You miss 100% of the shots you don’t take. – Wayne Gretzky",
  "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "If you're going through hell, keep going. – Winston Churchill",
  "The only way to do great work is to love what you do. – Steve Jobs"
];

const usedIndexes = new Set()
const quoteTag = document.getElementById("quote")

function generateQuote() {

    if(usedIndexes.size >= quotes.length) {
        usedIndexes.clear()
    }

    while (true) {
        const randomIdx = Math.floor(Math.random() * quotes.length)

        if (usedIndexes.has(randomIdx)) continue
        const quote = quotes[randomIdx]
        quoteTag.innerHTML = quote
        break
    }
    
}
