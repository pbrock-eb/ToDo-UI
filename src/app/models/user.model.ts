class User {
    id: string;
    fName: string;
    lName: string;
    dateCreated: Date;

    constructor(
    ) {
        this.fName = '';
        this.lName = '';
        this.dateCreated = new Date();
        this.id = '';
    }

}

export default User;
