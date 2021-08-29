let triviaForm = document.getElementById('trivia-form');

const modifyApiUrl = e => {
  e.preventDefault();
  
  let amount = document.getElementById('amount');
  let category = document.getElementById('category');
  let difficulty = document.getElementById('difficulty');
  let type = document.getElementById('type');

  const allValues = {
    amount: amount.value,
    category: category.value,
    difficulty: difficulty.value,
    type: type.value
  }

  localStorage.setItem("values", JSON.stringify(allValues));
  window.location.assign("game.html")
  
  // const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`


  // callApi(url);
}

// const callApi = async (APIurl) => {
//   const callAPIurl = await fetch(APIurl);
//   const response = await callAPIurl.json();
//   questions = response.results;
//   console.log(questions);

//   localStorage.setItem("allQuestions", JSON.stringify(questions));
//   window.location.assign("game.html");
// };
  
  
triviaForm.onsubmit = modifyApiUrl;