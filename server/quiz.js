const quiz = {
    quizCheck: function (data) {
        const goed = ["3", "3", "1", "1", "2"];
        let antwoorden = data;
        let score = 0;
        for (let i = 0; i < antwoorden.length; i++) {
            if (antwoorden[i] == goed[i]) {
                score++;
            }
        }
        return score;
      }
  };
  
  module.exports = quiz;
  