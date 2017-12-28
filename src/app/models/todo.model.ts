import User from './user.model';

class ToDo {
    id: string;
    title: string;
    description: string;
    dateCreated: Date;
    dateDue: Date;
    status: string;
    user: User;

    constructor(
    ) {
        this.id = '';
        this.title = '';
        this.description = '';
        this.dateCreated = new Date();
        this.dateDue = new Date();
        this.status = '';
        this.user = new User();
    }

}

export default ToDo;
