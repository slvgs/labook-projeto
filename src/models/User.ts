import { USER_ROLE, UserDB, UserModel } from "../types"

export class User {
    constructor(

        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLE,
        private createdAt: string

    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassoword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLE {
        return this.role
    }

    public setRole(value: USER_ROLE): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserDB {
        return {

            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt



        }



    }

    public toBussinesModel(): UserModel {
        return {

            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt



        }



    }
}


