import anime from '../anime/lib/anime.es.js';

const yesButton = document.getElementById('yes-button')

const noButton = document.getElementById('no-button')

noButton.addEventListener('click', function(){
    console.log('No Button was clicked.')
})

const randomAnimationHash = function() {
    return {
      duration: anime.random(2000, 2750),
      translateX: `${anime.random(-300, 300)}px`,
      translateY: `${anime.random(-300, 300)}px`,
      rotate: anime.random(50, 400),
      delay: anime.random(0, 50),
    };
};

const appendEmoji = function(emoji, node) {
    emoji.forEach(function(e) {
      node.appendChild(e);
    });
};
  
const animateEmoji = function(emoji) {
    emoji.forEach(function(e) {
      anime({
        targets: e,
        opacity: 0,
        complete() { e.remove() },
        ...randomAnimationHash()
      });
    });
}
  
const generateEmoji = function(count = 5, text, x, y) {
    return Array(count).fill(0).map(function() {
      return generateEmojiEl(text, x, y);
    });
};
  
const generateEmojiEl = function(text, x, y) {
    const emoji = document.createElement('span');
    emoji.innerText = text;
    emoji.classList.add('emoji-particle');
    emoji.style.top = y + 'px';
    emoji.style.left = x + 'px';
    return emoji;
};
  
const explode = function(event) {  
    const emoji = generateEmoji(7, event.target.innerText, event.clientX  - 3, event.clientY - 3);
    appendEmoji(emoji, document.body);
    animateEmoji(emoji);
};

yesButton.addEventListener('click', explode);
