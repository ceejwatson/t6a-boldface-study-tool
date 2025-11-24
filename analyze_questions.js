const fs = require('fs');

// Read the file
const content = fs.readFileSync('./app/questionData.js', 'utf8');

// Extract the multipleChoice array
const multipleChoiceMatch = content.match(/multipleChoice:\s*\[([\s\S]*?)\n\s*\],\s*\n\s*\/\/ TRUE\/FALSE/);
if (!multipleChoiceMatch) {
  console.log('Could not find multipleChoice section');
  process.exit(1);
}

const mcText = multipleChoiceMatch[1];

// Parse questions manually
const questions = [];
const questionMatches = mcText.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?question:\s*"([^"]*)"[\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?\}/g);

for (const match of questionMatches) {
  const id = match[1];
  const question = match[2];
  const optionsText = match[3];
  const correctIndex = parseInt(match[4]);
  
  // Extract options
  const optionMatches = Array.from(optionsText.matchAll(/"([^"]*)"/g));
  const options = optionMatches.map(m => m[1]);
  
  if (options.length === 4 && correctIndex >= 0 && correctIndex < 4) {
    questions.push({ id, question, options, correctIndex });
  }
}

console.log(`Found ${questions.length} multiple choice questions\n`);

// Analyze each question for length bias
const results = [];

for (const q of questions) {
  const correctAnswer = q.options[q.correctIndex];
  const otherAnswers = q.options.filter((_, i) => i !== q.correctIndex);
  
  const correctLength = correctAnswer.length;
  const avgOtherLength = otherAnswers.reduce((sum, opt) => sum + opt.length, 0) / otherAnswers.length;
  
  // Calculate how much longer the correct answer is (as a percentage)
  const lengthDifference = ((correctLength - avgOtherLength) / avgOtherLength) * 100;
  
  // Only flag if correct answer is >50% longer than average
  if (lengthDifference > 50) {
    results.push({
      id: q.id,
      question: q.question.substring(0, 80) + (q.question.length > 80 ? '...' : ''),
      options: q.options,
      correctIndex: q.correctIndex,
      correctLength,
      avgOtherLength: Math.round(avgOtherLength),
      lengthDifference: Math.round(lengthDifference)
    });
  }
}

// Sort by length difference (most obvious first)
results.sort((a, b) => b.lengthDifference - a.lengthDifference);

// Print top 10
console.log('TOP 10 QUESTIONS WHERE LENGTH GIVES AWAY THE ANSWER:\n');
console.log('='.repeat(80) + '\n');

for (let i = 0; i < Math.min(10, results.length); i++) {
  const r = results[i];
  console.log(`${i + 1}. QUESTION ID: ${r.id}`);
  console.log(`   Question: ${r.question}`);
  console.log(`   Length bias: Correct answer is ${r.lengthDifference}% longer than average\n`);
  
  r.options.forEach((opt, idx) => {
    const marker = idx === r.correctIndex ? '✓ CORRECT' : '  ';
    const charCount = opt.length;
    console.log(`   ${marker} Option ${idx + 1} (${charCount} chars): ${opt}`);
  });
  console.log('\n' + '-'.repeat(80) + '\n');
}

console.log(`\nTotal problematic questions found: ${results.length}`);
