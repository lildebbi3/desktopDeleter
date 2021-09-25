const readline = require('readline');
const del = require('del');
const fs = require('fs');


//sets up the console for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//ask the user what folder to delete
rl.question('Delete a file or folder? (fil/fol):  ', (answer) => {
  switch(answer){
    case 'fol':
      rl.question('What is the name of the folder? ', (folder) => {
        console.log(`Finding folder ${folder} to delete....`);
        delFolder(folder);
        rl.close();
      })
    break;
    case 'fil':
      rl.question('What is the name of the file? ', (file) => {
        console.log(`Finding file ${file} to delete....`);
        delFile(file);
        rl.close();
      })
    break;
    default:
      console.log("Wrong");
      rl.close();
    break;
  }
});


//function that deletes the folder
function delFolder(dir){
  (async () => {
    try {
        await del(dir);
        console.log(`${dir} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${dir}.`);
    }
})();
}
//function that deletes a file
function delFile(file){
  if(fs.existsSync(file)){
    fs.unlink(file, (err) => {
        if(err){
            console.log(err);
        }else {
            console.log('File Deleted!');
        }
    })
}
}