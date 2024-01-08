import { User } from './interfaces'
import { UserConfirmation } from './UserConfirmation';
import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions {
    
    private userConfirmation = new UserConfirmation;
    private userData: UserData;

    constructor(userData: UserData) {
        this.userData = userData;
    }

    public async register(user: User): Promise<void> {
        user.password = await this.userData.hashPassword(user.password);
        this.userData.addUser(user);
        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password)
    }
}