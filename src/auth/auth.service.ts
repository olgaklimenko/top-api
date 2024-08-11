import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, AuthModel } from './auth.model';

@Injectable()
export class AuthService {
	constructor(@InjectModel("auth") private authModel: Model<AuthDocument>) { }

	async getByEmail(email: string): Promise<AuthModel | null> {
		return this.authModel.findOne({ email });
	}

	async createUser(email: string, passwordHash: string): Promise<AuthModel> {
		const newUser = new this.authModel({ email: email, password: passwordHash });
		return newUser.save();
	}
}
