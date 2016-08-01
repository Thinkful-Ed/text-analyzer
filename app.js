function add(a, b) {
  return a + b;
}

function getAverageWordsPerSentence(text) {
  var numSentences = text.split(/[!.?]+/).filter(Boolean).length;;
  var wordCount = tokenizeText(text).length;
  return (wordCount / numSentences).toFixed(2);
}

function getAverageWordLength(tokens) {
  var totalLength = tokens.join("").length;
  return (totalLength / tokens.length).toFixed(2);
}

function countTotalWords(tokens) {
  return tokens.length;
}

function countDistinctWords(tokens) {
  var distinctWords = new Set(tokens);
  return distinctWords.size;
}

function tokenizeText(text) {
  return text.toLowerCase().split(/[ ,!.";:-]+/).filter(Boolean).sort();
}

function removeReturns(text) {
  return text.replace(/\r?\n|\r/g, "");
}

function reportOnText(text) {
  var tokens = tokenizeText(text);
  var numDistinctWords = countDistinctWords(tokens);
  var numTotalWords = countTotalWords(tokens);
  var averageWordLength = getAverageWordLength(tokens);
  var averageWordsPerSentence = getAverageWordsPerSentence(text);

  var textReport = $('.js-text-report')
  textReport.find('.js-word-count').text(numTotalWords);
  textReport.find('.js-unique-word-count').text(numDistinctWords);
  textReport.find('.js-average-word-length').text(averageWordLength + " characters");
  textReport.find('.js-average-sentence-length').text(averageWordsPerSentence + " words");
  textReport.removeClass("hidden");
}

function watchFormSubmission() {
  $('.js-text-form').submit(function(event) {
    event.preventDefault();
    var userText = $(this).find('#user-text').val();
    reportOnText(removeReturns(userText));
  });
}

$(function() {
  watchFormSubmission();
});