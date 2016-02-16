import capitalize from './capitalize';

export default (word) => {
  return word.split(' ').map((word) => {
    return capitalize(word);
  }).join('_').split('_').map((word) => {
    return capitalize(word);
  }).join(' ');
};
