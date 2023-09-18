import {faker} from "@faker-js/faker"

const FAKE_PASSWORD = 'admin1234';
const FAKE_ROLES = ['admin','user','superadmin'];
export default class FakeUsers {

    #fakeUsers;

    constructor(countUsers){
        this.#fakeUsers = [];
        for (let index = 0; index < countUsers; index++) {
            const user = this.#createRandomUser()
            this.#fakeUsers.push(user);
            
        }
        //this.#fakeUsers = faker.helpers.multiple(this.#createRandomUser(),{count:countUsers}) 
    }

    #createRandomUser(){
        const user = {
            username:faker.internet.userName(),
            password:FAKE_PASSWORD,
            roles:this.#getRoles()
        }
        
        return user;
    }

    #getRoles(){
        let result = [];
        const countRoles = this.#getRandomNumber(0,FAKE_ROLES.length)
            for (let index = 0; index <= countRoles; index++) {
               const indexRoles = this.#getUniqIndexRoles(result);  
               result.push(FAKE_ROLES[indexRoles]);
            }            
        return result;
    }

    #getUniqIndexRoles(result){
        let indexRoles;
        do {
            indexRoles = this.#getRandomNumber(0,FAKE_ROLES.length);
         } while (result.includes(FAKE_ROLES[indexRoles]));
         return indexRoles;
    }


    #getRandomNumber(min,max){

        return Math.trunc(Math.random() * (max - min) + min)
    }

    get users(){
        return this.#fakeUsers;
    }


}