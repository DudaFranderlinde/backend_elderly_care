import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ){}

    private async hashPassword(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }

    validateToken(jwtToken: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.jwtService.verifyAsync(jwtToken, {
                    ignoreExpiration: false
                }))                
            } catch (error) {
                reject({
                    code: 401,
                    detail: 'JWT expired.'
                })
            }
        })
    }

    decodedToken(jwtToken: string) {
        return this.jwtService.decode(jwtToken);
    }
}