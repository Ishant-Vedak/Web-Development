const s1 = document.getElementById("stage1");
const s2 = document.getElementById("stage2");
const s3 = document.getElementById("stage3");
const s4 = document.getElementById("stage4");

function resetStages() {
  [s1, s2, s3, s4].forEach(stage => stage.classList.remove("visible"));
}

function runStages() {
  resetStages();
  s1.classList.add("visible");

  setTimeout(() => {
    resetStages();
    s2.classList.add("visible");
  }, 3000);

  setTimeout(() => {
    resetStages();
    s3.classList.add("visible");
  }, 6000);

  setTimeout(() => {
    resetStages();
    s4.classList.add("visible");
  }, 9000);

  setTimeout(runStages, 12000); // loop again
}

runStages();


        

        