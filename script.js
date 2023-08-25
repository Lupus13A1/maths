document.addEventListener("DOMContentLoaded", function () {
    const inputElement = document.getElementById("scores");
    const outputElement = document.getElementById("output");

    inputElement.addEventListener("input", function () {
        const inputScores = inputElement.value;
        const scores = inputScores.split(/[,\s]+/).map(score => parseInt(score.trim(), 10));

        if (scores.length === 1 && scores[0] === "") {
            outputElement.innerHTML = ""; // Clear output if no scores are provided
            return;
        }

        const totalScores = scores.length;
        const sumScores = scores.reduce((acc, score) => acc + score, 0);
        const averageScore = sumScores / totalScores;

        outputElement.innerHTML = `
            <p>จำนวนคะแนนทั้งหมด = ${totalScores} คะแนน</p>
            <p>ผลรวมคะแนนทั้งหมด = ${sumScores}</p>
            <p>ค่าเฉลี่ยประมาณ ${averageScore.toFixed(2)}</p>
        `;
    });
});

function calculateFrequency() {
    const input = document.getElementById("scoreInput");
    const rawInput = input.value;
    const scores = rawInput.split(/[ ,]+/).map(Number);
    const numClassesInput = document.getElementById("numClasses").value;
    const numClasses = parseInt(numClassesInput);

    const classFrequencies = new Array(numClasses).fill(0);

    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const classInterval = Math.ceil((maxScore - minScore + 1) / numClasses);

    scores.forEach(score => {
        const classIndex = Math.min(Math.floor((score - minScore) / classInterval), numClasses - 1);
        classFrequencies[classIndex]++;
    });

    const mergedFrequencies = [];
    let totalFrequency = 0;
    for (let i = 0; i < classFrequencies.length; i++) {
        const lowerBound = minScore + i * classInterval;
        const upperBound = (i === numClasses - 1) ? maxScore : minScore + (i + 1) * classInterval - 1;
        const range = `${lowerBound}-${upperBound}`;
        if (!mergedFrequencies[range]) {
            mergedFrequencies[range] = 0;
        }
        mergedFrequencies[range] += classFrequencies[i];
        totalFrequency += classFrequencies[i];
    }

    const resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = `
    <tr>
      <th>อันตรภาคชั้น</th>
      <th>ความถี่</th>
    </tr>
  `;
    for (const range in mergedFrequencies) {
        resultTable.innerHTML += `
        <tr>
          <td>${range}</td>
          <td>${mergedFrequencies[range]}</td>
        </tr>
      `;
    }

    const totalFrequencyElement = document.getElementById("totalFrequency");
    totalFrequencyElement.textContent = totalFrequency;
}

document.addEventListener("DOMContentLoaded", function () {
    const scoresInput = document.getElementById("scoresInput");
    const frequenciesInput = document.getElementById("frequenciesInput");
    const dataTable = document.getElementById("dataTable");
    const resultElement = document.getElementById("result");

    scoresInput.addEventListener("input", calculate);
    frequenciesInput.addEventListener("input", calculate);

    function calculate() {
        const scores = scoresInput.value.split(" ").map(Number);
        const frequencies = frequenciesInput.value.split(" ").map(Number);

        let tableContent = "";
        let total_fx = 0;
        let total_frequency = 0;

        for (let i = 0; i < scores.length; i++) {
            const fx = scores[i] * frequencies[i];
            total_fx += fx;
            total_frequency += frequencies[i];
            tableContent += `
                <tr>
                    <td>${scores[i]}</td>
                    <td>${frequencies[i]}</td>
                    <td>${fx}</td>
                </tr>
            `;
        }

        tableContent += `
            <tr>
                <td>รวม</td>
                <td>${total_frequency}</td>
                <td>${total_fx}</td>
            </tr>
        `;

        dataTable.innerHTML = tableContent;

        const x̄ = total_fx / total_frequency;
        resultElement.innerHTML = `
            <p>x̄ = Σfx / n</p>
            <p>x̄ = ${total_fx} / ${total_frequency}</p>
            <p>x̄ = ${x̄}</p>
        `;
    }
});
