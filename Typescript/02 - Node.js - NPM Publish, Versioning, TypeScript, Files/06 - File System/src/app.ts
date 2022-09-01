// import fs from "fs";

// function example1() {

//     const path = "./my-file1.txt";

//     fs.writeFile(path, "Hello All!\nThis is cool!\n", err => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         console.log("Done Writing");

//         fs.readFile(path, "utf-8", (err, content) => {
//             if(err) {
//                 console.log(err);
//                 return;
//             }

//             console.log("Done Reading");
//             console.log(content);
//         });

//     });

// }

// example1();

import { existsSync } from "fs";
import fs from "fs/promises";

async function example2() {
  try {
    if (!existsSync("./data")) {
      await fs.mkdir("./data");
    }

    const path = "./data/my-file2.txt";

    await fs.writeFile(path, "Cool Example!\nVery Well Done!");
    console.log("Done Writing");
    const content: string = await fs.readFile(path, "utf-8");
    console.log("Done Reading");
    console.log(content);
  } catch (err: any) {
    console.log(err);
  }
}

example2();
