# Welcome to `Study Sync`
## Getting Started
You will need the latest version of node installed to run this.
Once you have node configured run:
```bash
 npm install 
 ```
to intall all dependencies,
then run the development server:

```bash
npm run dev
```
this will then be available at [http://localhost:3000](http://localhost:3000).
Intial loading is slow as client side rendering is enabled but hot reloads are fast, so when you make a code change you'll see it straight away.

## Contributing

### Branches
When contributing to this project refer to the group JIRA to see tickets available. Choose one not taken by another user and create a branch with the tickets name.
For example
to check you are on the main branch run:
``` bash
git status
```
then create the new branch by running:
```bash
git checkout -b ticket-name
 ```
once you have made a change run any equivalent of
```bash 
git add -A
git commit -m "your commit message"
```
then finally run:
``` bash
git push origin ticket-name
```
### How to know what code to write
When you select a ticket to write there ma be comments or images attached to serve as guidance on what to write.
You should also refer to these resources:
-  [Figma](https://www.figma.com/file/5RthuqsT4QzNR3maPdg5CA/Research-App?type=design&node-id=0-1&mode=design&t=I0rWUtuWNupNARRd-0) - Use to ensure UI matches expected design
- [D2 Specification](https://computingservices-my.sharepoint.com/:w:/r/personal/mbm60_bath_ac_uk/_layouts/15/Doc.aspx?sourcedoc=%7B7EB65593-AE10-4A48-B356-BA67D071FBE1%7D&file=Group%204%20-%20%20Requirements%20and%20Design.docx&action=default&mobileredirect=true&DefaultItemOpen=1&web=1) - Use Class diagram as vague guide for objects/methods required to create functioning component

### Merging and testing
Automated testing has been setup in this project using Jest, each branch should roughly correspond to a component. 
When you have finished said component as outlined in your ticket after pushing by going to 
[https://github.com/CM10313/CM20314-ESP/actions], you will see tests being run on the code you pushed.

Whenever you write code you are primarly responsible for writing tests for that code.
These will then be run with all existinf tests.

If the tests fail don't worry it just means you have either caused an issue to occur or you need to refactor the test to match your new component.

When merging a branch into main using the github UI to create a pull request, these tests will be triggered.
If your code passes you will be able to merge, however if they don't you will be denied ability to merge. If you go to the problem branch and fix these issues in a new commit you will then see you are able to merge.

### Guidance on testing

When writing unit tests with Jest there is a general pattern to think of "AAA"

Arrange -  Setup test enviroment, preparing objects,data and context required
Act - Perform an action or operation we are aiming to test
Assert - Verify action performed in previous step behaves as expected

Use existing tests as a guide for how to do this.
The main things we want to test are:
- do the main components render
- does state update correctly for input fields
- does navigation work as expected
- do any asnyc operations such as db writes work as expected

If you cover these that should be enough.
You can also run tests locally by using npx jest
adding --coverage you will be able to see what percentage of your code in the file you are testing is covered by test cases, we want to aim genrally for this to be above 80%.


## Tech stack
### Front End
- React
- NextJS
- TS
- MUI - optional use, just simplifies basic UI components and you will see it used in the project
## Back End
- FireBase Auth
- FireStore
## Testing
- Jest

## Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn) 
- [the Next.js GitHub repository](https://github.com/vercel/next.js/)
- [React Documentation](https://react.dev/).
- [Git Documentation](https://git-scm.com/doc).
- [MUI Documentation](https://mui.com/material-ui/getting-started/).

