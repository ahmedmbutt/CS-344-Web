window.onload = function () {
    document.forms['quiz'].onsubmit = function () {
        for (let i = (document.getElementsByName('next')[0].getAttribute('id') - 1) * document.getElementsByClassName('quiz-card').length; i < document.getElementsByName('next')[0].getAttribute('id') * document.getElementsByClassName('quiz-card').length; i++) {
            if (!document.querySelector(`input[type='radio'][name='${i}']:checked`)) {
                alert("Please answer all questions")
                return false;
            }
        }
    }
}