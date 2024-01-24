class User {
    #name;
    #lastName;
    #email;
    #password;

    constructor(name, lastName, email, password) {
        this.#name = name;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
    }

    getName() {
        return this.#name;
    }

    getLastName() {
        return this.#lastName;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    
}