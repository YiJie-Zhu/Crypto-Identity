# Demo Video

[Link to YouTube video](https://www.youtube.com/watch?v=GYAiIWTAZh4&t=3s)

# Getting Started

```
git clone https://github.com/YiJie-Zhu/IDs-as-NFT.git
```

Go to a general directory
```
npm install -g truffle
```

Go to project directory
```
npm install

//After npm finish installing
truffle test

//if all test passes
truffle console

contract = await PersonId.deployed()

await contract.mint("Name1")

await contract.mint("Name2")
```

Retreive Firebase APi key and paste it in a new file called ```.env.local``` in the main directory

```
npm start
```

# How to use

Crypto Identity allows a user to create a digital identity that they can use whenever they need to provide identification. You first register for an account using an email and password and are then prompted to take some pictures of yourself doing various facial expressions. We used a facial recognition API that can detect various emotions, which allows us to verify the user is actually trying to sign up for an ID and not just using someone else's picture. From there, the user is prompted to fill out a form that contains all the information that will be on their ids such as their date of birth and gender. 

Once all this information is gathered, the user receives a prompt from their digital crypto wallet that their identification is being minted as an NFT. Their personal NFT stores their first name. and an encrypted version of all the private information they filled out in the form. Since our NFT's are stored on a blockchain, the IDs would be widely available for employers, financial institutions, and government agencies to verify a user's information. It also reduces the likelihood of theft or forgery due to the secure nature of NFT's as well as the lack of a physical ID.


