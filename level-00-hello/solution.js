// Level 0: Hello Ethernaut
// Solution exploits

// Création d'une instance du niveau
// (Clic sur "Get new instance" dans l'interface)

// Suivre la chaîne d'indices
await contract.info();
// "You will find what you need in info1()."

await contract.info1();
// "Try info2(), but with "hello" as a parameter."

await contract.info2("hello");
// "The property infoNum holds the number of the next info method to call."

await contract.infoNum();
// Returns a BigNumber representing 42

await contract.info42();
// "theMethodName is the name of the next method."

await contract.theMethodName();
// "The method name is method7123949."

await contract.method7123949();
// "If you know the password, submit it to authenticate()."

// Récupération du mot de passe
const password = await contract.password();
// "ethernaut0" (ou autre mot de passe selon l'instance)

// Authentification avec le mot de passe
await contract.authenticate(password);
// Transaction confirmée

// Soumettre l'instance pour compléter le niveau
// (Clic sur "Submit instance" dans l'interface)