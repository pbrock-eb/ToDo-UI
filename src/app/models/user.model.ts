class User {
    _id: string;
    fName: string;
    lName: string;
    dateCreated: Date;

    constructor(
    ) {
        this.fName = '';
        this.lName = '';
        this.dateCreated = new Date();
    }

}

export default User;
