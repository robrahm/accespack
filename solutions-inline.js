(function(){
  function nextSolutionCard(el){
    // Walk forward to find the next sibling with class 'solution-card'
    let n = el;
    while (n && (n = n.nextElementSibling)) {
      if (n.classList && n.classList.contains('solution-card')) return n;
    }
    return null;
  }

  function wrapPrompt(box){
    // If LaTeXML didn't wrap the prompt, make a wrapper and move relevant nodes into it
    if (box.querySelector('.prompt')) return; // already wrapped
    const prompt = document.createElement('div');
    prompt.className = 'prompt';
    // Move everything except any existing controls into .prompt
    const keepNodes = [];
    Array.from(box.childNodes).forEach(node => {
      if (!(node.nodeType === 1 && node.classList && node.classList.contains('controls'))) {
        keepNodes.push(node);
      }
    });
    keepNodes.forEach(node => prompt.appendChild(node));
    box.insertBefore(prompt, box.firstChild);
  }

  function addControls(box){
    if (box.querySelector('.controls')) return;
    const controls = document.createElement('p');
    controls.className = 'controls';
    const show = document.createElement('button');
    show.type = 'button';
    show.className = 'btn showbtn';
    show.textContent = 'Click for solution';
    const hide = document.createElement('button');
    hide.type = 'button';
    hide.className = 'btn hidebtn';
    hide.textContent = 'Hide solution';
    controls.appendChild(show);
    controls.appendChild(hide);
    box.appendChild(controls);

    show.addEventListener('click', () => {
      box.classList.add('showing-solution');
      // move focus to start of solution for a11y
      const tgt = box.querySelector('.solution') || box;
      (tgt.querySelector('a,button,[tabindex]') || tgt).focus({preventScroll:false});
    });
    hide.addEventListener('click', () => {
      box.classList.remove('showing-solution');
      show.focus({preventScroll:false});
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.workbox').forEach(box => {
      // Find the solution card that LaTeXML put AFTER this box
      const solCard = nextSolutionCard(box);
      // Ensure prompt is wrapped
      wrapPrompt(box);
      // If there is a solution card, move its contents into the box
      if (solCard){
        // Create internal .solution container
        let sol = box.querySelector('.solution');
        if (!sol){
          sol = document.createElement('div');
          sol.className = 'solution';
          // add a subtle gold stripe to echo your theme? (purely optional)
          box.appendChild(sol);
        }
        // Optionally drop the "Solution" title LaTeXML added as a separate para
        const inner = solCard.cloneNode(true);
        // Strip outer class styling wrappers we don't need
        // Keep only inner HTML of the card
        sol.innerHTML = inner.innerHTML;
        // Remove the original solution card from the DOM
        solCard.parentNode.removeChild(solCard);
      }
      // Add controls regardless (so the card can still flip prompt-only states)
      addControls(box);
    });
  });
})();
