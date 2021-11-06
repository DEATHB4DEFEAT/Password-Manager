async function run() {
    async function loop() {
        const fs = require('fs').promises;
        console.clear();

        function prompt() {
            const prompt = require('prompt-sync')();
            return prompt(`${__filename}> `, 'help');
        };

        const cmd = prompt();
        if (cmd.toLowerCase() == 'help') help();
        if (cmd.toLowerCase() == 'exit') exit();
        if (cmd.toLowerCase() == 'create') create();
        if (cmd.toLowerCase() == 'password') password();
        if (cmd.toLowerCase() == 'list') list();
        if (cmd.toLowerCase() == 'delete') del();



        async function help() {
            console.log(`       Available commands are:
        help   -   shows this menu

        exit   -   exits the program

        create   -   creates a password entry   -   extra info: don't use the same file name or you will lose the entry data   -   usage:
        name: <filename>
        username: <username/email>

        password   -   shows a password entry   -   usage:
        name: <filename>

        list   -   lists password entries

        delete   -   deletes a password entry   -   extra info: you are unable to recover this information from me once deleted   -   usage:
        name: <filename>`);
            
            setTimeout(() => {
                loop();
            }, 7500);
        };

        async function exit() {
            console.log('Exiting...');
            process.exit();
        };

        async function create() {
            const prompt = require('prompt-sync')();
            const name = prompt('Name: ', 'EMPTY');
            const username = prompt('Username: ', 'EMPTY');
            const password = prompt('Password: ', { echo: '*' });
            const notes = prompt('Notes: ');

            const entry = {
                name: name,
                username: username,
                password: password,
                notes: notes,
            };

            try {
                await fs.writeFile(`./data/${name}.json`, JSON.stringify(entry));
                console.log(`\nSuccessfully saved entry ${name}!\n`);
            } catch (err) {
                console.log(`ERROR: I am missing permission to create files or you have no data folder.`);
            };

            setTimeout(() => {
                loop();
            }, 2500);
        };

        async function password() {
            const file = prompt('fileName> ');

            try {
                const data = await fs.readFile(`./data/${file}.json`);
                console.log(`Name: ${data.toString().split('"name":"')[1].split('"')[0]}\nUsername: ${data.toString().split('"username":"')[1].split('"')[0]}\nPassword: ${data.toString().split('"password":"')[1].split('"')[0]}\nNotes: ${data.toString().split('"notes":"')[1].split('"')[0]}`);
            } catch (err) {
                console.log(`ERROR: I am missing permission to read files or the file does not exist.`);
            };

            setTimeout(() => {
                loop();
            }, 7500);
        };

        async function list() {
            const data = await fs.readdir('./data');
            console.log(data.join('\n'));

            setTimeout(() => {
                loop();
            }, 10000);
        };

        async function del() {
            const file = prompt('fileName> ');

            try {
                await fs.unlink(`./data/${file}.json`);
                console.log(`\nSuccessfully deleted entry ${file}!\n`);
            } catch (err) {
                console.log(`ERROR: I am missing permission to delete files or you gave me an invalid filename.`);
            };

            setTimeout(() => {
                loop();
            }, 2500);
        };
    };

    loop();
};

run();