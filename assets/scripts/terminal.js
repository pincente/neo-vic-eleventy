const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const commands = {
  help: `Available commands:
- help: Show this help
- about: Show my story
- skills: Show what I play with
- experience: Show past adventures
- resume: Show resume section
- contact: Show contact info
- clear: Clear terminal
- exit: Close terminal
`,
  about: `Hi, I’m Paul. My first computer was a VIC-20, and I’ve been obsessed with tech ever since.
That spark turned into building staking infrastructure for millions of dollars in assets —
and now I’m exploring blockchain, AI, and digital wealth.`,
  skills: `I like to tinker with:
- Python scripts
- Solidity smart contracts
- Kubernetes clusters
- AI agents
- Blockchain infrastructure
- DevOps and NetSec`,
  experience: `Past adventures include:
- VP, Digital Assets Products @ Purpose Investments
- Blockchain Infrastructure Architect @ Ether Capital
- Co-Founder / CEO @ Growratio Inc`,
  resume: `Check the RESUME section on the main page to see the PDF.`,
  contact: `You can reach me at:
Email: pincente@outlook.com
LinkedIn: https://www.linkedin.com/in/ppincente`
};

function printToTerminal(text) {
  terminalOutput.textContent += text + '\n';
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = terminalInput.value.trim().toLowerCase();
    printToTerminal(`> ${input}`);

    if (input === '') {
      terminalInput.value = '';
      return;
    }

    if(input === 'clear') {
      terminalOutput.textContent = '';
      terminalInput.value = '';
      return;
    }
    if(input === 'exit') {
      document.getElementById('terminal').classList.add('hidden');
      terminalInput.value = '';
      return;
    }

    if(commands[input]) {
      printToTerminal(commands[input]);
    } else {
      printToTerminal(`Unknown command: ${input}. Type 'help' for commands.`);
    }
    terminalInput.value = '';
  }
});
