const repoName = document.querySelector('strong[itemprop="name"]')?.textContent;
console.log(repoName);


const newTitle = document.createElement('h1');
newTitle.textContent = repoName ?? '';
document.body.appendChild(newTitle);
