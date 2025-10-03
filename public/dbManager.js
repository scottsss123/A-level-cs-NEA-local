class DBManager {
    #usernames;
    #passwordHashes;

    constructor() {
        this.#usernames = [];
        this.#passwordHashes = [];    
    }

    updateUsers(inUsers) {
        for (let i = 0; i < inUsers.length; i++) {
            this.#usernames.push(inUsers[i].Username);
            this.#passwordHashes.push(inUsers[i].PasswordHash);
        }
    }

}